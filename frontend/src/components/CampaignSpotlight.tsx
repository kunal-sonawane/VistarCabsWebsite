import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Megaphone } from "lucide-react";
import { getActiveCampaigns, mediaUrl } from "@/lib/cms";

export default async function CampaignSpotlight() {
  const campaigns = await getActiveCampaigns();
  if (!campaigns.length) return null;
  return (
    <section
      aria-label="Current Vistar Cabs updates"
      className="bg-[#f4f7fb] py-8 sm:py-10"
    >
      <div className="container-wide space-y-3">
        {campaigns.map((campaign) => (
          <article
            key={campaign._id}
            className="relative isolate overflow-hidden rounded-3xl bg-[#0758c9] text-white shadow-lg"
          >
            <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#071a2f] via-[#0758c9] to-[#1683d8]" />
            {campaign.imageId && (
              <Image
                src={mediaUrl(campaign.imageId)}
                alt={campaign.imageAlt || ""}
                fill
                unoptimized
                sizes="100vw"
                className="-z-10 object-cover opacity-25"
              />
            )}
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
                  <Megaphone size={13} /> Vistar Cabs update
                </span>
                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  {campaign.headline}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85">
                  {campaign.body}
                </p>
              </div>
              {campaign.ctaUrl.startsWith("/") ? (
                <Link
                  href={campaign.ctaUrl}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950"
                >
                  {campaign.ctaLabel}
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <a
                  href={campaign.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950"
                >
                  {campaign.ctaLabel}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
