import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dates, findDate, cardGradient } from "../../dates";
import ShareButton from "../../share-button";

export function generateStaticParams() {
  return dates.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = findDate(slug);
  if (!d) return { title: "Not found — Dayt Knight" };
  return {
    title: `${d.title} — Dayt Knight`,
    description: d.desc,
  };
}

export default async function DatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = findDate(slug);
  if (!d) notFound();

  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <header className="px-8 sm:px-14 pt-8 sm:pt-10">
        <Link
          href="/"
          className="inline-block text-3xl sm:text-4xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Dayt Knight
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 sm:px-12 mt-10 sm:mt-14">
        <div className="w-full max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground transition-colors"
          >
            ← Today&apos;s three
          </Link>

          <div className="mt-6 aspect-[16/10] relative rounded-md overflow-hidden bg-card">
            {d.image ? (
              <Image
                src={d.image}
                alt={d.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: cardGradient(d.slug) }}
              />
            )}
          </div>

          <h1
            className="mt-10 sm:mt-12 text-5xl sm:text-7xl tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {d.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/75 leading-relaxed max-w-2xl">
            {d.desc}
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-b border-foreground/10 py-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                Where
              </p>
              <p className="mt-1 text-base">{d.location}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                How long
              </p>
              <p className="mt-1 text-base">{d.duration}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                Cost est.
              </p>
              <p className="mt-1 text-base">{d.costEst}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                Vibe
              </p>
              <p className="mt-1 text-base">{d.energy}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-tag text-sm text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>

          <section className="mt-12 max-w-2xl">
            <h2
              className="text-2xl sm:text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The plan
            </h2>
            <ol className="mt-4 flex flex-col gap-3 text-foreground/80 leading-relaxed">
              {d.arc.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-foreground/40 tabular-nums">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 max-w-2xl rounded-md bg-card p-6 sm:p-7">
            <p className="text-xs uppercase tracking-wider text-foreground/55">
              The moment
            </p>
            <p
              className="mt-2 text-xl sm:text-2xl leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {d.moment}
            </p>
          </section>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                Bring
              </p>
              <p className="mt-1 text-base text-foreground/80 leading-relaxed">
                {d.bring}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/55">
                If it rains
              </p>
              <p className="mt-1 text-base text-foreground/80 leading-relaxed">
                {d.backup}
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pb-4">
            <ShareButton slug={d.slug} title={d.title} />
            <p className="text-sm text-foreground/60 max-w-sm">
              The whole night, handled. Send it to the person you&apos;d want there.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 sm:mt-24 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-7 flex justify-center gap-14">
          <Link
            href="/"
            className="text-foreground/85 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-foreground/85 hover:text-foreground transition-colors"
          >
            Sell a date
          </Link>
        </div>
      </footer>
    </div>
  );
}
