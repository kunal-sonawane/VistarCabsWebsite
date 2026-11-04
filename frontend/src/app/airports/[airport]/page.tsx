import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  Clock3,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airports, cities, routes, site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type Props = { params: Promise<{ airport: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { airport } = await params;
  const a = airports.find((item) => item.slug === airport);
  if (!a) return {};
  const path = `/airports/${a.slug}`;
  const fallback: Metadata = {
    title: `${a.name} Cab Enquiries`,
    description: `Plan a cab enquiry for ${a.name}. Share your flight, pickup and destination details; confirm availability directly with Vistar Cabs.`,
    alternates: { canonical: path },
    openGraph: {
      title: `${a.name} Cab Enquiries | Vistar Cabs`,
      description: a.description,
    },
  };
  return metadataWithSeoOverride(path, fallback);
}
export default async function AirportPage({ params }: Props) {
  const { airport } = await params;
  const a = airports.find((item) => item.slug === airport);
  if (!a) notFound();
  const pagePath = `/airports/${a.slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  const city = cities.find((c) => c.name === a.city);
  const cityRoutes = routes
    .filter((r) => r.from === a.city || r.to === a.city)
    .slice(0, 6);
  const message = `Hello Vistar Cabs, I would like to enquire about a cab to or from ${a.name} (${a.code}).`;
  const airportPhoto: Record<string, string> = {
    "nashik-ozar": "/images/airports/nashik-ozar.jpg",
    "mumbai-csmia": "/images/airports/mumbai-csmia.jpg",
    "navi-mumbai-airport": "/images/airports/navi-mumbai-airport.jpg",
    "pune-airport": "/images/airports/pune-airport.jpg",
    "sambhajinagar-airport": "/images/airports/sambhajinagar-airport.jpg",
    "shirdi-airport": "/images/airports/shirdi-airport.jpg",
  };
  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate min-h-[440px] overflow-hidden text-white sm:min-h-[490px]">
        <Image
          src={airportPhoto[a.slug] || "/images/services/airport-taxi.jpg"}
          alt={`${a.name} terminal`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/65 to-[#071a2f]/20" />
        <Header />
        <div className="container-wide flex min-h-[440px] items-center py-28 sm:min-h-[490px]">
          <div className="max-w-3xl">
            <Link
              href="/#airports"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/10 px-3.5 py-2 text-xs font-bold text-white/80 backdrop-blur transition hover:bg-white/15"
            >
              <ArrowRight size={13} /> Airport connections
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-amber-300 backdrop-blur">
                <Plane size={23} />
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-black tracking-widest">
                {a.code}
              </span>
            </div>
            <p className="eyebrow mt-5 text-amber-300">
              {a.city} · Airport enquiry
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-.04em] sm:text-6xl">
              A smoother plan
              <br className="hidden sm:block" /> to and from {a.name}.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              {a.description}
            </p>
            <a
              href={
                site.whatsapp
                  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
                  : "/#book"
              }
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"
            >
              Enquire about this airport <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-5">
        <div className="container-wide">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,26,47,.10)] sm:grid-cols-3">
            <div className="flex items-center gap-3 p-4 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <Plane size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Airport code</p>
                <p className="mt-1 text-[10px] text-slate-500">{a.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                <Clock3 size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Flight schedule</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Share date and local time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Pickup or drop</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Add the exact address
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-10 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <div>
          <p className="eyebrow text-amber-700">Transfer planning</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
            Give the team a clear flight plan.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Include the details below in your enquiry. The team can then discuss
            your pickup or drop request and confirm the meeting point,
            availability, fare and any waiting terms.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              [
                "Flight number",
                "Share it when available, especially for an arrival.",
              ],
              [
                "Terminal or meeting point",
                "Add the terminal and a practical pickup gate or meeting landmark.",
              ],
              [
                "Onward address",
                "Name the hotel, home, station, city area or other drop location.",
              ],
              [
                "Passengers and luggage",
                "Mention group size, luggage or any special travel requirements.",
              ],
            ].map(([title, copy], i) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f2f7fc] text-[10px] font-black text-blue-800">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-sm font-black">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="flex flex-col justify-between rounded-[26px] bg-[#071a2f] p-5 text-white sm:p-7">
          <div>
            <p className="eyebrow text-amber-300">Arrival or departure?</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Help the pickup
              <br />
              plan come together.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The team needs different details depending on whether the cab is
              meeting a flight or taking you to one.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                For arrivals
              </span>
              <p className="mt-2 text-sm font-bold">
                Flight · terminal · meeting point
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Add the onward address and enough context for the team to
                discuss the pickup.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                For departures
              </span>
              <p className="mt-2 text-sm font-bold">
                Pickup address · flight time
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Share when you want to leave and when your flight departs.
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-400">
            Always confirm current terminal and airport pickup rules before
            travel.
          </p>
        </aside>
      </section>

      <section className="bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-wide flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-amber-700">A clear expectation</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              This is a transfer enquiry, not a live booking.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Flight operations, pickup procedures, wait times, vehicle and fare
              can change. Confirm the latest arrangements directly with the
              airport and Vistar Cabs.
            </p>
          </div>
          <Link
            href="/#book"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0758c9] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0649a6]"
          >
            Open the enquiry form <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {(city || cityRoutes.length > 0) && (
        <section className="container-wide py-14 sm:py-18">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-700">
                Continue your trip planning
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Explore {city?.name || a.city} connections.
              </h2>
            </div>
            {city && (
              <Link
                href={`/cities/${city.slug}`}
                className="inline-flex items-center gap-2 text-sm font-black text-blue-800"
              >
                Open city guide <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
          {cityRoutes.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cityRoutes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-amber-300"
                >
                  {r.from} <span className="text-amber-700">→</span> {r.to}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}
