import { siteUrl } from '../src/next/seo.js';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep crawl budget on product and collection pages instead of utility,
      // account, and checkout routes (and filtered/sized duplicates of them).
      disallow: [
        '/api/',
        '/admin',
        '/cart',
        '/checkout',
        '/account',
        '/sign-in',
        '/sign-up',
        '/order-status',
        '/google-checkout/',
        '/*?search=',
        '/*?size=',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
