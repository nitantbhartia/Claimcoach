import type { GuideSource } from "@/lib/guides/registry";

export function SourcesSection({ sources }: { sources: GuideSource[] }) {
  return (
    <section className="mt-10 border-t border-black/10 pt-6">
      <h2 className="text-body font-semibold text-black mb-3">Sources</h2>
      <ol className="space-y-2 list-decimal list-inside">
        {sources.map((s, i) => (
          <li key={i} className="text-body-sm text-[#4a555e]">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors underline"
            >
              {s.title}
            </a>
            {" \u2014 "}
            {s.publisher}
          </li>
        ))}
      </ol>
    </section>
  );
}
