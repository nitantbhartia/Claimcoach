"use client";

interface TOCProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TOCProps) {
  return (
    <nav
      className="border border-black/10 bg-white p-5 mb-8"
      aria-label="Table of contents"
    >
      <p className="text-body font-semibold text-black mb-3">
        In this guide
      </p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-body-sm text-[#4a555e] hover:text-coral transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
