import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Plane,
  Route,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import NearbyPlaces from "@/components/NearbyPlaces";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import {
  airports,
  cities,
  cityContent,
  destinationGuides,
  routes,
} from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

export const dynamic = "force-dynamic";
const nashikGuideSlugs: Record<string, string> = {
  "Panchavati and Ramkund": "panchavati",
  Trimbakeshwar: "trimbakeshwar",
  "Anjaneri hills": "anjaneri",
  "Sula and vineyard district": "vineyards",
  "Pandavleni Caves": "pandavleni-caves",
  Sinnar: "sinnar",
  "Nashik Road": "nashik-road",
  "Igatpuri and vineyard district": "igatpuri",
};
const placeDescriptions: Record<string, string> = {
  "Panchavati and Ramkund":
    "Historic riverfront and city-area stops. Name the exact ghat, pickup point and any other visits.",
  Trimbakeshwar:
    "A dedicated temple-area road journey from Nashik; check current access and visit guidance.",
  "Anjaneri hills":
    "A Nashik-region hill and fort area outing. Confirm the road drop point, local access and trail conditions before travelling.",
  "Sula and vineyard district":
    "Share venue names and planned arrival times; check reservations and visitor arrangements directly.",
  "Pandavleni Caves":
    "An outing on Nashik’s outskirts. Include time for the approach and check current entry information.",
  Sinnar:
    "Provide the exact pickup and drop addresses, including industrial or onward destinations.",
  "Nashik Road":
    "For station pickups, share your train arrival and a clear exit or meeting point.",
  "Igatpuri and vineyard district":
    "A hill and countryside itinerary benefits from a stop list and return window.",
  "South Mumbai and Fort":
    "Share a street address and practical pickup point for central Mumbai.",
  "Bandra and western suburbs":
    "Name the neighbourhood, building or venue and any extra city stops.",
  Thane:
    "Give the exact neighbourhood and onward destination rather than only “Mumbai”.",
  "Navi Mumbai":
    "Include the locality, sector or node and a clear meeting point.",
  "Mumbai CSMIA (BOM)":
    "Choose terminal and share flight number and scheduled time.",
  "Navi Mumbai International Airport (NMI)":
    "Include flight details, terminal when known and the onward address.",
  "Shivajinagar and central Pune":
    "Share a full address or nearby landmark and any time-sensitive arrival.",
  "Hinjawadi and west Pune":
    "Mention the phase, office or pickup point and return plan.",
  "Pune Airport": "Include flight details and the exact onward address.",
  "Pune Railway Station":
    "Share train details, station exit and a practical meeting point.",
  Lonavala:
    "Choose the places you want to visit and check access details before travelling.",
  Bhimashankar:
    "Plan as a dedicated road trip; check current temple, sanctuary and weather guidance.",
  "Bibi Ka Maqbara":
    "Add the landmark as a stop and share the arrival point and return plan.",
  Panchakki:
    "Mention this stop alongside any other city destinations and check visitor information.",
  "Ellora Caves":
    "Allow time for the road journey and site visit; confirm current entry details.",
  "Ajanta Caves":
    "Plan this separately from Ellora and include a return or overnight arrangement.",
  "Chhatrapati Sambhajinagar Airport":
    "Include flight details, date and pickup/drop address.",
  "Ahmednagar Fort":
    "Check current visitor information and include the fort as a named stop.",
  Meherabad:
    "Share the exact destination, visit time and onward or return plan.",
  "Shani Shingnapur route":
    "Mention the temple area and other stops; confirm access and return.",
  Bhandardara:
    "Name the attraction or accommodation; consider current weather and road access.",
  "Local city pickups":
    "Provide the neighbourhood and exact destination address.",
  "Shri Sai Baba Samadhi Mandir":
    "Mention the temple area, accommodation or a clear meeting point.",
  Dwarkamai: "Add it to the stop list and share your preferred visit sequence.",
  Chavadi: "Name Chavadi in the requested stop order.",
  "Shirdi Airport":
    "Include flight timing and onward destination; confirm transfer availability directly.",
};
const cityPhoto: Record<string, { src: string; alt: string; eyebrow: string }> =
  {
    nashik: {
      src: "/images/cities/nashik-ramkund-clear.jpg",
      alt: "Godavari riverfront and temple area in Nashik",
      eyebrow: "Nashik · Home city",
    },
    mumbai: {
      src: "/images/cities/mumbai-gateway-taj.png",
      alt: "Gateway of India and the Taj Mahal Palace Hotel on Mumbai waterfront",
      eyebrow: "Mumbai · City and airport connections",
    },
    pune: {
      src: "/images/cities/pune-shaniwar-wada.png",
      alt: "Shaniwar Wada heritage gateway in Pune",
      eyebrow: "Pune · City and weekend journeys",
    },
    sambhajinagar: {
      src: "/images/cities/sambhajinagar.jpg",
      alt: "Bibi Ka Maqbara in Chhatrapati Sambhajinagar",
      eyebrow: "Chhatrapati Sambhajinagar · Heritage trips",
    },
    ahilyanagar: {
      src: "/images/cities/ahilyanagar.jpg",
      alt: "Historic fort in Ahilyanagar",
      eyebrow: "Ahilyanagar · Regional connections",
    },
    shirdi: {
      src: "/images/cities/shirdi.jpg",
      alt: "Sai Baba temple area in Shirdi",
      eyebrow: "Shirdi · Pilgrimage connections",
    },
  };
const cityPlacePhoto: Record<string, string> = {
  "Panchavati and Ramkund": "/images/cities/nashik-ramkund-clear.jpg",
  "Anjaneri hills": "/images/destinations/anjaneri.jpg",
  "Igatpuri and vineyard district": "/images/sahyadri-journey.png",
  "South Mumbai and Fort": "/images/destinations/south-mumbai-and-fort.jpg",
  "Thane": "/images/destinations/thane.jpg",
  "Navi Mumbai": "/images/destinations/navi-mumbai.jpg",
  "Lonavala": "/images/destinations/lonavala.jpg",
  "Bhimashankar": "/images/destinations/bhimashankar.jpg",
  "Bibi Ka Maqbara": "/images/cities/sambhajinagar.jpg",
  "Ellora Caves": "/images/destinations/ellora-caves.jpg",
  "Ajanta Caves": "/images/destinations/ajanta-caves.jpg",
  "Shani Shingnapur route": "/images/destinations/shani-shingnapur-route.jpg",
  "Bhandardara": "/images/destinations/bhandardara.jpg",
  "Shri Sai Baba Samadhi Mandir": "/images/destinations/shirdi-pilgrimage-area.jpg",
};
type Props = { params: Promise<{ city: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) return {};
  const path = `/cities/${c.slug}`;
  const fallback: Metadata = {
    title: `Cab Enquiries in ${c.name}`,
    description: `Explore local travel ideas, airport connections and intercity cab enquiry links for ${c.name}. Confirm availability directly with Vistar Cabs.`,
    alternates: { canonical: path },
    openGraph: {
      title: `Cab Enquiries in ${c.name} | Vistar Cabs`,
      description: c.intro,
    },
  };
  return metadataWithSeoOverride(path, fallback);
}
export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) notFound();
  const pagePath = `/cities/${c.slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  const content = cityContent[c.slug];
  const related = routes.filter((r) => r.from === c.name || r.to === c.name);
  const linkedAirports = airports.filter((a) => a.city === c.name);
  const otherCities = cities.filter((x) => x.slug !== c.slug);
  const photo = cityPhoto[c.slug] || cityPhoto.nashik;
  const places = c.places.map((place) => {
    const slug = c.slug === "nashik" ? nashikGuideSlugs[place] : undefined;
    const guide = destinationGuides.find(
      (g) => g.citySlug === c.slug && g.name === place,
    );
    return {
      name: place,
      image: cityPlacePhoto[place],
      description:
        placeDescriptions[place] ||
        `Name ${place} as a pickup, destination or planned stop when describing a ${c.name} trip.`,
      href: slug
        ? `/cities/nashik/${slug}`
        : guide
          ? `/cities/${c.slug}/${guide.slug}`
          : null,
    };
  });
  const faq = [
    {
      q: `What should I share for a ${c.name} cab enquiry?`,
      a: "Send the exact pickup and destination, date, preferred time, passenger count if known, any stops and whether you need a return.",
    },
    {
      q: "Do these pages confirm service or fare?",
      a: "No. The places and routes are planning references; availability, vehicle, fare and travel terms must be confirmed directly.",
    },
    {
      q: "Can I include an airport in my trip?",
      a: "Yes. Select Airport in the enquiry form and share the airport, terminal and flight details when available.",
    },
    {
      q: `Can I enquire about a local cab in ${c.name}?`,
      a: `Yes. Enter the exact pickup and destination in ${c.name}. If you want to visit several places, list each stop and ask the team to confirm the requested schedule and availability.`,
    },
    {
      q: `Can I ask for a one-way or return cab from ${c.name}?`,
      a: "Yes. State whether you need a one-way drop or a return journey. For a return, provide the date and preferred time if known; confirm the final fare and waiting terms directly.",
    },
    {
      q: "Can I book a cab for a sightseeing or pilgrimage itinerary?",
      a: "You can send an enquiry with every destination in visit order, the date and expected return time. Check current opening, visitor access and local restrictions with the relevant venue.",
    },
    {
      q: "Does the enquiry form confirm a cab or fare immediately?",
      a: "No. It records your trip request and opens WhatsApp with the details prepared. Vistar Cabs must reply to confirm availability, vehicle, fare and trip terms; press Send in WhatsApp to send that message.",
    },
  ];
  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate min-h-[470px] overflow-hidden text-white sm:min-h-[530px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/65 to-[#071a2f]/15" />
        <Header />
        <div className="container-wide grid min-h-[470px] items-center gap-8 py-28 sm:min-h-[530px] lg:grid-cols-[1.15fr_.85fr]">
          <div className="order-2 max-w-3xl lg:order-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/10 px-3.5 py-2 text-xs font-bold text-white/80 backdrop-blur transition hover:bg-white/15"
            >
              Vistar Cabs <ArrowRight size={13} /> Maharashtra
            </Link>
            <p className="eyebrow mt-7 text-amber-300">{photo.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-6xl">
              Cab journeys
              <br className="hidden sm:block" /> in {c.name}
              <span className="text-amber-300">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              {c.intro}
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <QuickTripEnquiry initialFrom={c.name} title={`Plan a trip from ${c.name}`} />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/20" />
      </section>

      <section className="relative z-10 -mt-5">
        <div className="container-wide">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,26,47,.10)] sm:grid-cols-3">
            <div className="flex items-center gap-3 p-4 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Local pickup</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Share a clear address
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                <Route size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Intercity routes</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  One-way or return request
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <Plane size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Airport connections</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Add terminal and flight info
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content && (
        <section className="container-wide grid gap-6 py-8 sm:py-10 lg:grid-cols-2">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="eyebrow text-amber-700">Cab services in {c.name}</p>
            <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
              {content.heading}
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              {content.overview}
            </p>
            <ul className="mt-3 hidden gap-x-5 lg:grid lg:grid-cols-2">
              {content.services.map((service) => (
                <li key={service.title} className="border-b border-slate-200 py-2.5">
                  <h3 className="text-sm font-extrabold">{service.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{service.copy}</p>
                </li>
              ))}
            </ul>
            <details className="mt-2 lg:hidden">
              <summary className="min-h-11 cursor-pointer border-b border-slate-200 py-2 text-xs font-extrabold text-blue-900">
                Cab services and trip options
              </summary>
              <ul className="grid gap-x-4 sm:grid-cols-2">
                {content.services.map((service) => (
                  <li key={service.title} className="border-b border-slate-200 py-2">
                    <h3 className="text-xs font-extrabold">{service.title}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-slate-600">{service.copy}</p>
                  </li>
                ))}
              </ul>
            </details>
            <div className="mt-3 flex flex-wrap gap-2">
              {places.map((place) => (
                place.href ? (
                  <Link key={place.name} href={place.href} className="inline-flex min-h-9 items-center rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-blue-800 hover:border-amber-400">
                    {place.name}
                  </Link>
                ) : (
                  <span key={place.name} className="inline-flex min-h-9 items-center rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-600">
                    {place.name}
                  </span>
                )
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <NearbyPlaces
              inline
              citySlug={c.slug}
              cityName={c.name}
              eyebrow="Approximate road distances from the city centre"
            />
          </div>
        </section>
      )}

      {content?.editorialSections?.length ? (
        <details className="container-wide border-t border-slate-200 py-3">
          <summary className="min-h-11 cursor-pointer py-2 text-sm font-extrabold text-blue-900">
            More local travel notes for {c.name}
          </summary>
          <div className="grid gap-5 pb-4 pt-2 lg:grid-cols-2">
            {content.editorialSections.map((group) => (
              <section key={group.title} className="min-w-0 rounded-2xl bg-[#f4f7fb] p-4 sm:p-5">
                <p className="eyebrow text-amber-700">{group.eyebrow}</p>
                <h2 className="mt-1 text-lg font-black">{group.title}</h2>
                <p className="mt-1 text-xs leading-5 text-slate-600">{group.intro}</p>
                <ul className="mt-2 grid gap-x-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.title} className="border-b border-slate-200 py-2">
                      <h3 className="text-xs font-extrabold">{item.title}</h3>
                      <p className="mt-1 text-[11px] leading-4 text-slate-600">{item.copy}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>
      ) : null}
      {linkedAirports.length > 0 && (
        <section className="container-wide py-7 sm:py-9">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-700">Airport connections</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                {c.name} airport pages
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Flight, terminal and pickup details belong in the enquiry. Confirm
              meeting and waiting arrangements directly.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {linkedAirports.map((airport) => (
              <Link
                key={airport.slug}
                href={`/airports/${airport.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Plane size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black">
                    {airport.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {airport.city} · {airport.code}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-amber-700 transition group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-[#071a2f] py-8 text-white sm:py-10">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-amber-300">Intercity connections</p>
                <h2 className="mt-2 text-3xl font-black">
                  Routes from {c.name}
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-6 text-slate-300">
                Route pages contain concise planning and enquiry details. All
                availability is confirmed directly.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white/90 transition hover:border-amber-300/60 hover:bg-white/10"
                >
                  {r.from} <span className="text-amber-300">→</span> {r.to}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-wide grid gap-6 py-8 lg:grid-cols-[.7fr_1.3fr] sm:py-10">
        <div>
          <p className="eyebrow text-amber-700">Good to know</p>
          <h2 className="mt-3 text-3xl font-black">Before you enquire.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Pages help you plan the details. The Vistar Cabs team confirms
            availability, vehicle and fare for your specific request.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {otherCities.map((x) => (
              <Link
                key={x.slug}
                href={`/cities/${x.slug}`}
                className="rounded-full border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-amber-300"
              >
                {x.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {faq.map((item) => (
            <details key={item.q} className="group py-2.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                <span>{item.q}</span>
                <span className="text-xl text-amber-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}
