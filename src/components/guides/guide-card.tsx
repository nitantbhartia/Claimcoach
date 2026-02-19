import Link from "next/link";
import type { GuideRegistryEntry } from "@/lib/guides/registry";

export function GuideCard({ guide }: { guide: GuideRegistryEntry }) {
  return (
    <Link href={`/guides/${guide.slug}`}>
      <div className="bg-white border border-black/10 p-5 hover:border-coral/40 hover:shadow-card transition-all group">
        <p className="text-[0.6rem] uppercase font-bold tracking-wider text-[#4a555e]/60 mb-2">
          {guide.category.replace(/-/g, " ")}
        </p>
        <h2 className="text-body font-semibold text-black group-hover:text-coral transition-colors mb-2">
          {guide.title}
        </h2>
        <p className="text-body-sm text-[#4a555e] mb-3">
          {guide.metaDescription}
        </p>
        <div className="flex items-center gap-3 text-caption text-[#4a555e]">
          <time dateTime={guide.published}>
            {new Date(guide.published).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{guide.readingTimeMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
