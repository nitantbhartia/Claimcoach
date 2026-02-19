import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TableOfContents } from "./table-of-contents";
import { FAQSection } from "./faq-section";
import { SourcesSection } from "./sources-section";
import type { GuideRegistryEntry, GuideHeading } from "@/lib/guides/registry";

interface ArticleLayoutProps {
  guide: GuideRegistryEntry;
  headings: GuideHeading[];
  children: React.ReactNode;
}

export function ArticleLayout({
  guide,
  headings,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
          {/* Breadcrumbs */}
          <nav
            className="text-caption text-[#4a555e] mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-coral transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/guides"
              className="hover:text-coral transition-colors"
            >
              Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{guide.title}</span>
          </nav>

          {/* Meta line */}
          <div className="flex items-center gap-3 text-caption text-[#4a555e] mb-4">
            <time dateTime={guide.published}>
              {new Date(guide.published).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{guide.readingTimeMinutes} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-heading-lg sm:text-display-sm font-semibold text-black mb-6">
            {guide.title}
          </h1>

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Article Body */}
          <div className="guide-content">{children}</div>

          {/* FAQs */}
          <FAQSection faqs={guide.faqs} />

          {/* Sources */}
          <SourcesSection sources={guide.sources} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
