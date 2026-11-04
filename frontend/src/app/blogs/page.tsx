import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts } from "@/lib/blogs";
import { metadataWithSeoOverride } from "@/lib/cms";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/blogs", {
    title: "Travel Guides & Journey Tips",
    description:
      "Read practical Nashik, Maharashtra, airport and intercity travel planning guides from Vistar Cabs.",
    alternates: { canonical: "/blogs" },
  });
}

export default async function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/images/blogs.jpg"
          alt="A scenic road through Maharashtra hills"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/75 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide pb-14 pt-36 sm:pb-20">
          <p className="eyebrow text-amber-300">Vistar Cabs · travel notes</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Plan your next Maharashtra journey.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            Short, useful guides to help you prepare a local trip, airport
            transfer, intercity ride or destination visit.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-white/80">
            <BookOpen size={15} /> Practical travel information · availability
            confirmed directly
          </div>
        </div>
      </section>
      <section className="container-wide py-12 sm:py-16">
        <div className="mb-7">
          <p className="eyebrow text-amber-700">The Vistar Cabs blog</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Browse travel guides
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                    {post.publishedLabel}
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-800">
                    Read guide <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
