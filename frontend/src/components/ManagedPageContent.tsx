import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import {
  getManagedPageContent,
  mediaUrl,
  type ManagedPageContent as ManagedPageRecord,
} from "@/lib/cms";

export async function getManagedPageReplacement(
  path: string,
): Promise<ManagedPageRecord | null> {
  const page = await getManagedPageContent(path);
  return (page?.status === "published" || page?.status === "scheduled") &&
    page.mode === "replace"
    ? page
    : null;
}

function ContentSections({ page }: { page: ManagedPageRecord }) {
  return (
    <>
      {page.sections.length > 0 && (
        <section className="container-wide grid gap-4 py-10 sm:grid-cols-2 lg:py-14">
          {page.sections.map((section, index) => (
            <article
              key={`${section.heading}-${index}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              {section.imageId && (
                <Image
                  src={mediaUrl(section.imageId)}
                  alt={section.imageAlt || section.heading}
                  width={1200}
                  height={700}
                  unoptimized
                  className="max-h-72 w-full object-cover"
                />
              )}
              <div className="p-5 sm:p-7">
                <h2 className="text-xl font-black tracking-tight">
                  {section.heading}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {section.body}
                </p>
                {section.linkUrl &&
                  section.linkLabel &&
                  (section.linkUrl.startsWith("/") ? (
                    <Link
                      href={section.linkUrl}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-800"
                    >
                      {section.linkLabel}
                      <ArrowUpRight size={15} />
                    </Link>
                  ) : (
                    <a
                      href={section.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-800"
                    >
                      {section.linkLabel}
                      <ArrowUpRight size={15} />
                    </a>
                  ))}
              </div>
            </article>
          ))}
        </section>
      )}
      {page.faqs.length > 0 && (
        <section className="container-wide max-w-4xl py-8 sm:py-12">
          <p className="eyebrow text-amber-700">Helpful answers</p>
          <h2 className="mt-2 text-2xl font-black">
            Frequently asked questions
          </h2>
          <div className="mt-3 divide-y divide-slate-200">
            {page.faqs.map((item, index) => (
              <details key={`${item.question}-${index}`} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  <span>{item.question}</span>
                  <span className="text-xl text-amber-700 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export function ManagedPageReplacement({ page }: { page: ManagedPageRecord }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071a2f] text-white">
        <Header />
        {page.heroImageId && (
          <Image
            src={mediaUrl(page.heroImageId)}
            alt={page.heroImageAlt || page.h1}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="-z-20 object-cover"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/78 to-[#071a2f]/45" />
        <div className="container-wide flex min-h-[390px] flex-col justify-end pb-12 pt-32 sm:min-h-[470px]">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-xs font-bold text-white/70 hover:text-white"
          >
            Vistar Cabs <ArrowRight size={14} />
          </Link>
          {page.eyebrow && (
            <p className="eyebrow mt-7 text-amber-300">{page.eyebrow}</p>
          )}
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {page.h1}
            <span className="text-amber-300">.</span>
          </h1>
          <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-7 text-white/85">
            {page.intro}
          </p>
          <Link
            href="/#book"
            className="mt-6 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950"
          >
            Plan a journey <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <ContentSections page={page} />
      <SiteFooter />
    </main>
  );
}

export default async function ManagedPageContent({
  path,
  mode = "append",
}: {
  path: string;
  mode?: "append" | "replace";
}) {
  const page = await getManagedPageContent(path);
  if (
    !page ||
    page.mode !== mode ||
    (page.status !== "published" && page.status !== "scheduled") ||
    mode === "replace"
  )
    return null;
  return (
    <div className="bg-[#f2f7fc]">
      <ContentSections page={page} />
    </div>
  );
}
