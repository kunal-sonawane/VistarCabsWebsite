import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nearbyPlacesByCity } from "@/lib/site";

type Props = {
  citySlug: string;
  cityName: string;
  eyebrow?: string;
  airportDistanceKm?: number;
  inline?: boolean;
};

export default function NearbyPlaces({
  citySlug,
  cityName,
  eyebrow = "Explore nearby",
  airportDistanceKm,
  inline = false,
}: Props) {
  const places = nearbyPlacesByCity[citySlug];
  if (!places?.length) return null;

  return (
    <section className={inline ? "min-w-0" : "bg-[#f4f7fb] py-7 sm:py-9"}>
      <div className={inline ? "" : "container-wide"}>
        <div className="max-w-3xl">
          <p className="eyebrow text-amber-700">{eyebrow}</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
            Places to visit near {cityName}
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Approximate road distances from the {cityName} city centre, shown as
            a first planning guide. Your route may differ with the pickup point,
            chosen entrance, traffic and road conditions.
            {airportDistanceKm !== undefined && (
              <> From the airport, first allow for about {airportDistanceKm} km to the city centre; the onward distance depends on your destination and route.</>
            )}
          </p>
        </div>
        <ul className="mt-3 grid gap-x-5 sm:grid-cols-2">
          {places.map((place) => (
            <li key={place.name} className="min-w-0 border-b border-slate-200 py-2.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-extrabold leading-5 text-slate-900">{place.name}</h3>
                <span className="shrink-0 text-xs font-black text-amber-800">~{place.distanceKm} km</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-600">{place.note}</p>
              {place.href && (
                <Link href={place.href} className="mt-1 inline-flex min-h-9 items-center gap-1 text-xs font-bold text-[#0758c9] hover:underline">
                  Destination guide <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] leading-4 text-slate-500">
          Distances are approximate planning references, not a live navigation estimate. Check the route on your travel date and confirm the exact pickup and drop points.
        </p>
      </div>
    </section>
  );
}
