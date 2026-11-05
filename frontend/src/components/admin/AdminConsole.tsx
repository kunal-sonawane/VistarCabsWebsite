"use client";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  FileText,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Users,
  CarFront,
  UserRound,
  Globe2,
  History,
  ChartNoAxesCombined,
  ExternalLink,
  RotateCcw,
  Megaphone,
} from "lucide-react";
import {
  getApiUrl,
  cities,
  airports,
  routes,
  destinationGuides,
  site,
} from "@/lib/site";
import { mediaUrl } from "@/lib/cms";

type Section =
  | "overview"
  | "analytics"
  | "inquiries"
  | "pages"
  | "seo"
  | "campaigns"
  | "reviews"
  | "media"
  | "customers"
  | "dutySlips"
  | "drivers"
  | "vehicles"
  | "settings"
  | "audit";
type Row = any;
type CmsSection = {
  heading: string;
  body: string;
  imageId: string;
  imageAlt: string;
};
type CmsFaq = { question: string; answer: string };
type PageDraft = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: CmsSection[];
  faqs: CmsFaq[];
  heroImageId: string;
  heroImageAlt: string;
  canonicalPath: string;
  noindex: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  publishAt: string;
};
type ReviewDraft = {
  customerName: string;
  quote: string;
  rating: number;
  tripLabel: string;
  consentConfirmed: boolean;
  status: "draft" | "published" | "archived";
};
type SettingsDraft = {
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  operatingHours: string;
  coverageSummary: string;
};
type ManagedDraft = {
  path: string;
  label: string;
  mode: "append" | "replace";
  eyebrow: string;
  h1: string;
  intro: string;
  heroImageId: string;
  heroImageAlt: string;
  sections: Array<CmsSection & { linkLabel: string; linkUrl: string }>;
  faqs: CmsFaq[];
  status: "draft" | "scheduled" | "published";
  publishAt: string;
};
type CampaignDraft = {
  title: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  imageId: string;
  imageAlt: string;
  startsOn: string;
  endsOn: string;
  placement: "homepage";
  status: "draft" | "active" | "paused" | "archived";
  priority: string;
};

const emptyPage: PageDraft = {
  slug: "",
  title: "",
  metaTitle: "",
  metaDescription: "",
  h1: "",
  intro: "",
  sections: [],
  faqs: [],
  heroImageId: "",
  heroImageAlt: "",
  canonicalPath: "",
  noindex: true,
  status: "draft",
  publishAt: "",
};
const emptyReview: ReviewDraft = {
  customerName: "",
  quote: "",
  rating: 5,
  tripLabel: "",
  consentConfirmed: false,
  status: "draft",
};
const emptySettings: SettingsDraft = {
  primaryPhone: "",
  secondaryPhone: "",
  whatsappNumber: "",
  email: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",
  operatingHours: "",
  coverageSummary: "",
};
const emptyManaged = (path: string, label: string): ManagedDraft => ({
  path,
  label,
  mode: "append",
  eyebrow: "",
  h1: "",
  intro: "",
  heroImageId: "",
  heroImageAlt: "",
  sections: [],
  faqs: [],
  status: "draft",
  publishAt: "",
});
const emptyCampaign: CampaignDraft = {
  title: "",
  headline: "",
  body: "",
  ctaLabel: "Enquire now",
  ctaUrl: "/#book",
  imageId: "",
  imageAlt: "",
  startsOn: "",
  endsOn: "",
  placement: "homepage",
  status: "draft",
  priority: "0",
};
const items: Record<Section, { label: string; icon: any; owner?: boolean }> = {
  overview: { label: "Overview", icon: LayoutDashboard },
  analytics: { label: "Performance", icon: ChartNoAxesCombined },
  inquiries: { label: "Inquiries", icon: MessageSquareQuote, owner: true },
  pages: { label: "Website Pages", icon: FileText },
  seo: { label: "SEO settings", icon: Globe2 },
  campaigns: { label: "Site campaigns", icon: Megaphone },
  reviews: { label: "Customer feedback", icon: MessageSquareQuote },
  media: { label: "Photo library", icon: ImagePlus },
  customers: { label: "Customers", icon: Users, owner: true },
  dutySlips: { label: "Corporate duty slips", icon: FileText, owner: true },
  vehicles: { label: "Vehicles", icon: CarFront, owner: true },
  drivers: { label: "Drivers", icon: UserRound, owner: true },
  settings: { label: "Site settings", icon: Settings },
  audit: { label: "Change history", icon: History, owner: true },
};
const pageGroups = [
  {
    label: "Core pages",
    items: [
      ["/", "Home page"],
      ["/about-us", "About Vistar Cabs"],
      ["/about-nashik", "Nashik travel guide"],
      ["/kumbh-mela-nashik", "Simhastha Kumbh travel guide"],
    ],
  },
  {
    label: "Service pages",
    items: [
      ["/outstation-cab-service", "Outstation cab service"],
      ["/airport-taxi", "Airport transfers"],
      ["/local-cab-service", "Local cab service"],
      ["/corporate-cab-service", "Corporate cab service"],
    ],
  },
  {
    label: "City pages",
    items: cities.map((city) => [
      `/cities/${city.slug}`,
      `${city.name} city guide`,
    ]),
  },
  {
    label: "Airport pages",
    items: airports.map((airport) => [
      `/airports/${airport.slug}`,
      `${airport.name} · ${airport.code}`,
    ]),
  },
  {
    label: "Route pages",
    items: routes.map((route) => [
      `/${route.slug}`,
      `${route.from} → ${route.to}`,
    ]),
  },
  {
    label: "Destination guides",
    items: [
      ...destinationGuides.map((guide) => [
        `/cities/${guide.citySlug}/${guide.slug}`,
        `${guide.name} · ${guide.cityName}`,
      ]),
    ],
  },
];
const pageCatalog = pageGroups.flatMap((group) =>
  group.items.map(([path, label]) => ({ path, label, group: group.label })),
);
const inputClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "block text-xs font-bold text-slate-700";
function indiaDate(value: string | Date) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
function effectiveStatus(row: Row) {
  return row.status === "scheduled" &&
    row.publishAt &&
    new Date(row.publishAt).getTime() <= Date.now()
    ? "published"
    : row.status;
}
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  maxLength,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
      />
    </label>
  );
}
function TextField({
  label,
  value,
  onChange,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      <textarea
        className={`${inputClass} resize-y`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className={labelClass}>
      {label}
      <select
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
function Button({
  children,
  onClick,
  disabled = false,
  secondary = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition disabled:cursor-wait disabled:opacity-50 ${secondary ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "bg-[#0758c9] text-white hover:bg-[#0649a6]"}`}
    >
      {children}
    </button>
  );
}
function StatusPill({ value }: { value: string }) {
  const style =
    value === "published" ||
    value === "active" ||
    value === "available" ||
    value === "contacted"
      ? "bg-emerald-50 text-emerald-800"
      : value === "draft" || value === "new" || value === "maintenance"
        ? "bg-amber-50 text-amber-800"
        : "bg-slate-100 text-slate-600";
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-black capitalize ${style}`}
    >
      {value}
    </span>
  );
}

export default function AdminConsole() {
  const api = `${getApiUrl()}/api/admin`;
  const [role, setRole] = useState<"owner" | "seo" | "">("");
  const [checking, setChecking] = useState(true);
  const [section, setSection] = useState<Section>("overview");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [rows, setRows] = useState<Row[]>([]);
  const [managedRows, setManagedRows] = useState<Row[]>([]);
  const [mediaAssets, setMediaAssets] = useState<Row[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [analytics, setAnalytics] = useState<Row | null>(null);
  const [analyticsDays, setAnalyticsDays] = useState<"30" | "90">("30");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState<PageDraft>(emptyPage);
  const [editingPage, setEditingPage] = useState("");
  const [seo, setSeo] = useState({
    path: "/",
    title: "",
    description: "",
    canonicalPath: "",
    noindex: false,
    focusPhrase: "",
  });
  const [editingSeo, setEditingSeo] = useState("");
  const [campaign, setCampaign] = useState<CampaignDraft>(emptyCampaign);
  const [editingCampaign, setEditingCampaign] = useState("");
  const [review, setReview] = useState<ReviewDraft>(emptyReview);
  const [editingReview, setEditingReview] = useState("");
  const [settings, setSettings] = useState<SettingsDraft>(emptySettings);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    notes: "",
    tags: "",
    marketingConsent: false,
  });
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    homeCity: "Nashik",
    vehicleId: "",
    status: "available",
    internalNotes: "",
  });
  const [vehicle, setVehicle] = useState({
    label: "",
    make: "",
    model: "",
    category: "Sedan",
    seats: "4",
    luggage: "2",
    registration: "",
    homeCity: "Nashik",
    status: "active",
    imageId: "",
    imageAlt: "",
  });
  const [imageAlt, setImageAlt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const request = useCallback(
    async (
      path: string,
      method = "GET",
      body?: unknown,
      headers: HeadersInit = {},
    ) => {
      const response = await fetch(`${api}${path}`, {
        method,
        credentials: "include",
        headers: {
          ...(body instanceof ArrayBuffer
            ? { "Content-Type": "application/octet-stream" }
            : body
              ? { "Content-Type": "application/json" }
              : {}),
          ...headers,
        },
        ...(body === undefined
          ? {}
          : {
              body: body instanceof ArrayBuffer ? body : JSON.stringify(body),
            }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          result?.message || `Request failed (${response.status}).`,
        );
      return result;
    },
    [api],
  );
  const load = useCallback(
    async (target: Section) => {
      setBusy(true);
      setError("");
      try {
        if (target === "overview") {
          const body = await request("/overview");
          setCounts(body.counts || {});
        } else if (target === "analytics") {
          const body = await request(`/analytics?days=${analyticsDays}`);
          setAnalytics(body);
        } else if (target === "pages") {
          const [cms, managed, images] = await Promise.all([
            request("/pages"),
            request("/page-content"),
            request("/media"),
          ]);
          setRows(cms.items || []);
          setManagedRows(managed.items || []);
          setMediaAssets(images.items || []);
        } else if (
          target === "inquiries" ||
          target === "seo" ||
          target === "campaigns" ||
          target === "reviews" ||
          target === "customers" ||
          target === "dutySlips" ||
          target === "drivers" ||
          target === "vehicles" ||
          target === "audit" ||
          target === "media"
        ) {
          const body = await request(
            target === "dutySlips" ? "/duty-slips" : `/${target}`,
          );
          setRows(body.items || []);
          if (target === "media") setMediaAssets(body.items || []);
          if (target === "vehicles" || target === "campaigns") {
            const images = await request("/media");
            setMediaAssets(images.items || []);
          }
        } else if (target === "settings") {
          const body = await request("/settings");
          const x = body.item || {};
          setSettings({
            primaryPhone: x.primaryPhone || "",
            secondaryPhone: x.secondaryPhone || "",
            whatsappNumber: x.whatsappNumber || "",
            email: x.email || "",
            instagramUrl: x.instagramUrl || "",
            facebookUrl: x.facebookUrl || "",
            youtubeUrl: x.youtubeUrl || "",
            linkedinUrl: x.linkedinUrl || "",
            operatingHours: x.operatingHours || "",
            coverageSummary: x.coverageSummary || "",
          });
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Could not load this admin section.",
        );
      } finally {
        setBusy(false);
      }
    },
    [request, analyticsDays],
  );
  useEffect(() => {
    let alive = true;
    request("/session")
      .then((body) => {
        if (alive) {
          setRole(body.role || "");
        }
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setChecking(false);
      });
    return () => {
      alive = false;
    };
  }, [request]);
  useEffect(() => {
    if (role) void load(section);
  }, [role, section, load]);
  const nav = useMemo(
    () =>
      Object.entries(items).filter(
        ([, item]) => !item.owner || role === "owner",
      ) as [Section, (typeof items)[Section]][],
    [role],
  );
  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const body = await request("/login", "POST", login);
      setRole(body.role);
      setLogin((x) => ({ ...x, password: "" }));
      setNotice(
        `Signed in as ${body.role === "seo" ? "SEO editor" : "owner"}.`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }
  async function signOut() {
    await request("/logout", "POST").catch(() => {});
    setRole("");
    setRows([]);
    setSection("overview");
  }
  async function save(
    path: string,
    method = "POST",
    body?: unknown,
  ): Promise<boolean> {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await request(path, method, body);
      setNotice("Saved successfully.");
      await load(section);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save this change.");
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function remove(path: string, what: string) {
    if (
      !window.confirm(
        `Archive or remove this ${what}? This cannot be undone from the dashboard.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await request(path, "DELETE");
      setNotice(`${what} removed.`);
      await load(section);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove this item.");
    } finally {
      setBusy(false);
    }
  }
  const visible = rows.filter(
    (row) =>
      JSON.stringify(row).toLowerCase().includes(search.trim().toLowerCase()) &&
      (filter === "all" || row.status === filter),
  );

  if (checking)
    return (
      <main className="grid min-h-screen place-items-center bg-[#f2f7fc] text-sm text-slate-600">
        Checking secure session…
      </main>
    );
  if (!role)
    return (
      <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[#071a2f] px-4 py-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(11,104,232,.6),_transparent_60%)]" />
        <Card className="w-full max-w-md p-6 sm:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-800"
          >
            <ArrowLeft size={14} /> Back to website
          </Link>
          <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <ShieldCheck size={23} />
          </div>
          <p className="eyebrow mt-5 text-amber-700">
            Vistar Cabs · secure workspace
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Admin sign-in
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use your owner or SEO editor account. Access is limited by role.
          </p>
          {process.env.NODE_ENV !== "production" && (
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-950">
              Development owner: <code>vistar-admin</code> /{" "}
              <code>VistarDemo!2026</code>
              <br />
              Configure a separate SEO editor in the backend environment file.
            </div>
          )}
          <form onSubmit={submitLogin} className="mt-5 space-y-4">
            <Field
              label="Username"
              value={login.username}
              onChange={(value) =>
                setLogin((old) => ({ ...old, username: value }))
              }
              required
            />
            <label className={labelClass}>
              Password
              <input
                className={inputClass}
                type="password"
                autoComplete="current-password"
                value={login.password}
                onChange={(e) =>
                  setLogin((old) => ({ ...old, password: e.target.value }))
                }
                required
              />
            </label>
            <Button type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in to admin"}
            </Button>
          </form>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-800"
            >
              {error}
            </p>
          )}
        </Card>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f2f7fc] text-slate-900">
      <header className="bg-[#071a2f] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/65 hover:text-white"
            >
              <ArrowLeft size={13} /> Vistar Cabs website
            </Link>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">
              Admin workspace
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide">
              {role === "seo" ? "SEO editor" : "Owner"}
            </span>
            <button
              onClick={() => void load(section)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 hover:bg-white/10"
              aria-label="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => void signOut()}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 px-3 text-xs font-bold hover:bg-white/10"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <nav
          aria-label="Admin sections"
          className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 lg:sticky lg:top-4 lg:h-fit lg:flex-col lg:overflow-visible"
        >
          {nav.map(([key, item]) => {
            const Icon = item.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setSection(key);
                  setSearch("");
                  setError("");
                  setNotice("");
                }}
                aria-current={section === key ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition lg:w-full ${section === key ? "bg-[#0758c9] text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-amber-700">{items[section].label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {section === "overview"
                  ? "Live view of your website workspace and saved records."
                  : section === "pages"
                    ? "Create pages, edit content and publish when ready."
                    : section === "seo"
                      ? "Edit search metadata for current website routes."
                      : "Manage Vistar Cabs website records."}
              </p>
            </div>
            {busy && (
              <span className="text-xs font-bold text-blue-700">Working…</span>
            )}
          </div>
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800"
            >
              {error}
            </p>
          )}
          {notice && (
            <p
              role="status"
              className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
            >
              {notice}
            </p>
          )}
          {section === "overview" && (
            <Overview counts={counts} open={setSection} role={role} />
          )}
          {section === "analytics" && (
            <AnalyticsDashboard
              data={analytics}
              days={analyticsDays}
              setDays={setAnalyticsDays}
            />
          )}
          {section === "inquiries" && (
            <InquiryList
              rows={visible}
              status={filter}
              setStatus={setFilter}
              search={search}
              setSearch={setSearch}
              onStatus={async (id, status) => {
                await save(`/inquiries/${id}`, "PATCH", { status });
              }}
            />
          )}
          {section === "pages" && (
            <PageStudio
              rows={rows}
              managedRows={managedRows}
              page={page}
              setPage={setPage}
              editing={editingPage}
              setEditing={setEditingPage}
              busy={busy}
              save={save}
              remove={remove}
              refresh={() => load("pages")}
              request={request}
              media={mediaAssets}
            />
          )}
          {section === "seo" && (
            <Seo
              rows={rows}
              seo={seo}
              setSeo={setSeo}
              editing={editingSeo}
              setEditing={setEditingSeo}
              busy={busy}
              save={save}
              remove={remove}
            />
          )}
          {section === "campaigns" && (
            <CampaignManager
              rows={rows}
              campaign={campaign}
              setCampaign={setCampaign}
              editing={editingCampaign}
              setEditing={setEditingCampaign}
              busy={busy}
              save={save}
              remove={remove}
              media={mediaAssets}
            />
          )}
          {section === "reviews" && (
            <Reviews
              rows={rows}
              review={review}
              setReview={setReview}
              editing={editingReview}
              setEditing={setEditingReview}
              busy={busy}
              save={save}
              remove={remove}
            />
          )}
          {section === "media" && (
            <MediaLibrary
              rows={rows}
              file={imageFile}
              setFile={setImageFile}
              alt={imageAlt}
              setAlt={setImageAlt}
              busy={busy}
              save={save}
              request={request}
              refresh={() => load("media")}
            />
          )}
          {section === "customers" && (
            <Customers
              rows={visible}
              search={search}
              setSearch={setSearch}
              value={customer}
              setValue={setCustomer}
              busy={busy}
              save={save}
            />
          )}
          {section === "dutySlips" && (
            <DutySlips
              rows={rows}
              save={save}
              refresh={() => load("dutySlips")}
            />
          )}
          {section === "drivers" && (
            <Drivers
              rows={visible}
              search={search}
              setSearch={setSearch}
              value={driver}
              setValue={setDriver}
              busy={busy}
              save={save}
            />
          )}
          {section === "vehicles" && (
            <Vehicles
              rows={visible}
              search={search}
              setSearch={setSearch}
              value={vehicle}
              setValue={setVehicle}
              busy={busy}
              save={save}
              media={mediaAssets}
            />
          )}
          {section === "settings" && (
            <SettingsPanel
              value={settings}
              setValue={setSettings}
              busy={busy}
              save={save}
            />
          )}
          {section === "audit" && <Audit rows={rows} />}
        </section>
      </div>
    </main>
  );
}

function Overview({
  counts,
  open,
  role,
}: {
  counts: Record<string, number>;
  open: (section: Section) => void;
  role: "owner" | "seo" | "";
}) {
  const order = [
    "inquiries",
    "newInquiries",
    "managedPages",
    "activeManagedPages",
    "campaigns",
    "activeCampaigns",
    "pages",
    "publishedPages",
    "reviews",
    "customers",
    "drivers",
    "vehicles",
  ];
  const labels: Record<string, string> = {
    inquiries: "Saved enquiries",
    newInquiries: "Awaiting follow-up",
    managedPages: "Existing pages managed",
    activeManagedPages: "Published page updates",
    campaigns: "Site campaigns",
    activeCampaigns: "Active campaigns",
    pages: "New CMS pages",
    publishedPages: "Published CMS pages",
    reviews: "Approved feedback",
    customers: "Customer records",
    drivers: "Active drivers",
    vehicles: "Active vehicles",
  };
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {order
          .filter(
            (key) =>
              role === "owner" ||
              ![
                "inquiries",
                "newInquiries",
                "customers",
                "drivers",
                "vehicles",
              ].includes(key),
          )
          .map((key) => (
            <Card key={key}>
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                {labels[key]}
              </p>
              <p className="mt-2 text-3xl font-black">{counts[key] ?? "—"}</p>
            </Card>
          ))}
      </div>
      <Card className="mt-5">
        <h2 className="text-lg font-black">Continue working</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review page performance, then update the content or metadata for that
          exact URL.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(items)
            .filter(
              ([key, item]) =>
                key !== "overview" && (!item.owner || role === "owner"),
            )
            .map(([key, item]) => {
              const Icon = item.icon;
              return (
                <button
                  key={key}
                  onClick={() => open(key as Section)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-left hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex items-center gap-2 text-xs font-bold">
                    <Icon size={16} className="text-blue-700" />
                    {item.label}
                  </span>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>
              );
            })}
        </div>
      </Card>
      <Card className="mt-4 border-amber-200 bg-amber-50">
        <h2 className="text-sm font-black text-amber-950">
          Publishing guardrails
        </h2>
        <p className="mt-2 text-xs leading-5 text-amber-900">
          Use the Page studio to edit existing city, airport, route, service and
          destination URLs or create a new page. Drafts stay private. Never
          publish unverified travel claims or customer feedback without
          approval.
        </p>
      </Card>
    </>
  );
}

function AnalyticsDashboard({
  data,
  days,
  setDays,
}: {
  data: Row | null;
  days: "30" | "90";
  setDays: (days: "30" | "90") => void;
}) {
  const daily = data?.daily || [];
  const max = Math.max(1, ...daily.map((x: Row) => x.count));
  const change = data?.change;
  const lists = [
    ["Trip type", data?.services || []],
    ["Enquiry status", data?.statuses || []],
  ] as const;
  return (
    <>
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black">Enquiry performance</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            MongoDB enquiry records only. Page attribution is captured for new
            website enquiries; older records may have no source URL.
          </p>
        </div>
        <div className="flex rounded-xl bg-slate-100 p-1">
          {(["30", "90"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setDays(option)}
              aria-pressed={days === option}
              className={`rounded-lg px-3 py-2 text-xs font-black ${days === option ? "bg-white text-blue-800 shadow-sm" : "text-slate-600"}`}
            >
              Last {option} days
            </button>
          ))}
        </div>
      </Card>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enquiries in period",
            value: data?.currentTotal ?? "—",
            foot:
              data?.previousTotal === 0
                ? "No prior-period baseline"
                : `${change === null ? "—" : `${change > 0 ? "+" : ""}${change}%`} vs previous ${days} days`,
          },
          {
            label: "Previous period",
            value: data?.previousTotal ?? "—",
            foot: `Prior ${days}-day window`,
          },
          {
            label: "Unique customers",
            value: data?.uniqueCustomers ?? "—",
            foot: "Grouped by callback number",
          },
          {
            label: "Repeat customers",
            value: data?.repeatCustomers ?? "—",
            foot: "2 or more enquiries in this period",
          },
        ].map((card) => (
          <Card key={card.label}>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-black">{card.value}</p>
            <p className="mt-1 text-[11px] text-slate-500">{card.foot}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="font-black">Daily enquiry volume</h3>
            <p className="mt-1 text-xs text-slate-500">
              Each bar represents one date in the selected reporting window.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-800">
            {data?.currentTotal ?? 0} recorded
          </span>
        </div>
        {daily.length ? (
          <div className="mt-5 flex h-44 items-end gap-1 overflow-x-auto border-b border-slate-200 pb-1">
            {daily.map((point: Row, index: number) => (
              <div
                key={`daily-${point._id || index}`}
                title={`${point._id}: ${point.count} enquiries`}
                className="group flex h-full min-w-2 flex-1 flex-col items-center justify-end"
              >
                <span className="mb-1 text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100">
                  {point.count}
                </span>
                <div
                  className="w-full max-w-5 rounded-t-md bg-gradient-to-t from-blue-700 to-sky-400"
                  style={{
                    height: `${Math.max(5, (point.count / max) * 100)}%`,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            No enquiry activity recorded in this period yet.
          </p>
        )}
        <div className="mt-2 flex justify-between text-[10px] text-slate-400">
          <span>
            {daily[0]
              ? new Date(`${daily[0]._id}T00:00:00`).toLocaleDateString("en-IN")
              : ""}
          </span>
          <span>
            {daily.at(-1)
              ? new Date(`${daily.at(-1)._id}T00:00:00`).toLocaleDateString(
                  "en-IN",
                )
              : ""}
          </span>
        </div>
      </Card>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {lists.map(([title, items]) => (
          <Card key={title}>
            <h3 className="font-black">{title}</h3>
            <div className="mt-3 space-y-2">
              {items.length ? (
                items.map((item: Row, index: number) => (
                  <div
                    key={`${title}-${item._id || item.status || index}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                  >
                    <span className="text-xs font-semibold">{item._id}</span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-blue-800">
                      {item.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">
                  No records for this period.
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-black">Enquiries by landing page</h3>
            <p className="mt-1 text-xs text-slate-500">
              Lead counts help the SEO editor compare which pages are generating
              contact requests; this is not traffic or ranking data.
            </p>
          </div>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-800"
          >
            Open sitemap <ExternalLink size={13} />
          </Link>
        </div>
        <div className="mt-3 space-y-2">
          {data?.topPages?.length ? (
            data.topPages.map((item: Row, index: number) => (
              <div
                key={`landing-${item._id || index}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div>
                  <p className="text-sm font-bold">
                    {item._id || "Older / unattributed records"}
                  </p>
                  {item._id && (
                    <Link
                      href={item._id}
                      target="_blank"
                      className="mt-1 inline-flex items-center gap-1 text-[10px] text-blue-800"
                    >
                      Open page <ExternalLink size={11} />
                    </Link>
                  )}
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-800">
                  {item.count} enquiries
                </span>
              </div>
            ))
          ) : (
            <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No page attribution yet. New enquiries will record the URL where
              the form was submitted.
            </p>
          )}
        </div>
      </Card>
    </>
  );
}

function ExistingPageEditor({
  rows,
  path,
  setPath,
  busy,
  save,
  remove,
  refresh,
  request,
  media,
}: {
  rows: Row[];
  path: string;
  setPath: (path: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  remove: (path: string, what: string) => Promise<void>;
  refresh: () => void;
  request: (path: string, method?: string, body?: unknown) => Promise<any>;
  media: Row[];
}) {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<ManagedDraft>(
    emptyManaged("/cities/nashik", "Nashik city guide"),
  );
  const record = rows.find((row) => row.path === path);
  useEffect(() => {
    const selected = pageCatalog.find((item) => item.path === path);
    setDraft(
      record
        ? {
            path: record.path,
            label: record.label,
            mode: record.mode,
            eyebrow: record.eyebrow || "",
            h1: record.h1 || "",
            intro: record.intro || "",
            heroImageId: record.heroImageId || "",
            heroImageAlt: record.heroImageAlt || "",
            sections: record.sections || [],
            faqs: record.faqs || [],
            status: record.status,
            publishAt: record.publishAt ? indiaDate(record.publishAt) : "",
          }
        : { ...emptyManaged(path, selected?.label || path) },
    );
  }, [path, rows, record]);
  const set = (key: keyof ManagedDraft, value: any) =>
    setDraft((old) => ({ ...old, [key]: value }));
  return (
    <>
      <Card className="mt-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className={labelClass}>
            Find an existing website page
            <input
              className={inputClass}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Nashik, airport, route, Kumbh…"
            />
          </label>
          <label className={`${labelClass} sm:min-w-[280px]`}>
            Selected URL
            <select
              className={inputClass}
              value={path}
              onChange={(e) => setPath(e.target.value)}
            >
              {pageGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.items
                    .filter(
                      ([url, label]) =>
                        !query ||
                        `${url} ${label} ${group.label}`
                          .toLowerCase()
                          .includes(query.toLowerCase()),
                    )
                    .map(([url, label]) => (
                      <option key={url} value={url}>
                        {label} · {url}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <a
            href={path}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-blue-800"
          >
            Open live page <ExternalLink size={14} />
          </a>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold text-slate-600">Revision:</span>
          <StatusPill value={record?.status || "original template"} />
          <span className="text-[10px] text-slate-400">
            {record?.updatedAt
              ? `Last edited ${new Date(record.updatedAt).toLocaleString("en-IN")}`
              : "No editor changes saved for this URL"}
          </span>
        </div>
      </Card>
      <Card className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save("/page-content", "PUT", draft);
          }}
          className="space-y-5"
        >
          <details className="rounded-xl border border-blue-100 bg-white p-3">
            <summary className="cursor-pointer text-xs font-black text-blue-800">
              Preview these changes before saving
            </summary>
            <PagePreview
              h1={draft.mode === "replace" ? draft.h1 : draft.label}
              intro={
                draft.intro ||
                "Added supporting sections; the original template remains on this page."
              }
              sections={draft.sections}
              faqs={draft.faqs}
            />
          </details>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black">Edit {draft.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{path}</p>
            </div>
            <label className="text-xs font-bold text-slate-600">
              Page treatment
              <select
                className={`${inputClass} min-w-[200px]`}
                value={draft.mode}
                onChange={(e) => set("mode", e.target.value)}
              >
                <option value="append">Add sections to current page</option>
                <option value="replace">Replace main page body</option>
              </select>
            </label>
          </div>
          {draft.mode === "replace" && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950">
              Publishing in Replace mode hides the page template below the
              navigation and shows your new content. Delete this revision or
              save it as a draft to restore the original template.
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Content label"
              value={draft.label}
              onChange={(v) => set("label", v)}
              required
              maxLength={120}
            />
            <SelectField
              label="Revision status"
              value={draft.status}
              onChange={(v) => set("status", v)}
              options={["draft", "scheduled", "published"]}
            />
            <Field
              label="Publish on (India date)"
              type="date"
              value={draft.publishAt}
              onChange={(v) => set("publishAt", v)}
              required={draft.status === "scheduled"}
            />
            {draft.mode === "replace" && (
              <>
                <Field
                  label="Eyebrow (optional)"
                  value={draft.eyebrow}
                  onChange={(v) => set("eyebrow", v)}
                />
                <Field
                  label="Main heading (H1)"
                  value={draft.h1}
                  onChange={(v) => set("h1", v)}
                  required
                  maxLength={140}
                />
                <div className="sm:col-span-2">
                  <TextField
                    label="Introduction"
                    value={draft.intro}
                    onChange={(v) => set("intro", v)}
                    rows={3}
                    required
                  />
                </div>
                <Field
                  label="Hero image ID (Photo library)"
                  value={draft.heroImageId}
                  onChange={(v) => set("heroImageId", v)}
                />
                <Field
                  label="Hero image alt text"
                  value={draft.heroImageAlt}
                  onChange={(v) => set("heroImageAlt", v)}
                />
              </>
            )}
          </div>
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-black">Page sections</h4>
                <p className="mt-1 text-[10px] text-slate-500">
                  Add, edit or remove old text. Image IDs come from the Photo
                  library.
                </p>
              </div>
              <Button
                secondary
                onClick={() =>
                  set("sections", [
                    ...draft.sections,
                    {
                      heading: "",
                      body: "",
                      imageId: "",
                      imageAlt: "",
                      linkLabel: "",
                      linkUrl: "",
                    },
                  ])
                }
              >
                Add section
              </Button>
            </div>
            <div className="space-y-3">
              {draft.sections.map((item, index) => (
                <div
                  key={`${index}-${item.heading}`}
                  className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-2"
                >
                  <Field
                    label={`Section ${index + 1} heading`}
                    value={item.heading}
                    onChange={(v) =>
                      set(
                        "sections",
                        draft.sections.map((x, i) =>
                          i === index ? { ...x, heading: v } : x,
                        ),
                      )
                    }
                    required
                  />
                  <Field
                    label="Image ID"
                    value={item.imageId || ""}
                    onChange={(v) =>
                      set(
                        "sections",
                        draft.sections.map((x, i) =>
                          i === index ? { ...x, imageId: v } : x,
                        ),
                      )
                    }
                    placeholder="Optional"
                  />
                  <div className="sm:col-span-2">
                    <TextField
                      label="Section text"
                      value={item.body}
                      onChange={(v) =>
                        set(
                          "sections",
                          draft.sections.map((x, i) =>
                            i === index ? { ...x, body: v } : x,
                          ),
                        )
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <Field
                    label="Image alt text"
                    value={item.imageAlt || ""}
                    onChange={(v) =>
                      set(
                        "sections",
                        draft.sections.map((x, i) =>
                          i === index ? { ...x, imageAlt: v } : x,
                        ),
                      )
                    }
                  />
                  <label className={labelClass}>
                    Image from media library
                    <select
                      className={inputClass}
                      value={item.imageId || ""}
                      onChange={(e) =>
                        set(
                          "sections",
                          draft.sections.map((x, i) =>
                            i === index ? { ...x, imageId: e.target.value } : x,
                          ),
                        )
                      }
                    >
                      <option value="">No image</option>
                      {media.map((asset) => (
                        <option
                          key={asset.id || asset._id}
                          value={asset.id || asset._id}
                        >
                          {asset.filename}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Field
                    label="Link label"
                    value={item.linkLabel || ""}
                    onChange={(v) =>
                      set(
                        "sections",
                        draft.sections.map((x, i) =>
                          i === index ? { ...x, linkLabel: v } : x,
                        ),
                      )
                    }
                  />
                  <Field
                    label="Link URL (website path or https)"
                    value={item.linkUrl || ""}
                    onChange={(v) =>
                      set(
                        "sections",
                        draft.sections.map((x, i) =>
                          i === index ? { ...x, linkUrl: v } : x,
                        ),
                      )
                    }
                    placeholder="/cities/nashik/trimbakeshwar"
                  />
                  <div className="sm:col-span-2">
                    <Button
                      secondary
                      onClick={() =>
                        set(
                          "sections",
                          draft.sections.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Remove this section
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h4 className="font-black">Frequently asked questions</h4>
                <p className="mt-1 text-[10px] text-slate-500">
                  Questions are stored with this page and displayed after its
                  sections.
                </p>
              </div>
              <Button
                secondary
                onClick={() =>
                  set("faqs", [...draft.faqs, { question: "", answer: "" }])
                }
              >
                Add FAQ
              </Button>
            </div>
            <div className="space-y-3">
              {draft.faqs.map((item, index) => (
                <div
                  key={`${index}-${item.question}`}
                  className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-2"
                >
                  <Field
                    label={`Question ${index + 1}`}
                    value={item.question}
                    onChange={(v) =>
                      set(
                        "faqs",
                        draft.faqs.map((x, i) =>
                          i === index ? { ...x, question: v } : x,
                        ),
                      )
                    }
                    required
                  />
                  <TextField
                    label="Answer"
                    value={item.answer}
                    onChange={(v) =>
                      set(
                        "faqs",
                        draft.faqs.map((x, i) =>
                          i === index ? { ...x, answer: v } : x,
                        ),
                      )
                    }
                    rows={3}
                    required
                  />
                  <Button
                    secondary
                    onClick={() =>
                      set(
                        "faqs",
                        draft.faqs.filter((_, i) => i !== index),
                      )
                    }
                  >
                    Remove FAQ
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={busy}>
              <Check size={15} />
              {draft.status === "published"
                ? "Publish changes"
                : draft.status === "scheduled"
                  ? "Schedule changes"
                  : "Save draft"}
            </Button>
            {record && (
              <Button
                secondary
                onClick={() =>
                  void remove(
                    `/page-content/${record._id}`,
                    `page revision for ${record.path}; the original page will be restored`,
                  )
                }
              >
                <RotateCcw size={14} /> Restore original page
              </Button>
            )}
          </div>
        </form>
      </Card>
      <PageRevisionHistory
        kind="existing-page"
        reference={path}
        request={request}
        refresh={refresh}
      />
      <Card className="mt-3">
        <h3 className="font-black">Existing page revisions</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {rows.map((row) => (
            <button
              key={row._id || row.path}
              onClick={() => setPath(row.path)}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left ${path === row.path ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:bg-slate-50"}`}
            >
              <span>
                <span className="block text-xs font-bold">{row.label}</span>
                <span className="mt-1 block text-[10px] text-slate-500">
                  {row.path}
                </span>
              </span>
              <StatusPill value={row.status} />
            </button>
          ))}
          {!rows.length && (
            <p className="text-xs text-slate-500">
              Existing pages are unchanged until an editor saves a revision.
            </p>
          )}
        </div>
      </Card>
    </>
  );
}

function PagePreview({
  h1,
  intro,
  sections,
  faqs,
  note = "",
}: {
  h1: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  note?: string;
}) {
  return (
    <Card className="mt-3 border-blue-100 bg-blue-50/40">
      <p className="eyebrow text-blue-800">Draft preview</p>
      {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
      <h2 className="mt-3 text-2xl font-black">
        {h1 || "Page heading preview"}
      </h2>
      {intro && (
        <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-6 text-slate-600">
          {intro}
        </p>
      )}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {sections.map((section, index) => (
          <article
            key={`${section.heading || "section"}-${index}`}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <h3 className="font-black">
              {section.heading || "Section heading"}
            </h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
              {section.body || "Section copy preview"}
            </p>
          </article>
        ))}
      </div>
      {faqs.length > 0 && (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <h3 className="font-black">FAQs</h3>
          {faqs.map((item, index) => (
            <div
              key={`${item.question || "question"}-${index}`}
              className="mt-3"
            >
              <p className="text-sm font-bold">
                {item.question || "Question preview"}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {item.answer || "Answer preview"}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function PageRevisionHistory({
  kind,
  reference,
  request,
  refresh,
}: {
  kind: "existing-page" | "cms-page";
  reference: string;
  request: (path: string, method?: string, body?: unknown) => Promise<any>;
  refresh: () => void;
}) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    if (!reference) return;
    setLoading(true);
    setError("");
    request(
      `/page-revisions?kind=${kind}&reference=${encodeURIComponent(reference)}`,
    )
      .then((result) => {
        if (active) setItems(result.items || []);
      })
      .catch((e) => {
        if (active)
          setError(
            e instanceof Error ? e.message : "Could not load revision history.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [kind, reference, request, reload]);
  return (
    <Card className="mt-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black">Revision history</h3>
          <p className="mt-1 text-[10px] text-slate-500">
            Restoring a snapshot first keeps the current version in history.
          </p>
        </div>
        <Button secondary onClick={() => setReload((x) => x + 1)}>
          Refresh history
        </Button>
      </div>
      {loading && (
        <p className="mt-3 text-xs text-slate-500">Loading revisions…</p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-xs text-rose-700">
          {error}
        </p>
      )}
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
          >
            <div>
              <p className="text-xs font-bold">
                {item.actor || "Admin"} · {item.role || "editor"}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString("en-IN")
                  : "Saved revision"}
              </p>
            </div>
            <Button
              secondary
              disabled={loading}
              onClick={async () => {
                if (
                  !window.confirm(
                    "Restore this saved version? The current version will be kept in history.",
                  )
                )
                  return;
                setLoading(true);
                setError("");
                try {
                  await request(
                    `/page-revisions/${item._id}/restore`,
                    "POST",
                    {},
                  );
                  setReload((x) => x + 1);
                  refresh();
                } catch (e) {
                  setError(
                    e instanceof Error
                      ? e.message
                      : "Could not restore this version.",
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              <RotateCcw size={13} /> Restore this version
            </Button>
          </div>
        ))}
        {!loading && !error && !items.length && (
          <p className="text-xs text-slate-500">
            No saved versions yet. Updates will appear here automatically.
          </p>
        )}
      </div>
    </Card>
  );
}

function PageStudio({
  rows,
  managedRows,
  page,
  setPage,
  editing,
  setEditing,
  busy,
  save,
  remove,
  refresh,
  request,
  media,
}: {
  rows: Row[];
  managedRows: Row[];
  page: PageDraft;
  setPage: (p: PageDraft) => void;
  editing: string;
  setEditing: (id: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  remove: (path: string, what: string) => Promise<void>;
  refresh: () => void;
  request: (path: string, method?: string, body?: unknown) => Promise<any>;
  media: Row[];
}) {
  const [tab, setTab] = useState<"directory" | "existing" | "new">("directory");
  const [selectedPath, setSelectedPath] = useState("/cities/nashik");
  function editCms(row: Row) {
    setPage({
      slug: row.slug,
      title: row.title,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      h1: row.h1,
      intro: row.intro,
      sections: row.sections || [],
      faqs: row.faqs || [],
      heroImageId: row.heroImageId || "",
      heroImageAlt: row.heroImageAlt || "",
      canonicalPath: row.canonicalPath || "",
      noindex: row.noindex ?? true,
      status: row.status,
      publishAt: row.publishAt ? indiaDate(row.publishAt) : "",
    });
    setEditing(row._id);
    setTab("new");
  }
  return (
    <>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">Website Pages</h2>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-600">
              Browse every built-in website URL and every page created in the
              CMS. Search by city, airport, route or page name, then open the
              page you want to update. URLs are fixed in this editor.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button secondary onClick={() => setTab("directory")}>
              All pages
            </Button>
            <Button
              secondary
              onClick={() => {
                setPage(emptyPage);
                setEditing("");
                setTab("new");
              }}
            >
              <FileText size={14} /> Create a page
            </Button>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <span className="text-[10px] font-bold uppercase text-blue-700">
              Pages in site inventory
            </span>
            <b className="mt-1 block text-2xl">
              {pageCatalog.length + rows.length}
            </b>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-500">
              Built-in pages
            </span>
            <b className="mt-1 block text-2xl">{pageCatalog.length}</b>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-500">
              CMS pages
            </span>
            <b className="mt-1 block text-2xl">{rows.length}</b>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setTab("directory")}
            className={`rounded-xl px-3 py-2 text-xs font-black ${tab === "directory" ? "bg-[#0758c9] text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Browse pages
          </button>
          <button
            onClick={() => setTab("existing")}
            className={`rounded-xl px-3 py-2 text-xs font-black ${tab === "existing" ? "bg-[#0758c9] text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Edit built-in page
          </button>
          <button
            onClick={() => setTab("new")}
            className={`rounded-xl px-3 py-2 text-xs font-black ${tab === "new" ? "bg-[#0758c9] text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Create / manage CMS pages
          </button>
        </div>
      </Card>
      {tab === "directory" && (
        <>
          <div className="mt-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <details>
              <summary className="cursor-pointer text-sm font-black text-blue-900">
                Quick guide: find, edit, preview and publish pages
              </summary>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-xs leading-5 text-slate-700">
                <li>
                  Search the directory by page name, city, airport or route.
                  Existing URLs stay unchanged.
                </li>
                <li>
                  Choose Edit content to update a built-in page, or Create a
                  page to add a new CMS page.
                </li>
                <li>
                  Review the draft content preview, then save a draft, schedule
                  publication or publish now.
                </li>
                <li>
                  Use Revision history to restore an earlier saved version.
                  Archiving a CMS page hides it from the site; archiving a
                  built-in edit returns that URL to its original template.
                </li>
                <li>
                  SEO editors can manage page copy, sections, FAQs, metadata,
                  images, CMS pages and banners. Layout code, URL routing,
                  integrations and ad spend need an owner/developer or their
                  separate platform.
                </li>
              </ol>
              <p className="mt-3 text-[10px] leading-5 text-slate-600">
                The count is the project’s configured routes and CMS pages, not
                Google’s index count. Preview reviews editable content only;
                inspect the actual live page at desktop and mobile widths before
                important publication.
              </p>
            </details>
            <a
              className="mt-2 inline-block text-xs font-bold text-blue-800 underline"
              href="/admin-guide.md"
              download
            >
              Download the detailed admin guide
            </a>
          </div>
          <PageDirectory
            rows={rows}
            managedRows={managedRows}
            onEditPath={(path) => {
              setSelectedPath(path);
              setTab("existing");
            }}
            onEditCms={editCms}
          />
        </>
      )}
      {tab === "existing" && (
        <ExistingPageEditor
          rows={managedRows}
          path={selectedPath}
          setPath={setSelectedPath}
          busy={busy}
          save={save}
          remove={remove}
          refresh={refresh}
          request={request}
          media={media}
        />
      )}
      {tab === "new" && (
        <Pages
          rows={rows}
          page={page}
          setPage={setPage}
          editing={editing}
          setEditing={setEditing}
          busy={busy}
          save={save}
          refresh={refresh}
          request={request}
        />
      )}
    </>
  );
}

function PageDirectory({
  rows,
  managedRows,
  onEditPath,
  onEditCms,
}: {
  rows: Row[];
  managedRows: Row[];
  onEditPath: (path: string) => void;
  onEditCms: (row: Row) => void;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All types");
  const [status, setStatus] = useState("all");
  type InventoryItem = {
    id: string;
    path: string;
    label: string;
    group: string;
    type: string;
    status: string;
    updatedAt: string;
    cmsRow?: Row;
  };
  const builtins: InventoryItem[] = pageCatalog.map((item) => {
    const revision = managedRows.find((row) => row.path === item.path);
    const revisionStatus = revision ? effectiveStatus(revision) : "";
    const status =
      revisionStatus === "archived"
        ? "archived"
        : revisionStatus === "scheduled"
          ? "scheduled"
          : revisionStatus === "draft"
            ? "draft"
            : revisionStatus === "published"
              ? "edited"
              : "published";
    return {
      ...item,
      id: item.path,
      type: item.group,
      status,
      updatedAt: revision?.updatedAt || "",
    };
  });
  const cms: InventoryItem[] = rows.map((row) => ({
    id: String(row._id || row.slug),
    path: `/pages/${row.slug}`,
    label: row.title,
    group: "CMS pages",
    type: "CMS pages",
    status: effectiveStatus(row),
    updatedAt: row.updatedAt || "",
    cmsRow: row,
  }));
  const all = [...builtins, ...cms];
  const statuses = [
    "all",
    "published",
    "edited",
    "scheduled",
    "draft",
    "archived",
  ];
  const filtered = all.filter(
    (item) =>
      (group === "All types" || item.group === group) &&
      (status === "all" || item.status === status) &&
      `${item.label} ${item.path} ${item.group}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <Card className="mt-3">
      <div className="flex flex-col gap-3 md:flex-row">
        <Field
          label="Find a page by name, route, city or airport"
          value={query}
          onChange={setQuery}
          placeholder="Nashik, Mumbai, Nashik to Pune…"
        />
        <SelectField
          label="Page type"
          value={group}
          onChange={setGroup}
          options={[
            "All types",
            ...pageGroups.map((item) => item.label),
            "CMS pages",
          ]}
        />
        <SelectField
          label="Status"
          value={status}
          onChange={setStatus}
          options={statuses}
        />
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="px-3 py-3">Page</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">URL</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr
                key={`${item.id}-${index}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-3 py-3 text-sm font-bold">{item.label}</td>
                <td className="px-3 py-3 text-xs text-slate-600">
                  {item.type}
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">
                  {item.path}
                </td>
                <td className="px-3 py-3">
                  <StatusPill value={item.status} />
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    {item.cmsRow ? (
                      <Button secondary onClick={() => onEditCms(item.cmsRow)}>
                        Edit page
                      </Button>
                    ) : (
                      <Button secondary onClick={() => onEditPath(item.path)}>
                        Edit content
                      </Button>
                    )}
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-xs font-bold text-blue-800"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <Empty message="No pages match these filters." />}
      </div>
      <p className="mt-3 text-[10px] leading-5 text-slate-500">
        Built-in page status means its template is live. “Edited” means a
        published content addition or replacement is active. This directory
        reports site routes, not Google index status.
      </p>
    </Card>
  );
}

function InquiryList({
  rows,
  status,
  setStatus,
  search,
  setSearch,
  onStatus,
}: {
  rows: Row[];
  status: string;
  setStatus: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  onStatus: (id: string, status: string) => Promise<void>;
}) {
  return (
    <>
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className={`${inputClass} pl-9`}
              placeholder="Search name, phone or route"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select
            className={`${inputClass} sm:w-44`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {["all", "new", "contacted", "closed"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </Card>
      <div className="mt-3 space-y-3">
        {rows.length ? (
          rows.map((row) => (
            <Card key={row._id || row.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-black">
                    {row.name || "Customer"} · {row.phone}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {row.serviceType} ·{" "}
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleString("en-IN")
                      : ""}
                  </p>
                </div>
                <select
                  aria-label="Enquiry status"
                  className="min-h-10 rounded-xl border border-slate-200 px-3 text-xs font-bold"
                  value={row.status}
                  onChange={(e) =>
                    void onStatus(row.id || row._id, e.target.value)
                  }
                >
                  {["new", "contacted", "closed"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="text-xs text-slate-500">From</span>
                  <br />
                  <b>{row.from}</b>
                </p>
                <p>
                  <span className="text-xs text-slate-500">To</span>
                  <br />
                  <b>{row.to || "Local trip"}</b>
                </p>
                <p>
                  <span className="text-xs text-slate-500">Pickup</span>
                  <br />
                  <b>
                    {row.pickupDate} · {row.pickupTime}
                  </b>
                </p>
                <p>
                  <span className="text-xs text-slate-500">Callback</span>
                  <br />
                  <a
                    className="font-bold text-blue-800"
                    href={`tel:${row.phone}`}
                  >
                    {row.phone}
                  </a>
                </p>
              </div>
              <p className="mt-3 text-xs text-slate-600">
                {[
                  row.journeyType,
                  row.returnDate &&
                    `Return ${row.returnDate} ${row.returnTime || ""}`,
                  row.duration,
                  row.airportDirection,
                  row.flightNumber && `Flight ${row.flightNumber}`,
                  row.notes,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </Card>
          ))
        ) : (
          <Empty message="No enquiry records match this filter." />
        )}
      </div>
    </>
  );
}

function CampaignManager({
  rows,
  campaign,
  setCampaign,
  editing,
  setEditing,
  busy,
  save,
  remove,
  media,
}: {
  rows: Row[];
  campaign: CampaignDraft;
  setCampaign: (value: CampaignDraft) => void;
  editing: string;
  setEditing: (id: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  remove: (path: string, what: string) => Promise<void>;
  media: Row[];
}) {
  const set = (key: keyof CampaignDraft, value: string) =>
    setCampaign({ ...campaign, [key]: value });
  function edit(row: Row) {
    setCampaign({
      title: row.title,
      headline: row.headline,
      body: row.body,
      ctaLabel: row.ctaLabel,
      ctaUrl: row.ctaUrl,
      imageId: row.imageId || "",
      imageAlt: row.imageAlt || "",
      startsOn: row.startsOn || "",
      endsOn: row.endsOn || "",
      placement: "homepage",
      status: row.status,
      priority: String(row.priority || 0),
    });
    setEditing(row._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <Card className="border-blue-100 bg-gradient-to-r from-white to-blue-50">
        <h2 className="text-lg font-black">Homepage campaign banners</h2>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-600">
          Create an on-site banner, choose a call-to-action and schedule its
          visibility. Use verified wording and owner-approved offers only. This
          does not launch or manage paid Google/Meta ad spend; those platforms
          need separate accounts and API access.
        </p>
      </Card>
      <Card className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save(
              editing ? `/campaigns/${editing}` : "/campaigns",
              editing ? "PUT" : "POST",
              { ...campaign, priority: Number(campaign.priority) },
            ).then((ok) => {
              if (ok) {
                setCampaign(emptyCampaign);
                setEditing("");
              }
            });
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="flex items-center justify-between gap-3 sm:col-span-2">
            <div>
              <h3 className="font-black">
                {editing ? "Edit campaign" : "New campaign"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Saved in MongoDB and displayed on the homepage only while active
                and within its schedule.
              </p>
            </div>
            {editing && (
              <Button
                secondary
                onClick={() => {
                  setCampaign(emptyCampaign);
                  setEditing("");
                }}
              >
                Cancel edit
              </Button>
            )}
          </div>
          <Field
            label="Internal campaign name"
            value={campaign.title}
            onChange={(v) => set("title", v)}
            required
            maxLength={100}
          />
          <Field
            label="Priority (0–100)"
            type="number"
            value={campaign.priority}
            onChange={(v) => set("priority", v)}
            maxLength={3}
          />
          <Field
            label="Banner heading"
            value={campaign.headline}
            onChange={(v) => set("headline", v)}
            required
            maxLength={140}
          />
          <SelectField
            label="Status"
            value={campaign.status}
            onChange={(v) => set("status", v as CampaignDraft["status"])}
            options={["draft", "active", "paused", "archived"]}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Banner text"
              value={campaign.body}
              onChange={(v) => set("body", v)}
              rows={3}
              required
            />
          </div>
          <Field
            label="Button label"
            value={campaign.ctaLabel}
            onChange={(v) => set("ctaLabel", v)}
            required
            maxLength={50}
          />
          <Field
            label="Button URL (site path or https)"
            value={campaign.ctaUrl}
            onChange={(v) => set("ctaUrl", v)}
            placeholder="/#book"
            required
            maxLength={300}
          />
          <Field
            label="Start date (optional)"
            type="date"
            value={campaign.startsOn}
            onChange={(v) => set("startsOn", v)}
          />
          <Field
            label="End date (optional)"
            type="date"
            value={campaign.endsOn}
            onChange={(v) => set("endsOn", v)}
          />
          <label className={labelClass}>
            Banner image (Photo library)
            <select
              className={inputClass}
              value={campaign.imageId}
              onChange={(e) => set("imageId", e.target.value)}
            >
              <option value="">No image</option>
              {media.map((asset) => (
                <option
                  key={asset.id || asset._id}
                  value={asset.id || asset._id}
                >
                  {asset.filename}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Image alt text"
            value={campaign.imageAlt}
            onChange={(v) => set("imageAlt", v)}
            maxLength={180}
          />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={busy}>
              <Check size={15} />
              {busy ? "Saving…" : editing ? "Save campaign" : "Create campaign"}
            </Button>
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <h3 className="font-black">Saved campaigns</h3>
        <div className="mt-3 space-y-2">
          {rows.map((row, index) => (
            <div
              key={`${row._id || row.id || row.title || "campaign"}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div className="min-w-0">
                <p className="font-bold">{row.headline}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {row.title} · {row.startsOn || "no start"} to{" "}
                  {row.endsOn || "no end"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill value={row.status} />
                <Button secondary onClick={() => edit(row)}>
                  Edit
                </Button>
                {row.status !== "archived" && (
                  <Button
                    secondary
                    onClick={() =>
                      void remove(`/campaigns/${row._id}`, "campaign")
                    }
                  >
                    Archive
                  </Button>
                )}
              </div>
            </div>
          ))}
          {!rows.length && (
            <Empty message="No homepage campaigns yet. Create a draft to prepare one." />
          )}
        </div>
      </Card>
    </>
  );
}
function Pages({
  rows,
  page,
  setPage,
  editing,
  setEditing,
  busy,
  save,
  refresh,
  request,
}: {
  rows: Row[];
  page: PageDraft;
  setPage: (p: PageDraft) => void;
  editing: string;
  setEditing: (id: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  refresh: () => void;
  request: (path: string, method?: string, body?: unknown) => Promise<any>;
}) {
  const [search, setSearch] = useState("");
  const filtered = rows.filter((x) =>
    `${x.title} ${x.slug} ${x.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const up = (key: keyof PageDraft, value: any) =>
    setPage({ ...page, [key]: value });
  function edit(row: Row) {
    setPage({
      slug: row.slug,
      title: row.title,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      h1: row.h1,
      intro: row.intro,
      sections: row.sections || [],
      faqs: row.faqs || [],
      heroImageId: row.heroImageId || "",
      heroImageAlt: row.heroImageAlt || "",
      canonicalPath: row.canonicalPath || "",
      noindex: row.noindex ?? true,
      status: row.status,
      publishAt: row.publishAt ? indiaDate(row.publishAt) : "",
    });
    setEditing(row._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">Website pages</h2>
            <p className="mt-1 text-xs text-slate-500">
              Create original, structured travel pages. Drafts are private until
              published.
            </p>
          </div>
          <Button
            onClick={() => {
              setPage(emptyPage);
              setEditing("");
            }}
          >
            <FileText size={15} /> New page
          </Button>
        </div>
      </Card>
      <Card className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save(
              editing ? `/pages/${editing}` : "/pages",
              editing ? "PUT" : "POST",
              page,
            ).then((ok) => {
              if (ok) {
                setPage(emptyPage);
                setEditing("");
                refresh();
              }
            });
          }}
          className="space-y-4"
        >
          <details className="rounded-xl border border-blue-100 bg-white p-3">
            <summary className="cursor-pointer text-xs font-black text-blue-800">
              Preview these changes before saving
            </summary>
            <PagePreview
              h1={page.h1}
              intro={page.intro}
              sections={page.sections}
              faqs={page.faqs}
            />
          </details>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black">
              {editing ? "Edit page" : "Page editor"}
            </h3>
            {editing && (
              <Button
                secondary
                onClick={() => {
                  setPage(emptyPage);
                  setEditing("");
                }}
              >
                Cancel edit
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label={editing ? "URL slug (fixed after creation)" : "URL slug"}
              value={page.slug}
              onChange={(v) =>
                up("slug", v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
              }
              placeholder="nashik-vineyard-guide"
              required
              disabled={Boolean(editing)}
            />
            <SelectField
              label="Publication"
              value={page.status}
              onChange={(v) => up("status", v)}
              options={["draft", "scheduled", "published", "archived"]}
            />
            <Field
              label="Publish on (India date)"
              type="date"
              value={page.publishAt}
              onChange={(v) => up("publishAt", v)}
              required={page.status === "scheduled"}
            />
            <Field
              label="Page title"
              value={page.title}
              onChange={(v) => up("title", v)}
              required
              maxLength={120}
            />
            <Field
              label="Heading (H1)"
              value={page.h1}
              onChange={(v) => up("h1", v)}
              required
              maxLength={140}
            />
            <Field
              label="SEO title (max 70 characters)"
              value={page.metaTitle}
              onChange={(v) => up("metaTitle", v)}
              required
              maxLength={70}
            />
            <Field
              label="Canonical path"
              value={page.canonicalPath}
              onChange={(v) => up("canonicalPath", v)}
              placeholder={`/pages/${page.slug}`}
            />
            <div className="sm:col-span-2">
              <TextField
                label="Meta description (30–320 characters)"
                value={page.metaDescription}
                onChange={(v) => up("metaDescription", v)}
                rows={2}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <TextField
                label="Intro"
                value={page.intro}
                onChange={(v) => up("intro", v)}
                rows={3}
                required
              />
            </div>
            <Field
              label="Hero image ID (from Photo library)"
              value={page.heroImageId}
              onChange={(v) => up("heroImageId", v)}
            />
            <Field
              label="Hero image alt text"
              value={page.heroImageAlt}
              onChange={(v) => up("heroImageAlt", v)}
              maxLength={180}
            />
          </div>
          <label className="flex items-center gap-2 text-xs font-bold">
            <input
              type="checkbox"
              checked={page.noindex}
              onChange={(e) => up("noindex", e.target.checked)}
            />{" "}
            Keep this page out of search results until approved
          </label>
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-black">Content sections</h4>
              <Button
                secondary
                onClick={() =>
                  up("sections", [
                    ...page.sections,
                    { heading: "", body: "", imageId: "", imageAlt: "" },
                  ])
                }
              >
                Add section
              </Button>
            </div>
            <div className="space-y-3">
              {page.sections.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-2"
                >
                  <Field
                    label={`Section ${index + 1} heading`}
                    value={item.heading}
                    onChange={(v) =>
                      up(
                        "sections",
                        page.sections.map((x, i) =>
                          i === index ? { ...x, heading: v } : x,
                        ),
                      )
                    }
                  />
                  <Field
                    label="Image ID (optional)"
                    value={item.imageId}
                    onChange={(v) =>
                      up(
                        "sections",
                        page.sections.map((x, i) =>
                          i === index ? { ...x, imageId: v } : x,
                        ),
                      )
                    }
                  />
                  <div className="sm:col-span-2">
                    <TextField
                      label="Section text"
                      value={item.body}
                      onChange={(v) =>
                        up(
                          "sections",
                          page.sections.map((x, i) =>
                            i === index ? { ...x, body: v } : x,
                          ),
                        )
                      }
                      rows={4}
                    />
                  </div>
                  <Field
                    label="Image alt text"
                    value={item.imageAlt}
                    onChange={(v) =>
                      up(
                        "sections",
                        page.sections.map((x, i) =>
                          i === index ? { ...x, imageAlt: v } : x,
                        ),
                      )
                    }
                  />
                  <div className="flex items-end">
                    <Button
                      secondary
                      onClick={() =>
                        up(
                          "sections",
                          page.sections.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Remove section
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-black">Frequently asked questions</h4>
              <Button
                secondary
                onClick={() =>
                  up("faqs", [...page.faqs, { question: "", answer: "" }])
                }
              >
                Add FAQ
              </Button>
            </div>
            <div className="space-y-3">
              {page.faqs.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-2"
                >
                  <Field
                    label={`Question ${index + 1}`}
                    value={item.question}
                    onChange={(v) =>
                      up(
                        "faqs",
                        page.faqs.map((x, i) =>
                          i === index ? { ...x, question: v } : x,
                        ),
                      )
                    }
                  />
                  <TextField
                    label="Answer"
                    value={item.answer}
                    onChange={(v) =>
                      up(
                        "faqs",
                        page.faqs.map((x, i) =>
                          i === index ? { ...x, answer: v } : x,
                        ),
                      )
                    }
                    rows={2}
                  />
                  <Button
                    secondary
                    onClick={() =>
                      up(
                        "faqs",
                        page.faqs.filter((_, i) => i !== index),
                      )
                    }
                  >
                    Remove FAQ
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={busy}>
            <Check size={15} />
            {page.status === "published"
              ? "Save and publish"
              : page.status === "scheduled"
                ? "Schedule publication"
                : "Save draft"}
          </Button>
        </form>
      </Card>
      {editing && (
        <PageRevisionHistory
          kind="cms-page"
          reference={editing}
          request={request}
          refresh={refresh}
        />
      )}
      <Card className="mt-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Field
            label="Filter pages"
            value={search}
            onChange={setSearch}
            placeholder="Title, slug or status"
          />
        </div>
        <div className="mt-3 space-y-2">
          {filtered.map((row, index) => (
            <div
              key={`${row._id || row.id || row.slug || row.title || "page"}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div>
                <p className="text-sm font-black">{row.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  /pages/{row.slug} · updated{" "}
                  {new Date(row.updatedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill value={row.status} />
                {row.status === "published" && (
                  <Link
                    className="text-xs font-bold text-blue-800"
                    href={`/pages/${row.slug}`}
                    target="_blank"
                  >
                    View ↗
                  </Link>
                )}
                <Button secondary onClick={() => edit(row)}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <Empty message="No content pages yet. Create one above." />
          )}
        </div>
      </Card>
    </>
  );
}

function Seo({
  rows,
  seo,
  setSeo,
  editing,
  setEditing,
  busy,
  save,
  remove,
}: {
  rows: Row[];
  seo: typeof initialSeo;
  setSeo: (v: typeof initialSeo) => void;
  editing: string;
  setEditing: (id: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  remove: (path: string, what: string) => Promise<void>;
}) {
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Search appearance</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Set titles, descriptions and canonical paths for existing Vistar Cabs
          routes. Use the Pages tab to create new pages.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save("/seo", "PUT", seo).then((ok) => {
              if (ok) {
                setSeo(initialSeo);
                setEditing("");
              }
            });
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <Field
            label="Existing page path"
            value={seo.path}
            onChange={(v) => setSeo({ ...seo, path: v.toLowerCase() })}
            placeholder="/cities/nashik"
            required
          />
          <Field
            label="Focus phrase (editorial aid)"
            value={seo.focusPhrase}
            onChange={(v) => setSeo({ ...seo, focusPhrase: v })}
            maxLength={100}
          />
          <Field
            label="Search title"
            value={seo.title}
            onChange={(v) => setSeo({ ...seo, title: v })}
            required
            maxLength={70}
          />
          <Field
            label="Canonical path"
            value={seo.canonicalPath}
            onChange={(v) => setSeo({ ...seo, canonicalPath: v })}
            placeholder="Leave blank to use the page path"
          />
          <div className="sm:col-span-2">
            <TextField
              label="Search description"
              value={seo.description}
              onChange={(v) => setSeo({ ...seo, description: v })}
              rows={3}
              required
            />
          </div>
          <label className="flex items-center gap-2 text-xs font-bold">
            <input
              type="checkbox"
              checked={seo.noindex}
              onChange={(e) => setSeo({ ...seo, noindex: e.target.checked })}
            />{" "}
            Mark noindex (hide from search engines)
          </label>
          <div>
            <Button type="submit" disabled={busy}>
              {editing ? "Update SEO settings" : "Save SEO settings"}
            </Button>
            {editing && (
              <Button
                secondary
                onClick={() => {
                  setSeo(initialSeo);
                  setEditing("");
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <h3 className="font-black">Saved SEO overrides</h3>
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div
              key={
                row._id ||
                row.phone ||
                `${row.name}-${row.lastInquiryAt || "profile"}`
              }
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div>
                <p className="text-sm font-bold">{row.path}</p>
                <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                  {row.title} · {row.noindex ? "noindex" : "indexable"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  secondary
                  onClick={() => {
                    setSeo({
                      path: row.path,
                      title: row.title,
                      description: row.description,
                      canonicalPath: row.canonicalPath || "",
                      noindex: row.noindex,
                      focusPhrase: row.focusPhrase || "",
                    });
                    setEditing(row._id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Edit
                </Button>
                <Button
                  secondary
                  onClick={() => void remove(`/seo/${row._id}`, "SEO override")}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {!rows.length && (
            <Empty message="No SEO overrides yet. Page templates keep their current metadata until you add one." />
          )}
        </div>
      </Card>
    </>
  );
}
const initialSeo = {
  path: "/",
  title: "",
  description: "",
  canonicalPath: "",
  noindex: false,
  focusPhrase: "",
};

function Reviews({
  rows,
  review,
  setReview,
  editing,
  setEditing,
  busy,
  save,
  remove,
}: {
  rows: Row[];
  review: ReviewDraft;
  setReview: (r: ReviewDraft) => void;
  editing: string;
  setEditing: (id: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  remove: (path: string, what: string) => Promise<void>;
}) {
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Customer-approved feedback</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Only enter a real customer’s approved words and display name. Ratings
          and quotes will appear publicly only after publishing.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save(
              editing ? `/reviews/${editing}` : "/reviews",
              editing ? "PUT" : "POST",
              review,
            ).then((ok) => {
              if (ok) {
                setReview(emptyReview);
                setEditing("");
              }
            });
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <Field
            label="Approved display name"
            value={review.customerName}
            onChange={(v) => setReview({ ...review, customerName: v })}
            required
          />
          <SelectField
            label="Rating"
            value={String(review.rating)}
            onChange={(v) => setReview({ ...review, rating: Number(v) })}
            options={["5", "4", "3", "2", "1"]}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Exact customer feedback"
              value={review.quote}
              onChange={(v) => setReview({ ...review, quote: v })}
              rows={4}
              required
            />
          </div>
          <Field
            label="Trip label (optional)"
            value={review.tripLabel}
            onChange={(v) => setReview({ ...review, tripLabel: v })}
          />
          <SelectField
            label="Publication"
            value={review.status}
            onChange={(v) =>
              setReview({ ...review, status: v as ReviewDraft["status"] })
            }
            options={["draft", "scheduled", "published", "archived"]}
          />
          <label className="flex items-start gap-2 text-xs leading-5 sm:col-span-2">
            <input
              className="mt-1"
              type="checkbox"
              checked={review.consentConfirmed}
              onChange={(e) =>
                setReview({ ...review, consentConfirmed: e.target.checked })
              }
              required
            />
            <span>
              I confirm the customer approved publishing this exact quote and
              display name.
            </span>
          </label>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={busy}>
              {editing ? "Update feedback" : "Save feedback"}
            </Button>
            {editing && (
              <Button
                secondary
                onClick={() => {
                  setReview(emptyReview);
                  setEditing("");
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <h3 className="font-black">Feedback records</h3>
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div
              key={row._id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-100 p-3"
            >
              <div className="max-w-2xl">
                <p className="font-bold">
                  {row.customerName} · {"★".repeat(row.rating || 0)}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {row.quote}
                </p>
                <div className="mt-2 flex gap-2">
                  <StatusPill value={row.status} />
                  <StatusPill
                    value={
                      row.consentConfirmed
                        ? "consent confirmed"
                        : "consent missing"
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  secondary
                  onClick={() => {
                    setReview({
                      customerName: row.customerName,
                      quote: row.quote,
                      rating: row.rating,
                      tripLabel: row.tripLabel || "",
                      consentConfirmed: row.consentConfirmed,
                      status: row.status,
                    });
                    setEditing(row._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  secondary
                  onClick={() =>
                    void remove(`/reviews/${row._id}`, "feedback record")
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {!rows.length && (
            <Empty message="No customer feedback has been entered yet." />
          )}
        </div>
      </Card>
    </>
  );
}

function MediaLibrary({
  rows,
  file,
  setFile,
  alt,
  setAlt,
  busy,
  save,
  request,
  refresh,
}: {
  rows: Row[];
  file: File | null;
  setFile: (v: File | null) => void;
  alt: string;
  setAlt: (v: string) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  request: (
    path: string,
    method?: string,
    body?: unknown,
    headers?: HeadersInit,
  ) => Promise<any>;
  refresh: () => void;
}) {
  const [message, setMessage] = useState("");
  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    try {
      const bytes = await file.arrayBuffer();
      const params = new URLSearchParams({ filename: file.name, alt });
      await request(`/media/upload?${params}`, "POST", bytes);
      setMessage(
        "Image uploaded. Copy its ID into a page or vehicle image field.",
      );
      setFile(null);
      setAlt("");
      refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Image upload failed.");
    }
  }
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Add a photo</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          JPG, PNG or WebP only · maximum 4 MB · add useful alt text. Uploaded
          images are saved in MongoDB.
        </p>
        <form onSubmit={upload} className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className={labelClass}>
            Image file
            <input
              className={inputClass}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </label>
          <Field
            label="Accessible alt text"
            value={alt}
            onChange={setAlt}
            maxLength={180}
            placeholder="Describe what this photo shows"
            required
          />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={busy || !file}>
              <ImagePlus size={15} />
              {busy ? "Uploading…" : "Upload image"}
            </Button>
          </div>
        </form>
        {message && (
          <p role="status" className="mt-3 text-xs text-slate-600">
            {message}
          </p>
        )}
      </Card>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => (
          <Card key={row._id}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
              {row.url && (
                <Image
                  src={`${getApiUrl()}${row.url}`}
                  alt={row.alt}
                  fill
                  unoptimized
                  sizes="320px"
                  className="object-cover"
                />
              )}
            </div>
            <p className="mt-3 truncate text-sm font-black">{row.filename}</p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              {row.alt}
            </p>
            <p className="mt-2 break-all text-[10px] text-slate-500">
              Image ID: {row.id}
            </p>
            <Button
              secondary
              onClick={() => void navigator.clipboard?.writeText(row.id)}
            >
              Copy image ID
            </Button>
            <Button
              secondary
              onClick={() => void save(`/media/${row.id}`, "DELETE")}
            >
              Delete
            </Button>
          </Card>
        ))}
        {!rows.length && <Empty message="Your photo library is empty." />}
      </div>
    </>
  );
}

function Customers({
  rows,
  search,
  setSearch,
  value,
  setValue,
  busy,
  save,
}: {
  rows: Row[];
  search: string;
  setSearch: (v: string) => void;
  value: {
    name: string;
    phone: string;
    notes: string;
    tags: string;
    marketingConsent: boolean;
  };
  setValue: (v: typeof value) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
}) {
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Customer directory</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Owner-only customer profiles. Add regular customers only when there is
          a legitimate service reason. Marketing consent is off by default.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save("/customers", "POST", {
              ...value,
              tags: value.tags
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            }).then((ok) => {
              if (ok)
                setValue({
                  name: "",
                  phone: "",
                  notes: "",
                  tags: "",
                  marketingConsent: false,
                });
            });
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <Field
            label="Customer name"
            value={value.name}
            onChange={(v) => setValue({ ...value, name: v })}
            required
          />
          <Field
            label="Phone"
            value={value.phone}
            onChange={(v) => setValue({ ...value, phone: v })}
            required
          />
          <Field
            label="Tags (comma separated)"
            value={value.tags}
            onChange={(v) => setValue({ ...value, tags: v })}
          />
          <TextField
            label="Private service notes"
            value={value.notes}
            onChange={(v) => setValue({ ...value, notes: v })}
            rows={2}
          />
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={value.marketingConsent}
              onChange={(e) =>
                setValue({ ...value, marketingConsent: e.target.checked })
              }
            />{" "}
            Customer explicitly agreed to marketing messages
          </label>
          <div>
            <Button type="submit" disabled={busy}>
              Add customer
            </Button>
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <label className={labelClass}>
          Search customers
          <input
            className={inputClass}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or tag"
          />
        </label>
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div
              key={row._id}
              className="rounded-xl border border-slate-100 p-3"
            >
              <p className="font-bold">
                {row.name} ·{" "}
                <a href={`tel:${row.phone}`} className="text-blue-800">
                  {row.phone}
                </a>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {(row.tags || []).join(" · ")}{" "}
                {row.marketingConsent ? "· marketing consent recorded" : ""}
              </p>
              {row.notes && (
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {row.notes}
                </p>
              )}
            </div>
          ))}
          {!rows.length && <Empty message="No customer profiles yet." />}
        </div>
      </Card>
    </>
  );
}

const emptyDutySlip = {
  companyName: "",
  guestName: "",
  guestPhone: "",
  coordinatorName: "",
  coordinatorPhone: "",
  dutyDate: "",
  pickupTime: "",
  pickupAddress: "",
  dropAddress: "",
  travelRouting: "",
  tripType: "Corporate",
  driverName: "",
  driverPhone: "",
  vehicleNumber: "",
  vehicleType: "",
  startKm: "",
  endKm: "",
  actualStartTime: "",
  actualEndTime: "",
  tollAmount: "0",
  parkingAmount: "0",
  tripAmount: "0",
  paymentTerms: "Company-billed corporate trip",
  tripRemarks: "",
  status: "prepared",
};
function DutySlips({
  rows,
  save,
  refresh,
}: {
  rows: Row[];
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  refresh: () => void;
}) {
  const [value, setValue] = useState({ ...emptyDutySlip });
  const [editing, setEditing] = useState("");
  const [printRow, setPrintRow] = useState<Row | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!printRow) return;
    const timer = window.setTimeout(() => window.print(), 200);
    const finish = () => setPrintRow(null);
    window.addEventListener("afterprint", finish, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", finish);
    };
  }, [printRow]);
  const set = (key: string, next: string) =>
    setValue((old) => ({ ...old, [key]: next }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = {
      ...value,
      tollAmount: Number(value.tollAmount || 0),
      parkingAmount: Number(value.parkingAmount || 0),
      tripAmount: Number(value.tripAmount || 0),
    };
    void save(
      editing ? `/duty-slips/${editing}` : "/duty-slips",
      editing ? "PUT" : "POST",
      body,
    ).then((ok) => {
      if (ok) {
        setValue({ ...emptyDutySlip });
        setEditing("");
        refresh();
      }
    });
  };
  const fields: Array<[string, string, string?]> = [
    ["companyName", "Company name"],
    ["guestName", "Guest / passenger name"],
    ["guestPhone", "Guest phone", "tel"],
    ["coordinatorName", "Company coordinator"],
    ["coordinatorPhone", "Coordinator phone", "tel"],
    ["dutyDate", "Trip date", "date"],
    ["pickupTime", "Pickup time", "time"],
    ["pickupAddress", "Pickup address"],
    ["dropAddress", "Drop address"],
    ["driverName", "Assigned driver"],
    ["driverPhone", "Driver phone", "tel"],
    ["vehicleType", "Vehicle type"],
    ["vehicleNumber", "Vehicle number"],
    ["startKm", "Start KM"],
    ["endKm", "End KM"],
    ["actualStartTime", "Actual start time", "time"],
    ["actualEndTime", "Actual end time", "time"],
    ["tripAmount", "Trip amount (INR)", "number"],
    ["tollAmount", "Tolls (INR)", "number"],
    ["parkingAmount", "Parking (INR)", "number"],
  ];
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Corporate trip duty slip</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Create a company trip record before travel, print it for the driver,
          then update actual readings and charges for company review. The slip
          is stored in MongoDB.
        </p>
        <form
          ref={formRef}
          onSubmit={submit}
          className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {fields.map(([key, label, type]) => (
            <Field
              key={key}
              label={label}
              type={type}
              value={value[key as keyof typeof value]}
              onChange={(v) => set(key, v)}
              required={[
                "companyName",
                "guestName",
                "guestPhone",
                "dutyDate",
                "pickupTime",
                "pickupAddress",
                "dropAddress",
              ].includes(key)}
            />
          ))}
          <TextField
            label="Travel routing / itinerary"
            value={value.travelRouting}
            onChange={(v) => set("travelRouting", v)}
            rows={2}
          />
          <TextField
            label="Payment terms / company notes"
            value={value.paymentTerms}
            onChange={(v) => set("paymentTerms", v)}
            rows={2}
          />
          <TextField
            label="Trip remarks / guest feedback (optional)"
            value={value.tripRemarks}
            onChange={(v) => set("tripRemarks", v)}
            rows={2}
          />
          <label className={labelClass}>
            Slip status
            <select
              className={inputClass}
              value={value.status}
              onChange={(e) => set("status", e.target.value)}
            >
              {[
                "prepared",
                "completed",
                "submitted",
                "approved",
                "cancelled",
              ].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <Button type="submit">
              {editing ? "Save trip updates" : "Create duty slip"}
            </Button>
            {editing && (
              <Button
                type="button"
                secondary
                onClick={() => {
                  setEditing("");
                  setValue({ ...emptyDutySlip });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
      {printRow && <DutySlipPrint row={printRow} />}
      <Card className="mt-4 print:hidden">
        <h2 className="text-lg font-black">Saved corporate duty slips</h2>
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div
              key={row._id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
            >
              <div>
                <p className="font-bold">
                  {row.slipNumber} · {row.companyName}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  {row.guestName} · {row.dutyDate} · {row.pickupAddress} →{" "}
                  {row.dropAddress} · {row.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setPrintRow(row)}>
                  Print / PDF
                </Button>
                <Button
                  type="button"
                  secondary
                  onClick={() => {
                    setEditing(row._id);
                    setValue(
                      Object.fromEntries(
                        Object.keys(emptyDutySlip).map((k) => [
                          k,
                          String(
                            row[k] ??
                              emptyDutySlip[k as keyof typeof emptyDutySlip],
                          ),
                        ]),
                      ) as typeof emptyDutySlip,
                    );
                    formRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Complete / edit
                </Button>
              </div>
            </div>
          ))}
          {!rows.length && <Empty message="No corporate duty slips yet." />}
        </div>
      </Card>
    </>
  );
}

function DutySlipPrint({ row }: { row: Row }) {
  const amount = (value: unknown) =>
    "₹ " + Number(value || 0).toLocaleString("en-IN");
  const blank = (value: unknown) =>
    String(value ?? "").trim() || "________________";
  const day = new Date(row.dutyDate + "T00:00:00");
  const dutyDate = Number.isNaN(day.getTime())
    ? row.dutyDate
    : day.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  const total =
    Number(row.tripAmount || 0) +
    Number(row.tollAmount || 0) +
    Number(row.parkingAmount || 0);
  const startKm = Number(row.startKm);
  const endKm = Number(row.endKm);
  const distanceKm =
    String(row.startKm ?? "").trim() &&
    String(row.endKm ?? "").trim() &&
    Number.isFinite(startKm) &&
    Number.isFinite(endKm) &&
    endKm >= startKm
      ? (endKm - startKm).toLocaleString("en-IN")
      : "________________";
  const portal = (
    <div id="duty-slip-print-root">
      <article
        id="duty-slip-print"
        aria-label="Vistar Cabs corporate duty slip"
      >
        <div className="duty-slip-watermark">VISTAR</div>
        <header className="duty-slip-brandbar">
          <div className="duty-slip-logo">
            <Image
              src="/brand/vistar-cabs-logo.png"
              alt="Vistar Cabs"
              width={178}
              height={60}
              priority
              unoptimized
            />
          </div>
          <div className="duty-slip-business">
            <strong>VISTAR CABS</strong>
            <span>{site.address}</span>
            <span>Call: +91 84858 84417 · +91 87883 73586</span>
            <span>Email: {site.email}</span>
          </div>
        </header>
        <div className="duty-slip-titlebar">
          <div>
            <small>CORPORATE TRAVEL RECORD</small>
            <h1>TRIP DUTY SLIP</h1>
          </div>
          <div className="duty-slip-ref">
            <b>{row.slipNumber}</b>
            <span>
              Prepared{" "}
              {new Date(row.createdAt || Date.now()).toLocaleDateString(
                "en-IN",
                { day: "2-digit", month: "short", year: "numeric" },
              )}
            </span>
            <span className="duty-slip-status">
              {String(row.status || "prepared").toUpperCase()}
            </span>
          </div>
        </div>
        <section className="duty-slip-section">
          <h2>Company & passenger</h2>
          <div className="duty-slip-info-grid">
            <div>
              <small>COMPANY</small>
              <b>{blank(row.companyName)}</b>
            </div>
            <div>
              <small>COMPANY COORDINATOR</small>
              <b>{blank(row.coordinatorName)}</b>
            </div>
            <div>
              <small>GUEST / PASSENGER</small>
              <b>{blank(row.guestName)}</b>
            </div>
            <div>
              <small>GUEST CONTACT</small>
              <b>{blank(row.guestPhone)}</b>
            </div>
            <div>
              <small>COORDINATOR CONTACT</small>
              <b>{blank(row.coordinatorPhone)}</b>
            </div>
            <div>
              <small>TRIP DATE</small>
              <b>{blank(dutyDate)}</b>
            </div>
          </div>
        </section>
        <section className="duty-slip-section">
          <h2>Journey & assigned vehicle</h2>
          <div className="duty-slip-info-grid">
            <div>
              <small>PICKUP TIME</small>
              <b>{blank(row.pickupTime)}</b>
            </div>
            <div>
              <small>TRIP TYPE</small>
              <b>{blank(row.tripType)}</b>
            </div>
            <div className="wide">
              <small>PICKUP ADDRESS</small>
              <b>{blank(row.pickupAddress)}</b>
            </div>
            <div className="wide">
              <small>DROP ADDRESS</small>
              <b>{blank(row.dropAddress)}</b>
            </div>
            <div className="wide">
              <small>TRAVEL ROUTING / ITINERARY</small>
              <b>{blank(row.travelRouting)}</b>
            </div>
            <div>
              <small>DRIVER</small>
              <b>
                {blank(row.driverName)} · {blank(row.driverPhone)}
              </b>
            </div>
            <div>
              <small>VEHICLE</small>
              <b>
                {blank(row.vehicleType)} · {blank(row.vehicleNumber)}
              </b>
            </div>
          </div>
        </section>
        <section className="duty-slip-section">
          <h2>
            Journey completion <span>Driver to complete after the trip</span>
          </h2>
          <div className="duty-slip-log">
            <div>
              <small>START KM</small>
              <b>{blank(row.startKm)}</b>
            </div>
            <div>
              <small>START TIME</small>
              <b>{blank(row.actualStartTime)}</b>
            </div>
            <div>
              <small>END KM</small>
              <b>{blank(row.endKm)}</b>
            </div>
            <div>
              <small>END TIME</small>
              <b>{blank(row.actualEndTime)}</b>
            </div>
            <div>
              <small>TOTAL KM</small>
              <b>{distanceKm}</b>
            </div>
            <div>
              <small>TOTAL TIME / DAYS</small>
              <b>________________</b>
            </div>
          </div>
        </section>
        <section className="duty-slip-section">
          <h2>Charges for company review</h2>
          <div className="duty-slip-charges">
            <div>
              <span>Trip amount</span>
              <b>{amount(row.tripAmount)}</b>
            </div>
            <div>
              <span>Tolls</span>
              <b>{amount(row.tollAmount)}</b>
            </div>
            <div>
              <span>Parking</span>
              <b>{amount(row.parkingAmount)}</b>
            </div>
            <div className="total">
              <span>Total for company review</span>
              <b>{amount(total)}</b>
            </div>
          </div>
          <p className="duty-slip-terms">
            <b>Payment terms / notes:</b> {blank(row.paymentTerms)}
          </p>
        </section>
        <section className="duty-slip-section duty-slip-feedback">
          <h2>Trip remarks / guest feedback</h2>
          <p>
            {String(row.tripRemarks ?? "").trim() ||
              "Record any service feedback, incident or company note after the trip."}
          </p>
          {!String(row.tripRemarks ?? "").trim() && <div aria-hidden="true" />}
        </section>
        <div className="duty-slip-approval">
          <p>
            The driver confirms the recorded journey and expense details. The
            company representative acknowledges receipt for review.
          </p>
          <div className="duty-slip-sign-row">
            <div>
              <span></span>
              <b>Driver signature</b>
              <small>Name & date</small>
            </div>
            <div>
              <span></span>
              <b>Company authorized signatory</b>
              <small>Signature, stamp & date</small>
            </div>
          </div>
        </div>
        <footer className="duty-slip-footer">
          <b>VISTAR CABS</b>
          <span>
            Trip record for company review · Payment subject to agreed company
            terms
          </span>
        </footer>
      </article>
    </div>
  );
  return createPortal(portal, document.body);
}

function Drivers({
  rows,
  search,
  setSearch,
  value,
  setValue,
  busy,
  save,
}: {
  rows: Row[];
  search: string;
  setSearch: (v: string) => void;
  value: {
    name: string;
    phone: string;
    homeCity: string;
    vehicleId: string;
    status: string;
    internalNotes: string;
  };
  setValue: (v: typeof value) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
}) {
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Driver directory</h2>
        <p className="mt-1 text-xs text-slate-500">
          Store only operational contact information. Add identity documents and
          license numbers only through an approved secure HR system.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save("/drivers", "POST", {
              ...value,
              vehicleId: value.vehicleId || "",
            }).then((ok) => {
              if (ok)
                setValue({
                  name: "",
                  phone: "",
                  homeCity: "Nashik",
                  vehicleId: "",
                  status: "available",
                  internalNotes: "",
                });
            });
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <Field
            label="Driver name"
            value={value.name}
            onChange={(v) => setValue({ ...value, name: v })}
            required
          />
          <Field
            label="Phone"
            value={value.phone}
            onChange={(v) => setValue({ ...value, phone: v })}
            required
          />
          <Field
            label="Home city"
            value={value.homeCity}
            onChange={(v) => setValue({ ...value, homeCity: v })}
          />
          <SelectField
            label="Status"
            value={value.status}
            onChange={(v) => setValue({ ...value, status: v })}
            options={["available", "assigned", "inactive"]}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Internal operational notes"
              value={value.internalNotes}
              onChange={(v) => setValue({ ...value, internalNotes: v })}
              rows={2}
            />
          </div>
          <div>
            <Button type="submit" disabled={busy}>
              Add driver
            </Button>
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <Field
          label="Search driver records"
          value={search}
          onChange={setSearch}
          placeholder="Name, phone or city"
        />
        <div className="mt-3 space-y-2">
          {rows.map((row) => (
            <div
              key={row._id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 p-3"
            >
              <div>
                <p className="font-bold">
                  {row.name} · {row.phone}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {row.homeCity} ·{" "}
                  {row.vehicleId?.label || "No vehicle assigned"}
                </p>
              </div>
              <StatusPill value={row.status} />
            </div>
          ))}
          {!rows.length && <Empty message="No driver records yet." />}
        </div>
      </Card>
    </>
  );
}

function Vehicles({
  rows,
  search,
  setSearch,
  value,
  setValue,
  busy,
  save,
  media,
}: {
  rows: Row[];
  search: string;
  setSearch: (v: string) => void;
  value: {
    label: string;
    make: string;
    model: string;
    category: string;
    seats: string;
    luggage: string;
    registration: string;
    homeCity: string;
    status: string;
    imageId: string;
    imageAlt: string;
  };
  setValue: (v: typeof value) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
  media: Row[];
}) {
  return (
    <>
      <Card>
        <h2 className="text-lg font-black">Fleet records</h2>
        <p className="mt-1 text-xs text-slate-500">
          Fleet data is private to the owner dashboard. Public pages do not
          claim a vehicle is available until confirmed.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save("/vehicles", "POST", {
              ...value,
              seats: Number(value.seats),
              luggage: Number(value.luggage),
            }).then((ok) => {
              if (ok)
                setValue({
                  ...value,
                  label: "",
                  make: "",
                  model: "",
                  registration: "",
                  imageId: "",
                  imageAlt: "",
                });
            });
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Field
            label="Vehicle display label"
            value={value.label}
            onChange={(v) => setValue({ ...value, label: v })}
            required
          />
          <Field
            label="Make"
            value={value.make}
            onChange={(v) => setValue({ ...value, make: v })}
          />
          <Field
            label="Model"
            value={value.model}
            onChange={(v) => setValue({ ...value, model: v })}
          />
          <SelectField
            label="Category"
            value={value.category}
            onChange={(v) => setValue({ ...value, category: v })}
            options={[
              "Hatchback",
              "Sedan",
              "SUV",
              "MPV",
              "Tempo traveller",
              "Other",
            ]}
          />
          <Field
            label="Seats"
            type="number"
            value={value.seats}
            onChange={(v) => setValue({ ...value, seats: v })}
          />
          <Field
            label="Luggage capacity"
            type="number"
            value={value.luggage}
            onChange={(v) => setValue({ ...value, luggage: v })}
          />
          <Field
            label="Registration (private)"
            value={value.registration}
            onChange={(v) => setValue({ ...value, registration: v })}
          />
          <Field
            label="Home city"
            value={value.homeCity}
            onChange={(v) => setValue({ ...value, homeCity: v })}
          />
          <SelectField
            label="Status"
            value={value.status}
            onChange={(v) => setValue({ ...value, status: v })}
            options={["active", "maintenance", "inactive"]}
          />
          <label className={labelClass}>
            Photo from library
            <select
              className={inputClass}
              value={value.imageId}
              onChange={(e) => setValue({ ...value, imageId: e.target.value })}
            >
              <option value="">No image</option>
              {media.map((x) => (
                <option key={x.id || x._id} value={x.id || x._id}>
                  {x.filename}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Photo alt text"
            value={value.imageAlt}
            onChange={(v) => setValue({ ...value, imageAlt: v })}
          />
          <div>
            <Button type="submit" disabled={busy}>
              Add vehicle
            </Button>
          </div>
        </form>
      </Card>
      <Card className="mt-3">
        <Field
          label="Search fleet"
          value={search}
          onChange={setSearch}
          placeholder="Label, model or category"
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row._id}
              className="rounded-xl border border-slate-100 p-3"
            >
              <p className="font-bold">{row.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {row.make} {row.model} · {row.category} · {row.seats} seats ·{" "}
                {row.homeCity}
              </p>
              <div className="mt-2">
                <StatusPill value={row.status} />
              </div>
            </div>
          ))}
          {!rows.length && <Empty message="No vehicle records yet." />}
        </div>
      </Card>
    </>
  );
}

function SettingsPanel({
  value,
  setValue,
  busy,
  save,
}: {
  value: SettingsDraft;
  setValue: (s: SettingsDraft) => void;
  busy: boolean;
  save: (path: string, method?: string, body?: unknown) => Promise<boolean>;
}) {
  const update = (key: keyof SettingsDraft, v: string) =>
    setValue({ ...value, [key]: v });
  return (
    <Card>
      <h2 className="text-lg font-black">Public site settings</h2>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Brand name is locked to Vistar Cabs. Blank social fields remain hidden.
        Changes are reflected on the site after saving.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save("/settings", "PUT", value);
        }}
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        <Field
          label="Primary phone"
          value={value.primaryPhone}
          onChange={(v) => update("primaryPhone", v)}
          required
        />
        <Field
          label="Secondary phone"
          value={value.secondaryPhone}
          onChange={(v) => update("secondaryPhone", v)}
          required
        />
        <Field
          label="WhatsApp number (country code, digits only)"
          value={value.whatsappNumber}
          onChange={(v) => update("whatsappNumber", v.replace(/\D/g, ""))}
          required
        />
        <Field
          label="Email"
          type="email"
          value={value.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Instagram URL"
          value={value.instagramUrl}
          onChange={(v) => update("instagramUrl", v)}
        />
        <Field
          label="Facebook URL"
          value={value.facebookUrl}
          onChange={(v) => update("facebookUrl", v)}
        />
        <Field
          label="YouTube URL"
          value={value.youtubeUrl}
          onChange={(v) => update("youtubeUrl", v)}
        />
        <Field
          label="LinkedIn URL"
          value={value.linkedinUrl}
          onChange={(v) => update("linkedinUrl", v)}
        />
        <Field
          label="Operating hours (confirmed only)"
          value={value.operatingHours}
          onChange={(v) => update("operatingHours", v)}
        />
        <div className="sm:col-span-2">
          <TextField
            label="Coverage statement"
            value={value.coverageSummary}
            onChange={(v) => update("coverageSummary", v)}
            rows={2}
          />
        </div>
        <div>
          <Button type="submit" disabled={busy}>
            Save site settings
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Audit({ rows }: { rows: Row[] }) {
  return (
    <Card>
      <h2 className="text-lg font-black">Admin change history</h2>
      <p className="mt-1 text-xs text-slate-500">
        Recent content and settings changes.
      </p>
      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div
            key={row._id}
            className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 py-3"
          >
            <div>
              <p className="text-sm font-bold">
                {row.action} · {row.entity}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {row.summary} · {row.actor} ({row.role})
              </p>
            </div>
            <time className="text-[10px] text-slate-400">
              {new Date(row.createdAt).toLocaleString("en-IN")}
            </time>
          </div>
        ))}
        {!rows.length && <Empty message="No changes recorded yet." />}
      </div>
    </Card>
  );
}
function Empty({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
      {message}
    </div>
  );
}
