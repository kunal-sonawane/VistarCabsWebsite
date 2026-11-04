import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Route, Plane } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airports, cities, destinationGuides, routes, site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type Props = { params: Promise<{ city: string; place: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, place } = await params;
  const g = destinationGuides.find(
    (item) => item.citySlug === city && item.slug === place,
  );
  if (!g) return {};
  const path = `/cities/${g.citySlug}/${g.slug}`;
  const fallback: Metadata = {
    title: g.title,
    description: g.intro,
    alternates: { canonical: path },
    openGraph: { title: `${g.title} | Vistar Cabs`, description: g.intro },
  };
  return metadataWithSeoOverride(path, fallback);
}
export default async function DestinationPage({ params }: Props) {
  const { city, place } = await params;
  const guide = destinationGuides.find(
    (item) => item.citySlug === city && item.slug === place,
  );
  if (!guide) notFound();
  const pagePath = `/cities/${guide.citySlug}/${guide.slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  const hub = cities.find((c) => c.slug === city);
  const relatedGuides = destinationGuides.filter(
    (item) => item.citySlug === city && item.slug !== place,
  );
  const relatedRoutes = routes
    .filter((r) => r.from === guide.cityName || r.to === guide.cityName)
    .slice(0, 6);
  const relatedAirports = airports.filter((a) => a.city === guide.cityName);
  const message = `Hello Vistar Cabs, I would like to enquire about a cab journey to ${guide.name} from ${guide.cityName}.`;
  const destinationPhotos: Record<string, string> = {
    "south-mumbai-and-fort": "/images/destinations/south-mumbai-and-fort.jpg",
    thane: "/images/destinations/thane.jpg",
    "navi-mumbai": "/images/destinations/navi-mumbai.jpg",
    lonavala: "/images/destinations/lonavala.jpg",
    bhimashankar: "/images/destinations/bhimashankar.jpg",
    "ellora-caves": "/images/destinations/ellora-caves.jpg",
    "ajanta-caves": "/images/destinations/ajanta-caves.jpg",
    "shani-shingnapur-route": "/images/destinations/shani-shingnapur-route.jpg",
    bhandardara: "/images/destinations/bhandardara.jpg",
    "shirdi-pilgrimage-area": "/images/destinations/shirdi-pilgrimage-area.jpg",
    anjaneri: "/images/destinations/anjaneri.jpg",
    matheran: "/images/destinations/matheran.jpg",
    mahabaleshwar: "/images/destinations/mahabaleshwar.jpg",
  };
  const cityFallback =
    guide.citySlug === "mumbai"
      ? "/images/cities/mumbai.jpg"
      : guide.citySlug === "sambhajinagar"
        ? "/images/cities/sambhajinagar.jpg"
        : guide.citySlug === "ahilyanagar"
          ? "/images/cities/ahilyanagar.jpg"
          : guide.citySlug === "shirdi"
            ? "/images/cities/shirdi.jpg"
            : "/images/cities/nashik-ramkund-clear.jpg";
  const photo = destinationPhotos[guide.slug] || cityFallback;
  return (
    <main className="min-h-screen bg-[#e7f5ff]">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src={photo}
          alt={`${guide.name} travel landscape`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/75 to-[#071a2f]/25" />
        <Header />
        <div className="container-wide pb-16 pt-32 sm:pt-36">
          <Link
            href={`/cities/${guide.citySlug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white"
          >
            <ArrowLeft size={14} />
            {guide.cityName} travel
          </Link>
          <p className="eyebrow mt-9 text-amber-300">
            {guide.category} · {guide.cityName}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {guide.title}
            <span className="text-amber-400">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
            {guide.intro}
          </p>
          <a
            href={
              site.whatsapp
                ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
                : "/#book"
            }
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3.5 text-sm font-black text-slate-950"
          >
            Ask about this journey <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-700">
            <MapPin size={22} />
          </span>
          <p className="eyebrow mt-6 text-amber-700">Destination planning</p>
          <h2 className="mt-2 text-2xl font-black">
            Make the journey details clear.
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            This guide helps you prepare a cab enquiry for {guide.name}. It does
            not promise local coverage, admission, a particular vehicle or a
            confirmed booking.
          </p>
          <h2 className="mt-8 text-xl font-black">Before you request a cab</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {guide.planning.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl bg-[#e7f5ff] p-4 text-sm leading-6 text-slate-700"
              >
                <span className="font-black text-[#0758c9]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <h3 className="text-sm font-black text-amber-950">
              Details that help the team respond
            </h3>
            <p className="mt-2 text-sm leading-6 text-amber-950">
              Send your pickup address, destination entrance or meeting point,
              date, preferred time, passenger count if known, return plan and
              any other stops. Confirm the final schedule, fare and waiting
              terms directly.
            </p>
          </div>
          <section className="mt-9">
            <h2 className="text-xl font-black">Frequently asked questions</h2>
            <div className="mt-3 divide-y divide-slate-200">
              {guide.faq.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                    <span>{q}</span>
                    <span className="text-lg text-amber-600 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </section>
          <p className="mt-7 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500">
            Check current opening times, access rules, road conditions and venue
            requirements with the relevant authority before travel. Vistar Cabs
            confirms vehicle availability, trip terms and fare directly.
          </p>
        </article>
        <aside className="h-fit rounded-3xl bg-[#0758c9] p-6 text-white">
          <p className="eyebrow text-amber-300">Vistar Cabs · enquiry only</p>
          <h2 className="mt-3 text-2xl font-black">
            Plan with the details in hand.
          </h2>
          <p className="mt-3 text-sm leading-6 text-blue-100">
            Tell us where to collect you, where you want to go and how the day
            should run. The team will confirm what can be arranged.
          </p>
          <Link
            href="/#book"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-slate-950"
          >
            Open trip enquiry <ArrowRight size={16} />
          </Link>
          {hub && (
            <Link
              href={`/cities/${hub.slug}`}
              className="mt-3 block text-center text-xs font-bold text-white/80 hover:text-white"
            >
              Back to {hub.name} city page
            </Link>
          )}
        </aside>
      </section>
      {relatedRoutes.length > 0 && (
        <section className="container-wide pb-12">
          <p className="eyebrow text-amber-700">Intercity connections</p>
          <h2 className="mt-2 text-2xl font-black">
            Continue from {guide.cityName}.
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRoutes.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold hover:border-amber-300"
              >
                <span className="inline-flex items-center gap-2">
                  <Route size={16} className="text-[#0758c9]" />
                  {r.from} → {r.to}
                </span>
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      )}
      {relatedAirports.length > 0 && (
        <section className="container-wide pb-12">
          <p className="eyebrow text-blue-800">Airport pages</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedAirports.map((a) => (
              <Link
                key={a.slug}
                href={`/airports/${a.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-[#0758c9]"
              >
                <Plane size={14} />
                {a.name} ({a.code})
              </Link>
            ))}
          </div>
        </section>
      )}
      {relatedGuides.length > 0 && (
        <section className="container-wide pb-14">
          <p className="eyebrow text-amber-700">Nearby planning pages</p>
          <h2 className="mt-2 text-2xl font-black">
            Other {guide.cityName} journey ideas.
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/cities/${g.citySlug}/${g.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-md"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  {g.category}
                </span>
                <h3 className="mt-2 text-base font-black">{g.name}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
                  {g.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#0758c9]">
                  View guide <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}

