import { notFound } from 'next/navigation';
import { absoluteUrl, getCatalog, getCollectionForSlug } from '../../../src/next/seo.js';
import GuidePageClient from '../../../src/next/storefront/GuidePageClient';
import { getGuide, guides } from '../../../shared/guides-content.js';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const guide = getGuide((await params).slug);

  if (!guide) {
    return { title: 'Guide Not Found | Armoze', robots: { index: false, follow: false } };
  }

  const url = absoluteUrl(`/guides/${guide.slug}`);
  const title = `${guide.seoTitle} | Armoze`;

  return {
    title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { title, description: guide.description, url, siteName: 'Armoze', type: 'article' },
    twitter: { card: 'summary_large_image', title, description: guide.description },
  };
}

export default async function GuideRoute({ params }) {
  const guide = getGuide((await params).slug);

  if (!guide) {
    notFound();
  }

  const catalog = await getCatalog();
  const collection = getCollectionForSlug(catalog, guide.collectionSlug);
  const url = absoluteUrl(`/guides/${guide.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.published,
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'Armoze' },
        publisher: { '@type': 'Organization', name: 'Armoze', url: absoluteUrl('/') },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: absoluteUrl('/guides') },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
      ...(guide.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: guide.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        id="armoze-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePageClient
        guide={guide}
        collection={collection ? { slug: collection.slug, title: collection.title } : null}
        otherGuides={guides.filter((item) => item.slug !== guide.slug)}
      />
    </>
  );
}
