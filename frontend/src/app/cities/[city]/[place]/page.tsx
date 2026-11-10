import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Route, Plane } from "lucide-react";
import Header from "@/components/Header";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import NearbyPlaces from "@/components/NearbyPlaces";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airports, cities, destinationGuides, routes } from "@/lib/site";
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
      ? "/images/cities/mumbai-gateway-taj.png"
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
        </div>
      </section>
      <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <article className="order-2 rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 lg:order-1">
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
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
            <p>
              A useful {guide.name} cab request describes the journey from its
              starting point to the exact entrance, parking area or meeting
              place you intend to use. Include your full pickup address in
              {" "}{guide.cityName}, the travel date and preferred time, and a
              mobile number for follow-up. If a destination has more than one
              gate or access road, identify the one that suits your visit and
              check current access instructions with the venue.
            </p>
            <p>
              Think about the whole outing before sending the request. A direct
              drop, a return pickup after a visit and a multi-stop itinerary
              have different timing needs. Name every stop in travel order and
              estimate how long you expect to stay. Mention passenger count,
              luggage or mobility needs so Vistar Cabs can discuss the vehicle
              options available for your date. Waiting, extra stops and any
              return arrangement should be confirmed with the team in advance.
            </p>
            <p>
              Destination access, entry tickets, opening hours, trail or temple
              rules and event-day restrictions are set by the relevant venue or
              authority, not by the cab enquiry. Check those details before
              choosing a pickup time. The request form prepares your trip
              details and opens WhatsApp; press Send there if you want to
              contact Vistar Cabs. Treat the journey as pending until the team
              confirms availability, fare, vehicle and pickup arrangements.
            </p>
          </div>
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
        <aside className="order-1 h-fit lg:order-2">
          <QuickTripEnquiry
            initialFrom={guide.cityName}
            initialTo={guide.name}
            title={`Enquire about ${guide.name}`}
          />
          {hub && (
            <Link
              href={`/cities/${hub.slug}`}
              className="mt-3 block text-center text-xs font-bold text-slate-600 hover:text-blue-800"
            >
              Back to {hub.name} city page
            </Link>
          )}
        </aside>
      </section>
      {hub && (
        <NearbyPlaces
          citySlug={hub.slug}
          cityName={hub.name}
          eyebrow={`More places around ${hub.name}`}
        />
      )}
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
