import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Plane, Route } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { airports, cities, routes } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/maharashtra", {
    title: "Maharashtra City, Airport and Cab Journey Guides",
    description:
      "Browse Vistar Cabs city, airport, destination and intercity route pages across Maharashtra, with Nashik as the central starting point.",
    alternates: { canonical: "/maharashtra" },
  });
}

const cityImages: Record<string, string> = {
  nashik: "/images/cities/nashik-ramkund-clear.jpg",
  mumbai: "/images/cities/mumbai.jpg",
  pune: "/images/cities/pune.jpg",
  sambhajinagar: "/images/cities/sambhajinagar.jpg",
  ahilyanagar: "/images/cities/ahilyanagar.jpg",
  shirdi: "/images/cities/shirdi.jpg",
};

export default async function MaharashtraPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/images/sahyadri-journey.png"
          alt="Maharashtra road winding through the Sahyadri hills"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/70 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide pb-16 pt-36">
          <p className="eyebrow text-amber-300">Vistar Cabs · Maharashtra</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Nashik at the centre.
            <br />
            <span className="text-amber-300">Routes across Maharashtra.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            Explore the cities, airports and destination guides currently
            available on this website. Start with the city or route you need,
            then send an enquiry so Vistar Cabs can confirm availability and
            trip terms.
          </p>
          <Link
            href="/cities/nashik"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950"
          >
            Explore Nashik <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-amber-700">City guides</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Choose where you’re going.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-600">
            Each city guide brings local areas, airport information and relevant
            route links together.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group relative isolate flex min-h-56 items-end overflow-hidden rounded-2xl text-white"
            >
              <Image
                src={cityImages[city.slug] || cityImages.nashik}
                alt={`${city.name} city view`}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="-z-20 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071a2f]/95 via-[#071a2f]/25 to-transparent" />
              <div className="p-5">
                <h3 className="text-xl font-black">{city.name}</h3>
                <p className="mt-1 max-w-sm text-xs leading-5 text-white/80">
                  {city.detail}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold">
                  Open city guide <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-wide">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-blue-800 shadow-sm">
              <Plane size={20} />
            </span>
            <div>
              <p className="eyebrow text-amber-700">Airport connections</p>
              <h2 className="mt-1 text-2xl font-black">Airport pages</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {airports.map((airport) => (
              <Link
                key={airport.slug}
                href={`/airports/${airport.slug}`}
                className="group flex min-h-20 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md"
              >
                <span>
                  <span className="block text-sm font-black">
                    {airport.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {airport.city} · {airport.code}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="text-blue-800 transition group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-800">
            <Route size={20} />
          </span>
          <div>
            <p className="eyebrow text-amber-700">Intercity journey guides</p>
            <h2 className="mt-1 text-2xl font-black">Popular connections</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {routes.slice(0, 12).map((route) => (
            <Link
              key={route.slug}
              href={`/${route.slug}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 text-sm font-bold transition hover:border-amber-300 hover:bg-amber-50"
            >
              <span>
                {route.from} <span className="text-amber-700">→</span>{" "}
                {route.to}
              </span>
              <ArrowRight size={15} className="text-slate-400" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Routes are enquiry guides. Ask Vistar Cabs to confirm service,
          vehicle, fare and travel conditions for your dates.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

