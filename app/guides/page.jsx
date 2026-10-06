import { absoluteUrl } from '../../src/next/seo.js';
import GuidePageClient from '../../src/next/storefront/GuidePageClient';
import { guides } from '../../shared/guides-content.js';

const title = 'Wall Art Guides and Decor Ideas | Armoze';
const description =
  'Guides for choosing, sizing, and hanging motivational canvas wall art for offices, dorm rooms, and focused spaces.';

export const metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/guides') },
  openGraph: { title, description, url: absoluteUrl('/guides'), siteName: 'Armoze' },
};

export default function GuidesIndexRoute() {
  return <GuidePageClient guides={guides} />;
}
