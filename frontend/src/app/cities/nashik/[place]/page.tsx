import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { places, routes } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type Props = { params: Promise<{ place: string }> };
export const dynamic = "force-dynamic";

const photos: Record<string, { src: string; alt: string }> = {
  trimbakeshwar: {
    src: "/images/blogs/nashik-to-trimbakeshwar-travel-guide.jpg",
    alt: "Trimbakeshwar Temple at the foot of the green Brahmagiri hills",
  },
  anjaneri: {
    src: "/images/destinations/anjaneri.jpg",
    alt: "Anjaneri hill area in the Nashik region",
  },
  igatpuri: {
    src: "/images/sahyadri-journey.png",
    alt: "A road journey through the Sahyadri hills",
  },
  vineyards: {
    src: "/images/cities/nashik-ramkund-clear.jpg",
    alt: "Godavari riverfront in Nashik",
  },
  panchavati: {
    src: "/images/cities/nashik-ramkund-clear.jpg",
    alt: "Godavari riverfront and ghats in Nashik",
  },
  "pandavleni-caves": {
    src: "/images/destinations/ellora-caves.jpg",
    alt: "Rock-cut heritage architecture in Maharashtra",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place } = await params;
  const item = places.find((candidate) => candidate.slug === place);
  if (!item) return {};
  const path = `/cities/nashik/${item.slug}`;
  return metadataWithSeoOverride(path, {
    title: `${item.name} Cab Enquiry`,
    description: item.description,
    alternates: { canonical: path },
  });
}

export default async function NashikPlacePage({ params }: Props) {
  const { place } = await params;
  const item = places.find((candidate) => candidate.slug === place);
  if (!item) notFound();
  const pagePath = `/cities/nashik/${item.slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;

  const photo = photos[item.slug] || {
    src: "/images/cities/nashik-ramkund-clear.jpg",
    alt: `Nashik region view for ${item.name}`,
  };
  const relatedRoutes = routes
    .filter((route) => route.from === "Nashik" || route.to === "Nashik")
    .slice(0, 5);
  const faqs = [
    {
      q: `Can I request a trip to ${item.name}?`,
      a: "Yes. Send the pickup, date, passenger count and return preference. The team will confirm whether the request can be arranged.",
    },
    { q: "Should I check opening hours or visitor access?", a: item.tip },
    {
      q: "Does this page guarantee cab availability?",
      a: "No. This is a destination and enquiry guide. Confirm availability, timing and fare directly with Vistar Cabs.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#e7f5ff]">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/72 to-[#071a2f]/35" />
        <Header />
        <div className="container-wide pb-16 pt-36">
          <Link
            href="/cities/nashik"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/80"
          >
            <ArrowLeft size={14} /> Nashik journeys
          </Link>
          <p className="eyebrow mt-9 text-amber-300">
            Destination guide · Nashik
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            {item.title}
            <span className="text-amber-400">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/90">
            {item.description}
          </p>
        </div>
      </section>

      <section className="container-wide grid gap-8 py-10 lg:grid-cols-[1fr_330px] lg:py-14">
        <article className="order-2 rounded-2xl border border-slate-200 bg-white p-6 sm:p-9 lg:order-1">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-amber-700">
            <MapPin size={22} />
          </span>
          <p className="eyebrow mt-5 text-amber-600">Local trip planning</p>
          <h2 className="mt-2 text-2xl font-black">
            Build your {item.name} itinerary.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            {item.description} Include your origin, exact destination, planned
            stops, date and approximate return time. Share accessibility or
            luggage needs when relevant so arrangements can be discussed.
          </p>
          <h2 className="mt-7 text-xl font-black">Cab planning for {item.name}</h2>
          <div className="mt-3 space-y-4 text-base leading-8 text-slate-700">
            <p>
              Start by deciding whether you need a direct one-way drop, a return
              pickup after your visit or a longer itinerary with several
              destinations. Provide the full pickup address in Nashik and the
              road drop point you intend to use for {item.name}. If you are
              travelling from a hotel, railway station, airport or another
              temple area, include that location and its scheduled arrival time
              so the team can understand the transfer from the beginning.
            </p>
            <p>
              Stops, waiting time, visit duration and the return window all
              affect the trip plan. Add each destination in order and tell
              Vistar Cabs about passenger count, luggage or mobility needs.
              Before departure, check current opening hours, entry rules,
              weather, road access and any venue-specific pickup guidance with
              the relevant authority. The cab enquiry does not provide entry
              tickets or confirm that a site is open on your travel date.
            </p>
            <p>
              Use the enquiry form to share your date, preferred time, origin
              and destination, then keep your mobile available for follow-up.
              Ask the team to confirm the available vehicle, complete fare,
              tolls, waiting or extra-stop terms before accepting. A submitted
              request is not a confirmed booking; make final travel plans after
              Vistar Cabs has replied with the agreed details.
            </p>
          </div>
          <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Before you go: {item.tip}
          </p>

          {item.slug === "trimbakeshwar" && (
            <section className="mt-8 rounded-2xl bg-[#f2f7fc] p-5 sm:p-6">
              <p className="eyebrow text-amber-700">
                A little beyond the temple visit
              </p>
              <h2 className="mt-2 text-xl font-black">
                What to explore around Trimbak
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The town is known for Trimbakeshwar Shiva Temple and nearby
                Kushavart Tirtha. Anjaneri hill is another Nashik-region
                excursion visitors may want to plan separately. Check current
                venue, temple and trail guidance before setting out.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <article className="overflow-hidden rounded-xl bg-white">
                  <div className="relative h-36">
                    <Image
                      src="/images/blogs/nashik-to-trimbakeshwar-travel-guide.jpg"
                      alt="Trimbakeshwar Temple and Brahmagiri hills"
                      fill
                      sizes="(max-width: 639px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-black">Trimbakeshwar Temple</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      Confirm current darshan timings, entry guidance and local
                      vehicle access with the relevant authority.
                    </p>
                  </div>
                </article>
                <article className="overflow-hidden rounded-xl bg-white">
                  <div className="relative h-36">
                    <Image
                      src="/images/cities/nashik-ramkund-clear.jpg"
                      alt="Godavari riverfront near Nashik"
                      fill
                      sizes="(max-width: 639px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-black">Kushavart Tirtha</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      A nearby landmark in Trimbak town. Include it as a
                      separate stop and confirm current access guidance.
                    </p>
                  </div>
                </article>
                <article className="overflow-hidden rounded-xl bg-white sm:col-span-2">
                  <div className="grid sm:grid-cols-[.8fr_1.2fr]">
                    <div className="relative min-h-40">
                      <Image
                        src="/images/destinations/anjaneri.jpg"
                        alt="Anjaneri hills near Nashik"
                        fill
                        sizes="(max-width: 639px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-black">
                        Anjaneri hill and fort area
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        Consider a separate trip plan for the hill area. Share
                        the road drop point; cab access does not imply access
                        onto trails.
                      </p>
                      <Link
                        href="/cities/nashik/anjaneri"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-blue-800"
                      >
                        Open Anjaneri guide <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
              <a
                href="https://maharashtratourism.gov.in/temple/trimbakeshwar/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-xs font-bold text-blue-800 underline"
              >
                Check Maharashtra Tourism information ↗
              </a>
            </section>
          )}

          {item.slug === "anjaneri" && (
            <section className="mt-8 rounded-2xl bg-[#f2f7fc] p-5 sm:p-6">
              <p className="eyebrow text-amber-700">Hill and heritage outing</p>
              <h2 className="mt-2 text-xl font-black">
                Plan the road approach and trail separately
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Maharashtra Tourism highlights Anjaneri among the Nashik
                region’s forts and hiking areas. Check current trail and weather
                information, share your preferred road drop, and confirm the
                return pickup point before setting out.
              </p>
              <a
                href="https://maharashtratourism.gov.in/districts/nashik/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-xs font-bold text-blue-800 underline"
              >
                Read Nashik destination guidance ↗
              </a>
            </section>
          )}

          <h2 className="mt-8 text-xl font-black">
            How to make a clear enquiry
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600">
            <li>Provide the pickup address and destination or venue.</li>
            <li>
              Include date, pickup time, passenger count and return preference.
            </li>
            <li>
              Confirm availability, fare, waiting time and additional stops
              directly.
            </li>
          </ol>
          <h2 className="mt-8 text-xl font-black">
            Frequently asked questions
          </h2>
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-slate-100 py-4">
              <h3 className="font-bold">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
            </div>
          ))}
          <h2 className="mt-8 text-xl font-black">
            Other Nashik journey options
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedRoutes.map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold"
              >
                {route.from} → {route.to}
              </Link>
            ))}
            <Link
              href="/airports/nashik-ozar"
              className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800"
            >
              Nashik airport connection
            </Link>
          </div>
          <Link
            href="/cities/nashik"
            className="mt-6 inline-flex items-center gap-2 text-sm font-black"
          >
            All Nashik travel ideas <ArrowUpRight size={16} />
          </Link>
        </article>
        <aside className="order-1 h-fit lg:order-2">
          <QuickTripEnquiry
            initialFrom="Nashik"
            initialTo={item.name}
            title={`Enquire about ${item.name}`}
          />
        </aside>
      </section>
      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}

