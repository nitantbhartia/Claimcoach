# Article Template -- ClaimCoach Guides

## Quality Checklist

Every article MUST include all of the following:

- [ ] **Lead paragraph** with specific stat + dollar amount (hooks reader, signals credibility)
- [ ] **Early CTA** (`<CTABox>`) right after lead paragraph or first key takeaway
- [ ] **Table of contents** with anchor links to each h2 section
- [ ] **3+ case studies** with real dollar figures (using `<CaseStudy>`)
- [ ] **2+ data tables** with structured information (using `<DataTable>`)
- [ ] **1+ calculator/tool embed** using `mode="mini"` (converts readers to users)
- [ ] **4+ internal links** to core pages and other guides
- [ ] **5+ FAQs** in registry entry (generates FAQPage schema for featured snippets)
- [ ] **5+ authoritative sources** in registry entry (E-E-A-T signal)
- [ ] **2+ key takeaway callouts** (using `<KeyTakeaway>`)
- [ ] **Disclaimer** at end of article
- [ ] **Exported `headings` array** matching all h2/h3 IDs in the article

---

## Article Structure

```tsx
// src/lib/guides/articles/[slug].tsx

import Link from "next/link";
import { SalesTaxCalculator } from "@/components/tools/sales-tax-calculator";
import { KeyTakeaway } from "@/components/guides/key-takeaway";
import { CTABox } from "@/components/guides/cta-box";
import { CaseStudy } from "@/components/guides/case-study";
import { DataTable } from "@/components/guides/data-table";

export const headings = [
  { id: "section-id", text: "Section Title", level: 2 },
  { id: "subsection-id", text: "Subsection Title", level: 3 },
  // ... must match all h2/h3 ids in the article
];

export default function ArticleName() {
  return (
    <>
      {/* 1. Lead paragraph -- specific stat + dollar amount */}
      <p>
        <strong>The average [topic-specific stat] is $X,XXX</strong>, according to
        [credible source]. [1-2 more sentences explaining why this matters and
        what the reader will learn.]
      </p>

      {/* 2. Early CTA */}
      <CTABox />

      {/* 3. First key takeaway */}
      <KeyTakeaway>
        <strong>Key takeaway:</strong> [Core insight in 1-2 sentences]
      </KeyTakeaway>

      {/* 4. Section with data table */}
      <h2 id="section-id">Section Title</h2>
      <p>[Explanatory prose...]</p>
      <DataTable
        caption="Table description"
        headers={["Col 1", "Col 2", "Col 3"]}
        rows={[
          ["data", "data", "data"],
        ]}
      />

      {/* 5. Section with embedded calculator */}
      <h2 id="calculator-section">Calculator Section</h2>
      <p>[Context for why to use this tool...]</p>
      <SalesTaxCalculator mode="mini" />

      {/* 6. Case studies section */}
      <h2 id="case-studies">Real Settlement Case Studies</h2>
      <CaseStudy
        name="First L."
        vehicle="2020 Toyota Camry"
        state="Texas"
        initialOffer="$18,500"
        finalSettlement="$22,300"
        gap="+$3,800"
        narrative={<p>[Story of what happened...]</p>}
      />
      {/* ... 2 more case studies */}

      {/* 7. Action steps with internal links */}
      <h2 id="next-steps">What to Do Next</h2>
      <ol>
        <li><Link href="/tools/offer-fairness-quiz">Score your offer</Link></li>
        <li><Link href="/claims/new">Get a full analysis</Link></li>
      </ol>

      {/* 8. Closing key takeaway */}
      <KeyTakeaway>
        <strong>Bottom line:</strong> [Final actionable insight]
      </KeyTakeaway>

      {/* 9. Disclaimer */}
      <p className="text-caption text-[#4a555e] mt-8 pt-6 border-t border-black/10">
        <em>ClaimCoach is an educational tool. This content is not legal or
        financial advice. Consult a licensed professional for advice specific
        to your situation.</em>
      </p>
    </>
  );
}
```

---

## Registry Entry Structure

```typescript
{
  slug: "article-slug",
  title: "Article H1 Title",
  metaTitle: "SEO Title (may differ from h1) | 2026 Guide",
  metaDescription: "150-160 char description with primary keyword near front.",
  published: "2026-02-19",
  modified: "2026-02-19",
  category: "settlement-basics" | "negotiation" | "valuation" | "state-rules",
  readingTimeMinutes: 12,
  keywords: ["primary keyword", "secondary keyword", "long-tail variation"],
  faqs: [
    { question: "Question text?", answer: "2-3 sentence answer." },
    // 5+ FAQs required
  ],
  sources: [
    { title: "Source Title", url: "https://...", publisher: "Publisher Name" },
    // 5+ sources required
  ],
  component: () => import("./articles/article-slug"),
}
```

---

## HTML Conventions

- Use `&mdash;` not `--` in rendered HTML (TSX handles this with `{"\u2014"}` or literal em dash)
- All internal links use `<Link href="...">` from `next/link`
- All external links use `<a href="..." target="_blank" rel="noopener noreferrer">`
- h2 IDs use kebab-case matching the `headings` export
- No `"use client"` directive on article components (tools are client islands)
- Dollar amounts use `<strong>` for emphasis
