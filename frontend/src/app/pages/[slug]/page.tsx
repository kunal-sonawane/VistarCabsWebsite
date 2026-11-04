import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { getPublishedCmsPage, mediaUrl } from "@/lib/cms";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedCmsPage(slug);

  if (!page) {
    return {
      title: "Page not found | Vistar Cabs",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = page.canonicalPath || `/pages/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
    },
    robots: page.noindex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPublishedCmsPage(slug);

  if (!page) {
    notFound();
  }

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
            <ArrowLeft size={14} />
            Vistar Cabs
          </Link>

          <p className="eyebrow mt-7 text-amber-300">
            Travel guide · Vistar Cabs
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {page.h1}
            <span className="text-amber-300">.</span>
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
            {page.intro}
          </p>
        </div>
      </section>

      <div className="container-wide grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-14">
        <article className="min-w-0">
          {page.sections.map((section, index) => (
            <section
              key={`${section.heading}-${index}`}
              className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
            >
              {section.imageId && (
                <Image
                  src={mediaUrl(section.imageId)}
                  alt={section.imageAlt || section.heading}
                  width={1200}
                  height={700}
                  unoptimized
                  className="mb-5 max-h-[440px] w-full rounded-xl object-cover"
                />
              )}

              <h2 className="text-2xl font-black tracking-tight">
                {section.heading}
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {section.body}
              </p>
            </section>
          ))}

          {page.faqs.length > 0 && (
            <section className="mt-10">
              <p className="eyebrow text-amber-700">Helpful answers</p>

              <h2 className="mt-2 text-2xl font-black">
                Frequently asked questions
              </h2>

              <div className="mt-3 divide-y divide-slate-200">
                {page.faqs.map((item, index) => (
                  <details
                    key={`${item.question}-${index}`}
                    className="group py-4"
                  >
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
        </article>

        <aside className="h-fit rounded-3xl bg-[#f2f7fc] p-5 sm:p-6">
          <p className="eyebrow text-amber-700">Plan a journey</p>

          <h2 className="mt-2 text-xl font-black">Need a cab connection?</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Send the route, date and callback number. Vistar Cabs will review
            the enquiry and confirm availability directly.
          </p>

          <Link
            href="/#book"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ffad22] px-4 py-3 text-sm font-black text-slate-950"
          >
            Open enquiry form
            <ArrowUpRight size={16} />
          </Link>

          <p className="mt-3 text-[11px] leading-5 text-slate-500">
            This page provides travel information and does not guarantee a
            vehicle, fare or service availability.
          </p>
        </aside>
      </div>

      <SiteFooter />
    </main>
  );
}
