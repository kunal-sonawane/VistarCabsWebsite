import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { nearbyPlacesByCity } from "@/lib/site";

type Props = {
  citySlug: string;
  cityName: string;
  eyebrow?: string;
  airportDistanceKm?: number;
};

export default function NearbyPlaces({
  citySlug,
  cityName,
  eyebrow = "Explore nearby",
  airportDistanceKm,
}: Props) {
  const places = nearbyPlacesByCity[citySlug];
  if (!places?.length) return null;

  return (
    <section className="bg-[#f4f7fb] py-12 sm:py-16">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow text-amber-700">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Places to visit near {cityName}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Approximate road distances from the {cityName} city centre, shown as
            a first planning guide. Your route may differ with the pickup point,
            chosen entrance, traffic and road conditions.
            {airportDistanceKm !== undefined && (
              <> From the airport, first allow for about {airportDistanceKm} km to the city centre; the onward distance depends on your destination and route.</>
            )}
          </p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => (
            <li key={place.name} className="min-w-0">
              <article className="flex h-full gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-black leading-5 text-slate-900">{place.name}</h3>
                    <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-900">
                      ~{place.distanceKm} km
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{place.note}</p>
                  {place.href && (
                    <Link href={place.href} className="mt-3 inline-flex min-h-11 items-center gap-1 text-xs font-extrabold text-[#0758c9] hover:underline">
                      Destination guide <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Distances are approximate planning references, not a live navigation estimate. Check the route on your travel date and confirm the exact pickup and drop points.
        </p>
      </div>
    </section>
  );
}
