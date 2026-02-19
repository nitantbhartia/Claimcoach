import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getGuideBySlug,
  getAllGuideSlugs,
} from "@/lib/guides/registry";
import { ArticleLayout } from "@/components/guides/article-layout";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://claimcoach.app/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.modified,
      authors: ["ClaimCoach"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { default: ArticleBody, headings } = await guide.component();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.published,
    dateModified: guide.modified,
    author: {
      "@type": "Organization",
      name: "ClaimCoach",
      url: "https://claimcoach.app",
    },
    publisher: {
      "@type": "Organization",
      name: "ClaimCoach",
      url: "https://claimcoach.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://claimcoach.app/guides/${guide.slug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ArticleLayout guide={guide} headings={headings}>
        <Suspense
          fallback={<div className="animate-pulse h-96 bg-black/5" />}
        >
          <ArticleBody />
        </Suspense>
      </ArticleLayout>
    </>
  );
}
