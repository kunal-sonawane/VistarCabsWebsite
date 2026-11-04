import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Plane,
  Route,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
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
  site,
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
      src: "/images/cities/mumbai.jpg",
      alt: "Gateway of India in Mumbai",
      eyebrow: "Mumbai · City and airport connections",
    },
    pune: {
      src: "/images/cities/pune.jpg",
      alt: "Pune city skyline",
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
        <div className="container-wide flex min-h-[470px] items-center py-28 sm:min-h-[530px]">
          <div className="max-w-3xl">
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
            <a
              href={
                site.whatsapp
                  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello Vistar Cabs, please contact me about a cab journey in ${c.name}.`)}`
                  : "/#book"
              }
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"
            >
              Ask about a {c.name} trip <ArrowUpRight size={16} />
            </a>
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

      <section className="container-wide grid gap-10 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <div>
          <p className="eyebrow text-amber-700">A local view of {c.name}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Places to include
            <br className="hidden sm:block" /> in your trip plan.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Choose the area or destination that best describes your journey.
            Check current visitor access separately and confirm cab availability
            for your date.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {places.map((place, i) => (
              <article
                key={place.name}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f2f7fc] text-[10px] font-black text-blue-800">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-black">{place.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {place.description}
                    </p>
                    {place.href && (
                      <Link
                        href={place.href}
                        className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#0758c9]"
                      >
                        View destination guide <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[24px] bg-[#f4f7fb] p-5 sm:p-7">
          <p className="eyebrow text-amber-700">Plan with a little clarity</p>
          <h2 className="mt-3 text-2xl font-black">
            What helps us shape the enquiry?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A few details make it easier to understand the trip you have in
            mind.
          </p>
          {content && (
            <div className="mt-5 space-y-4">
              {content.checklist.map((item, i) => (
                <div key={item} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-blue-700 shadow-sm">
                    <Check size={14} />
                  </span>
                  <p className="pt-1 text-xs leading-5 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/#book"
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0758c9] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0649a6]"
          >
            Start an enquiry <ArrowRight size={16} />
          </Link>
        </aside>
      </section>

      {content && (
        <section className="bg-[#f4f7fb] py-14 sm:py-18">
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="eyebrow text-amber-700">Local trip ideas</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {content.heading}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {content.overview}
              </p>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {content.tripIdeas.map((idea, i) => (
                <article
                  key={idea.title}
                  className="rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(7,26,47,.04)]"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                    Trip idea 0{i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-black">{idea.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {idea.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {linkedAirports.length > 0 && (
        <section className="container-wide py-14 sm:py-18">
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
        <section className="bg-[#071a2f] py-14 text-white sm:py-16">
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

      <section className="container-wide grid gap-10 py-14 lg:grid-cols-[.7fr_1.3fr] sm:py-18">
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
            <details key={item.q} className="group py-4">
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

