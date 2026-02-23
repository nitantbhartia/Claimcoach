import type { MetadataRoute } from "next";
import { listGuides } from "@/lib/guides/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://claimcoach.app";

  const guideEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...listGuides().map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.modified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/estimate`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/sales-tax-calculator`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/settlement-checklist`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/offer-fairness-quiz`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/car-value-estimator`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...guideEntries,
  ];
}
