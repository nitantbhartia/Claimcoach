import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/claims/"],
      },
    ],
    sitemap: "https://claimcoach.app/sitemap.xml",
  };
}
