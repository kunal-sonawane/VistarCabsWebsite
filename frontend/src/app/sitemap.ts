import type { MetadataRoute } from "next";
import {
  airports,
  cities,
  destinationGuides,
  places,
  routes,
  site,
  getApiUrl,
} from "@/lib/site";
import { blogPosts } from "@/lib/blogs";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/about-us",
    "/about-nashik",
    "/contact-us",
    "/blogs",
    "/maharashtra",
    "/outstation-cab-service",
    "/airport-taxi",
    "/local-cab-service",
    "/corporate-cab-service",
    "/kumbh-mela-nashik",
  ];
  const blogPaths = blogPosts.map((post) => `/blogs/${post.slug}`);
  const cityPaths = cities.map((c) => `/cities/${c.slug}`);
  const placePaths = places.map((p) => `/cities/nashik/${p.slug}`);
  const destinationPaths = destinationGuides.map(
    (p) => `/cities/${p.citySlug}/${p.slug}`,
  );
  const routePaths = routes.map((r) => `/${r.slug}`);
  const airportPaths = airports.map((a) => `/airports/${a.slug}`);
  let cmsPaths: string[] = [];
  try {
    const response = await fetch(`${getApiUrl()}/api/public/pages`, {
      cache: "no-store",
      signal: AbortSignal.timeout(1600),
    });
    if (response.ok) {
      const body = await response.json();
      cmsPaths = Array.isArray(body.items)
        ? body.items.map((page: { slug: string }) => `/pages/${page.slug}`)
        : [];
    }
  } catch {}
  return [
    ...new Set([
      ...staticPaths,
      ...blogPaths,
      ...cityPaths,
      ...placePaths,
      ...destinationPaths,
      ...routePaths,
      ...airportPaths,
      ...cmsPaths,
    ]),
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path.includes("to-") || path.startsWith("/airports/")
          ? 0.8
          : 0.65,
  }));
}
