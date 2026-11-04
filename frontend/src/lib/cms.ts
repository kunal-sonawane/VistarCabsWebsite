import { getApiUrl } from "@/lib/site";
import type { Metadata } from "next";

export type SeoRecord = {
  path: string;
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  focusPhrase?: string;
};
export type CmsSection = {
  heading: string;
  body: string;
  imageId?: string;
  imageAlt?: string;
};
export type CmsFaq = { question: string; answer: string };
export type ManagedPageContent = {
  _id: string;
  path: string;
  label: string;
  mode: "append" | "replace";
  status: "draft" | "scheduled" | "published" | "archived";
  publishAt?: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImageId?: string;
  heroImageAlt?: string;
  sections: Array<CmsSection & { linkLabel?: string; linkUrl?: string }>;
  faqs: CmsFaq[];
  updatedAt?: string;
};
export type CmsPageRecord = {
  _id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: CmsSection[];
  faqs: CmsFaq[];
  heroImageId?: string;
  heroImageAlt?: string;
  canonicalPath?: string;
  noindex: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  publishAt?: string;
};

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(1600),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getSeoOverride(path: string): Promise<SeoRecord | null> {
  const result = await safeJson<{ item: SeoRecord | null }>(
    `${getApiUrl()}/api/public/seo?path=${encodeURIComponent(path)}`,
  );
  return result?.item || null;
}

export async function metadataWithSeoOverride(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const override = await getSeoOverride(path);
  if (!override) return fallback;
  const canonical = override.canonicalPath || path;
  return {
    ...fallback,
    title: override.title,
    description: override.description,
    alternates: { ...fallback.alternates, canonical },
    robots: override.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      ...fallback.openGraph,
      title: override.title,
      description: override.description,
    },
  };
}

export async function getPublishedCmsPage(
  slug: string,
): Promise<CmsPageRecord | null> {
  const result = await safeJson<{ item: CmsPageRecord }>(
    `${getApiUrl()}/api/public/pages/${encodeURIComponent(slug)}`,
  );
  return result?.item || null;
}

export async function getManagedPageContent(
  path: string,
): Promise<ManagedPageContent | null> {
  const result = await safeJson<{ item: ManagedPageContent | null }>(
    `${getApiUrl()}/api/public/page-content?path=${encodeURIComponent(path)}`,
  );
  return result?.item || null;
}

export type SiteCampaignRecord = {
  _id: string;
  title: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  imageId?: string;
  imageAlt?: string;
  startsOn?: string;
  endsOn?: string;
  priority: number;
};
export async function getActiveCampaigns(
  placement: "homepage" = "homepage",
): Promise<SiteCampaignRecord[]> {
  const result = await safeJson<{ items: SiteCampaignRecord[] }>(
    `${getApiUrl()}/api/public/campaigns?placement=${placement}`,
  );
  return result?.items || [];
}

export async function getPublicReviews(): Promise<
  Array<{
    customerName: string;
    quote: string;
    rating: number;
    tripLabel: string;
    publishedAt?: string;
  }>
> {
  const result = await safeJson<{
    items: Array<{
      customerName: string;
      quote: string;
      rating: number;
      tripLabel: string;
      publishedAt?: string;
    }>;
  }>(`${getApiUrl()}/api/public/reviews`);
  return result?.items || [];
}

export type PublicSiteSettings = {
  brandName: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  operatingHours: string;
  coverageSummary: string;
};
export async function getPublicSiteSettings(): Promise<PublicSiteSettings | null> {
  const result = await safeJson<{ item: PublicSiteSettings | null }>(
    `${getApiUrl()}/api/public/settings`,
  );
  return result?.item || null;
}

export function mediaUrl(id?: string) {
  return id ? `${getApiUrl()}/api/public/media/${encodeURIComponent(id)}` : "";
}
