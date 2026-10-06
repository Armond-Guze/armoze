'use client';

import Link from 'next/link';
import { StorefrontShell, StorefrontTracker } from './StorefrontChrome';
import './guide-page.css';

type Guide = {
  slug: string;
  title: string;
  description: string;
  intro?: string;
  collectionSlug: string;
  sections?: { heading: string; body: string[] }[];
  faqs?: { question: string; answer: string }[];
};

export default function GuidePageClient({
  guide,
  guides,
  collection,
  otherGuides,
}: {
  guide?: Guide;
  guides?: Guide[];
  collection?: { slug: string; title: string } | null;
  otherGuides?: Guide[];
}) {
  return (
    <StorefrontShell>
      <StorefrontTracker />
      <main className="guide-page">
        {guide ? (
          <article className="guide-article">
            <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/guides">Guides</Link>
            </nav>
            <h1>{guide.title}</h1>
            {guide.intro ? <p className="guide-intro">{guide.intro}</p> : null}
            {guide.sections?.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            {collection ? (
              <aside className="guide-cta">
                <p>Ready to shop? Browse our <Link href={`/collections/${collection.slug}`}>{collection.title}</Link> collection. Free U.S. shipping and 30-day returns.</p>
              </aside>
            ) : null}
            {guide.faqs?.length ? (
              <section>
                <h2>Frequently asked questions</h2>
                <dl>
                  {guide.faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt>{faq.question}</dt>
                      <dd>{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            {otherGuides?.length ? (
              <section>
                <h2>More guides</h2>
                <ul>
                  {otherGuides.map((item) => (
                    <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        ) : (
          <div className="guide-article">
            <h1>Wall Art Guides</h1>
            <p className="guide-intro">Practical advice on choosing, sizing, and hanging canvas wall art.</p>
            <ul className="guide-list">
              {guides?.map((item) => (
                <li key={item.slug}>
                  <h2><Link href={`/guides/${item.slug}`}>{item.title}</Link></h2>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </StorefrontShell>
  );
}
