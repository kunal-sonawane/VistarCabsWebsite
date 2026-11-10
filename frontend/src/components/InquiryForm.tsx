"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Plane,
} from "lucide-react";
import { getApiUrl, site } from "@/lib/site";

type Service = "Outstation" | "Airport" | "Hourly" | "Corporate";

type Values = {
  name: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  time: string;
  journeyType: "One Way" | "Round Trip";
  returnDate: string;
  returnTime: string;
  duration: string;
  airportDirection: string;
  flightNumber: string;
  terminal: string;
  passengers: string;
};

type Location = {
  name: string;
  district: string;
  localName?: string;
  kind: "Village" | "City" | "Area" | "Airport" | "Destination";
};

const initial: Values = {
  name: "",
  phone: "",
  from: "",
  to: "",
  date: "",
  time: "",
  journeyType: "One Way",
  returnDate: "",
  returnTime: "",
  duration: "4 hours",
  airportDirection: "Airport pickup",
  flightNumber: "",
  terminal: "",
  passengers: "",
};

const services: Service[] = ["Outstation", "Airport", "Hourly", "Corporate"];

const commonPlaces: Location[] = [
  "Nashik",
  "Nashik Road",
  "Panchavati, Nashik",
  "Trimbakeshwar",
  "Sinnar",
  "Igatpuri",
  "Ozar Airport, Nashik (ISK)",
  "Mumbai",
  "South Mumbai",
  "Bandra, Mumbai",
  "Andheri, Mumbai",
  "Thane",
  "Navi Mumbai",
  "Mumbai CSMIA Terminal 1 (BOM)",
  "Mumbai CSMIA Terminal 2 (BOM)",
  "Navi Mumbai International Airport (NMI)",
  "Pune",
  "Pune Airport (PNQ)",
  "Shivajinagar, Pune",
  "Hinjawadi, Pune",
  "Lonavala",
  "Bhimashankar",
  "Chhatrapati Sambhajinagar",
  "Chhatrapati Sambhajinagar Airport (IXU)",
  "Ellora Caves",
  "Ajanta Caves",
  "Ahilyanagar",
  "Shani Shingnapur",
  "Bhandardara",
  "Shirdi",
  "Shirdi Airport (SAG)",
  "Alandi",
  "Matheran",
  "Mahabaleshwar",
].map((name) => ({
  name,
  district: "Maharashtra",
  kind: /Airport|Terminal/.test(name)
    ? "Airport"
    : /Caves|Temple|Bhimashankar|Lonavala|Matheran|Mahabaleshwar|Shingnapur|Alandi/.test(
          name,
        )
      ? "Destination"
      : "City",
}));

let locationCache: Location[] | null = null;
let locationsPromise: Promise<Location[]> | null = null;

const control =
  "mt-1.5 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0758c9] focus:ring-2 focus:ring-blue-100";

function loadLocations(setAll: (locations: Location[]) => void) {
  if (locationCache) {
    setAll([...commonPlaces, ...locationCache]);
    return;
  }

  locationsPromise ??= fetch("/data/maharashtra-locations.json")
    .then((response) => (response.ok ? response.json() : []))
    .then((data: Location[]) => (Array.isArray(data) ? data : []));

  locationsPromise
    .then((data) => {
      locationCache = data;
      setAll([...commonPlaces, ...data]);
    })
    .catch(() => {});
}

function LocationField({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder: string;
  className?: string;
}) {
  const [all, setAll] = useState<Location[]>(commonPlaces);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [focused, setFocused] = useState(false);

  const query = value.trim().toLocaleLowerCase();

  const suggestions = query.length
    ? [
        ...new Map(
          all
            .filter(
              (place) =>
                place.name.toLocaleLowerCase().startsWith(query) ||
                place.localName?.toLocaleLowerCase().startsWith(query),
            )
            .map((place) => [`${place.name}|${place.district}`, place]),
        ).values(),
      ].slice(0, 8)
    : [];

  function choose(item: Location) {
    onChange(item.name);
    setOpen(false);
    setActive(-1);
  }

  return (
    <label
      className={`relative block text-[11px] font-extrabold text-slate-600 ${className ?? ""}`}
    >
      {label}

      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-blue-700"
          size={16}
        />

        <input
          name={name}
          required={required}
          minLength={required ? 2 : undefined}
          maxLength={160}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={`${name}-suggestions`}
          aria-activedescendant={
            active >= 0 ? `${name}-option-${active}` : undefined
          }
          value={value}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
            loadLocations(setAll);
          }}
          onBlur={() =>
            window.setTimeout(() => {
              setOpen(false);
              setFocused(false);
            }, 120)
          }
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && suggestions.length) {
              event.preventDefault();
              setActive((current) =>
                Math.min(current + 1, suggestions.length - 1),
              );
            } else if (event.key === "ArrowUp" && suggestions.length) {
              event.preventDefault();
              setActive((current) => Math.max(current - 1, 0));
            } else if (event.key === "Enter" && open && active >= 0) {
              event.preventDefault();
              choose(suggestions[active]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          className={`${control} pl-9`}
          placeholder={placeholder}
        />

        {open && focused && query.length > 0 && (
          <ul
            id={`${name}-suggestions`}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+5px)] z-30 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            {suggestions.length ? (
              suggestions.map((place, index) => (
                <li
                  key={`${place.name}-${index}`}
                  id={`${name}-option-${index}`}
                  role="option"
                  aria-selected={active === index}
                >
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(place)}
                    className={`flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2.5 text-left ${
                      active === index ? "bg-blue-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-800">
                      {place.name}
                      {place.localName ? ` · ${place.localName}` : ""}
                      <span className="mt-0.5 block text-[10px] font-medium text-slate-400">
                        {place.district}
                      </span>
                    </span>

                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500">
                      {place.kind}
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-3 text-xs text-slate-500">
                No match yet. You can still enter a custom pickup point.
              </li>
            )}
          </ul>
        )}
      </div>
    </label>
  );
}

export default function InquiryForm() {
  const [service, setService] = useState<Service>("Outstation");
  const [values, setValues] = useState<Values>(initial);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [whatsappFallback, setWhatsappFallback] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState(site.whatsapp);

  useEffect(() => {
    let active = true;

    fetch(`${getApiUrl()}/api/public/settings`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        const configured = String(result?.item?.whatsappNumber || "").replace(
          /\D/g,
          "",
        );

        if (active && configured) {
          setWhatsappNumber(configured);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const update = (key: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  function changeService(next: Service) {
    setService(next);
    setError("");
    setNotice("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setWhatsappFallback("");

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      serviceType: service,
      journeyType: service === "Outstation" ? values.journeyType : "",
      from: values.from.trim(),
      to: values.to.trim(),
      pickupDate: values.date,
      pickupTime: values.time,
      returnDate:
        service === "Outstation" && values.journeyType === "Round Trip"
          ? values.returnDate
          : "",
      returnTime:
        service === "Outstation" && values.journeyType === "Round Trip"
          ? values.returnTime
          : "",
      duration: service === "Hourly" ? values.duration : "",
      airportDirection: service === "Airport" ? values.airportDirection : "",
      flightNumber: service === "Airport" ? values.flightNumber.trim() : "",
      terminal: service === "Airport" ? values.terminal.trim() : "",
      ...(values.passengers ? { passengers: Number(values.passengers) } : {}),
      sourcePath: window.location.pathname,
    };

    const message = [
      "Hello Vistar Cabs, I would like to enquire about a cab.",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Service: ${payload.serviceType}${
        payload.journeyType ? ` · ${payload.journeyType}` : ""
      }`,
      `From: ${payload.from}`,
      `To: ${payload.to}`,
      `Pickup: ${payload.pickupDate} at ${payload.pickupTime}`,
      ...(payload.returnDate
        ? [`Return: ${payload.returnDate} at ${payload.returnTime}`]
        : []),
      ...(payload.duration ? [`Hourly package: ${payload.duration}`] : []),
      ...(payload.airportDirection
        ? [`Airport journey: ${payload.airportDirection}`]
        : []),
      ...(payload.flightNumber ? [`Flight: ${payload.flightNumber}`] : []),
      ...(payload.terminal ? [`Terminal: ${payload.terminal}`] : []),
      ...(payload.passengers ? [`Passengers: ${payload.passengers}`] : []),
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    // Open the tab during the user click so the browser is less likely to block it.
    const whatsappWindow = window.open("about:blank", "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    setSending(true);

    try {
      const response = await fetch(`${getApiUrl()}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "The enquiry could not be saved right now.",
        );
      }

      setNotice(
        `Thanks, ${values.name.trim()}. Your enquiry was saved. WhatsApp is opening with the details; press Send there to contact Vistar Cabs.`,
      );
      setWhatsappFallback(whatsappUrl);

      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      }

      setValues(initial);
      form.reset();
    } catch (err) {
      // Keep the contact option available if MongoDB or the API is unavailable.
      // This fallback does not save the inquiry to the database.
      setWhatsappFallback(whatsappUrl);

      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      }

      setError(
        `${
          err instanceof Error
            ? err.message
            : "The enquiry service could not save this request."
        } WhatsApp is available as a fallback, but this enquiry was not saved to the database.`,
      );
    } finally {
      setSending(false);
    }
  }

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <form
      id="quick-enquiry"
      onSubmit={submit}
      className="enquiry-card rounded-[22px] border border-white/70 bg-white p-3 text-slate-900 shadow-[0_24px_70px_rgba(12,32,60,.24)] sm:p-4"
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black text-slate-900">Plan your ride</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Choose a service and tell us how to reach you
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-1 rounded-xl bg-[#e7f5ff] p-1 sm:flex sm:w-auto"
          role="group"
          aria-label="Service type"
        >
          {services.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={service === item}
              onClick={() => changeService(item)}
              className={`trip-tab flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-extrabold transition sm:text-xs ${
                service === item
                  ? "bg-[#0758c9] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {service === "Outstation" && (
        <div
          className="mb-3 flex w-fit gap-1 rounded-lg bg-slate-100 p-1"
          role="group"
          aria-label="Outstation journey type"
        >
          {(["One Way", "Round Trip"] as const).map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={values.journeyType === item}
              onClick={() => update("journeyType", item)}
              className={`rounded-md px-3 py-2 text-[11px] font-bold ${
                values.journeyType === item
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-6 xl:items-end">
        <LocationField
          label="From"
          className="col-span-2 xl:col-span-1"
          name="from"
          value={values.from}
          onChange={(value) => update("from", value)}
          required
          placeholder="City, area or airport"
        />

        <LocationField
          label="To"
          className="col-span-2 xl:col-span-1"
          name="to"
          value={values.to}
          onChange={(value) => update("to", value)}
          required
          placeholder={
            service === "Airport"
              ? "Airport or drop area"
              : "City, place or airport"
          }
        />

        <label className="text-[11px] font-extrabold text-slate-600">
          Pickup date
          <div className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-700"
              size={16}
            />
            <input
              name="date"
              required
              type="date"
              min={today}
              value={values.date}
              onChange={(event) => update("date", event.target.value)}
              className={`${control} pl-9`}
            />
          </div>
        </label>

        <label className="text-[11px] font-extrabold text-slate-600">
          Pickup time
          <div className="relative">
            <Clock3
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-700"
              size={16}
            />
            <input
              name="time"
              required
              type="time"
              value={values.time}
              onChange={(event) => update("time", event.target.value)}
              className={`${control} pl-9`}
            />
          </div>
        </label>

        <label className="text-[11px] font-extrabold text-slate-600">
          Your name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={control}
            placeholder="Name"
          />
        </label>

        <label className="text-[11px] font-extrabold text-slate-600">
          Phone number
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            minLength={8}
            maxLength={20}
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={control}
            placeholder="Mobile number"
          />
        </label>
      </div>

      <details className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <summary className="cursor-pointer text-[11px] font-bold text-slate-600">
          Optional trip details
        </summary>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service === "Hourly" && (
            <label className="text-[11px] font-extrabold text-slate-600">
              Hourly package
              <select
                value={values.duration}
                onChange={(event) => update("duration", event.target.value)}
                className={control}
              >
                {[
                  "2 hours",
                  "4 hours",
                  "6 hours",
                  "8 hours",
                  "Full day",
                  "To be discussed",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          )}

          {service === "Airport" && (
            <>
              <label className="text-[11px] font-extrabold text-slate-600">
                Airport journey
                <select
                  value={values.airportDirection}
                  onChange={(event) =>
                    update("airportDirection", event.target.value)
                  }
                  className={control}
                >
                  {["Airport pickup", "Airport drop", "Airport round trip"].map(
                    (item) => (
                      <option key={item}>{item}</option>
                    ),
                  )}
                </select>
              </label>

              <label className="text-[11px] font-extrabold text-slate-600">
                Flight number (optional)
                <input
                  maxLength={16}
                  value={values.flightNumber}
                  onChange={(event) =>
                    update("flightNumber", event.target.value)
                  }
                  className={control}
                  placeholder="e.g. AI 123"
                />
              </label>

              <label className="text-[11px] font-extrabold text-slate-600">
                Terminal (optional)
                <input
                  maxLength={24}
                  value={values.terminal}
                  onChange={(event) => update("terminal", event.target.value)}
                  className={control}
                  placeholder="Terminal or gate"
                />
              </label>
            </>
          )}

          {service !== "Airport" && (
            <label className="text-[11px] font-extrabold text-slate-600">
              Passengers (optional)
              <select
                value={values.passengers}
                onChange={(event) => update("passengers", event.target.value)}
                className={control}
              >
                <option value="">Not specified</option>
                {Array.from({ length: 12 }, (_, index) =>
                  String(index + 1),
                ).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </details>

      {service === "Outstation" && values.journeyType === "Round Trip" && (
        <div className="mt-2 grid gap-2.5 rounded-xl bg-blue-50 p-3 sm:grid-cols-2">
          <label className="text-[11px] font-extrabold text-slate-600">
            Return date
            <input
              required
              type="date"
              min={values.date || today}
              value={values.returnDate}
              onChange={(event) => update("returnDate", event.target.value)}
              className={control}
            />
          </label>

          <label className="text-[11px] font-extrabold text-slate-600">
            Return time
            <input
              required
              type="time"
              value={values.returnTime}
              onChange={(event) => update("returnTime", event.target.value)}
              className={control}
            />
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ffad22] px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-[#ffc12f] focus:outline-none focus:ring-2 focus:ring-[#ff9f16] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          "Sending enquiry…"
        ) : (
          <>
            Send Enquiry <Plane size={17} />
          </>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950"
        >
          {error}
          {whatsappFallback && (
            <a
              className="ml-1 inline-block font-black underline"
              href={whatsappFallback}
              target="_blank"
              rel="noreferrer"
            >
              Open WhatsApp with enquiry
            </a>
          )}
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-900"
        >
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          {notice}
          {whatsappFallback && (
            <a
              className="ml-1 shrink-0 font-black underline"
              href={whatsappFallback}
              target="_blank"
              rel="noreferrer"
            >
              Open WhatsApp
            </a>
          )}
        </p>
      )}

      <p className="mt-2 text-center text-[10px] leading-4 text-slate-500">
        Your enquiry is sent securely to Vistar Cabs · No online payment · Team
        will call you back
      </p>
    </form>
  );
}
