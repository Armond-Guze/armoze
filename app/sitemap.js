import { getSanitySitemapEntries } from '../server/sanity-sitemap.js';
import {
  getSeoPageFactoryCollectionPriority,
  getSeoPageFactoryCollectionSlugs,
} from '../server/seo-page-factory.js';
import { seedCatalog } from '../server/catalog.js';
import { guides } from '../shared/guides-content.js';
import { buildMerchantImagePath } from '../server/merchant-image-url.js';

export const dynamic = 'force-dynamic';

const siteUrl = 'https://armoze.com';
const retiredCollectionSlugs = new Set(['discipline-focus']);

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function getFallbackSitemapEntries() {
  const products = seedCatalog.products
    .filter((product) => product.published !== false && product.slug)
    .map((product) => ({
      id: product.id,
      image: product.image,
      slug: product.slug,
      collectionSlugs: Array.isArray(product.collectionSlugs) ? product.collectionSlugs : [],
      updatedAt: null,
    }));

  return {
    products,
    collectionSlugs: uniqueValues(products.flatMap((product) => product.collectionSlugs)),
  };
}

export default async function sitemap() {
  let sitemapEntries;

  try {
    sitemapEntries = await getSanitySitemapEntries();
  } catch (error) {
    console.warn('Sanity sitemap data unavailable; using the bundled catalog.', error);
    sitemapEntries = getFallbackSitemapEntries();
  }

  const { collectionSlugs, products } = sitemapEntries;
  const seoCollectionSlugs = getSeoPageFactoryCollectionSlugs();
  const catalogCollectionSlugs = seedCatalog.collections.map((collection) => collection.slug);
  const allCollectionSlugs = uniqueValues([
    ...catalogCollectionSlugs,
    ...collectionSlugs,
    ...seoCollectionSlugs,
  ]).filter((collectionSlug) => !retiredCollectionSlugs.has(collectionSlug));
  // A fresh timestamp on every request teaches Google to ignore lastmod, so
  // only products with a real updatedAt report one.
  const now = undefined;
  const routes = [
    {
      url: siteUrl,
      lastModified: now,
      priority: 1,
    },
    ...allCollectionSlugs.map((collectionSlug) => ({
      url: `${siteUrl}/collections/${collectionSlug}`,
      lastModified: now,
      priority: seoCollectionSlugs.includes(collectionSlug)
        ? getSeoPageFactoryCollectionPriority(collectionSlug)
        : collectionSlug === 'study-creative' ? 0.7 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      images: buildMerchantImagePath(product)
        ? [`${siteUrl}${buildMerchantImagePath(product)}`]
        : undefined,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
      priority: product.collectionSlugs.includes('best-sellers') ? 0.9 : 0.8,
    })),
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date('2026-10-06'),
      priority: 0.6,
    },
    ...guides.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.published),
      priority: 0.6,
    })),
    ...['about', 'faqs', 'support', 'shipping', 'returns', 'privacy', 'terms'].map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified: now,
      priority: 0.4,
    })),
  ];

  return routes;
}
