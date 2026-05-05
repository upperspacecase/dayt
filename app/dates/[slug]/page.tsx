import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dates, findDate, UNLOCK_PRICE } from "../../dates";

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
  if (!d) return { title: "Not found — Dayt" };
  return {
    title: `${d.title} — Dayt`,
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
          Dayt
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 sm:px-12 mt-10 sm:mt-14">
        <div className="w-full max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground transition-colors"
          >
            ← All concepts
          </Link>

          <div className="mt-6 aspect-[16/10] relative rounded-md overflow-hidden bg-card">
            <Image
              src={d.image}
              alt={d.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
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

          <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl border-t border-b border-foreground/10 py-5">
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
              What you unlock
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-foreground/80 leading-relaxed">
              <li>The exact spot, the door, the right hour to arrive.</li>
              <li>What to order, what to bring, what to skip.</li>
              <li>Three conversation prompts the locals swear by.</li>
              <li>A backup plan if the weather turns.</li>
            </ul>
          </section>

          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pb-4">
            <button
              type="button"
              className="h-14 px-8 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-base"
            >
              Unlock for {UNLOCK_PRICE}
            </button>
            <p className="text-sm text-foreground/60 max-w-sm">
              One-time. No account. The full plan lands in your inbox as a link
              you can open any time.
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
