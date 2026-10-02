import FaqPageClient from '../../src/next/storefront/FaqPageClient';
import { faqGroups } from '../../src/next/storefront/faq-content';

const title = 'FAQs | Armoze';
const description = 'Find answers about Armoze canvas prints, free shipping, order tracking, returns, and refunds. Still need help? Get in touch with our team.';

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://armoze.com/faqs' },
  openGraph: { title, description, url: 'https://armoze.com/faqs', siteName: 'Armoze' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://armoze.com/faqs#faq',
  mainEntity: faqGroups.flatMap((group) =>
    group.questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        id="armoze-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FaqPageClient />
    </>
  );
}
