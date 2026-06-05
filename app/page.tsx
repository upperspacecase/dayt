import Link from "next/link";
import { getDailyThree } from "./dates";
import { subscribe } from "./actions";
import ConceptCard from "./concept-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const subscribed = params.subscribed === "1";
  const errored = typeof params.error !== "undefined";
  const today = getDailyThree();

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

      <main className="flex-1 flex flex-col items-center px-6 sm:px-12 mt-14 sm:mt-20">
        {subscribed && (
          <div className="mb-8 w-full max-w-2xl rounded-md border border-foreground/20 bg-card px-5 py-4 text-center text-base">
            You&apos;re in. Three fresh New York dates land in your inbox, starting tomorrow.
          </div>
        )}
        {errored && (
          <div className="mb-8 w-full max-w-2xl rounded-md border border-foreground/20 bg-card px-5 py-4 text-center text-base">
            That didn&apos;t go through. Mind trying again?
          </div>
        )}

        <h1
          className="text-center leading-[1.05] max-w-5xl tracking-tight text-5xl sm:text-7xl font-normal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Three New York date ideas. New each day. Free.
        </h1>
        <p className="mt-5 sm:mt-6 text-center text-lg sm:text-xl text-foreground/70 max-w-2xl leading-relaxed">
          The whole night, planned. Real spots from people who live here. No admin,
          no account.
        </p>

        <form
          action={subscribe}
          className="mt-10 sm:mt-12 w-full max-w-2xl flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <label htmlFor="email" className="sr-only">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 h-14 px-5 rounded-md bg-transparent border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors text-base"
          />
          <button
            type="submit"
            className="h-14 px-7 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap"
          >
            Email me the daily three
          </button>
        </form>
        <p className="mt-4 text-sm text-foreground/55">
          New each day. Unsubscribe anytime.
        </p>

        <section className="mt-16 sm:mt-24 w-full max-w-6xl">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-5xl tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tonight in New York
            </h2>
            <p className="mt-3 text-foreground/70 leading-relaxed text-base sm:text-lg">
              Three fresh dates, new each day. Open one, send it to someone you&apos;d
              do it with.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {today.map((c) => (
              <ConceptCard key={c.slug} c={c} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/club"
              className="inline-flex items-center gap-2 text-foreground/85 hover:text-foreground transition-colors text-lg"
            >
              See the whole library →
            </Link>
          </div>
        </section>

        <p className="mt-14 sm:mt-20 text-foreground/65 text-base">
          Written by New Yorkers who go on these dates.
        </p>

        <section className="mt-14 sm:mt-20 w-full max-w-6xl bg-card rounded-md p-8 sm:p-12">
          <div className="max-w-3xl">
            <h2
              className="text-3xl sm:text-5xl tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Create a date concept.
            </h2>
            <p className="mt-3 sm:mt-4 text-foreground/70 leading-relaxed text-base sm:text-lg">
              You know a corner of this city worth someone&apos;s evening. Share it.
              Earn when people book it.
            </p>
          </div>

          <form className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="concept-title" className="text-sm text-foreground/75">
                Concept title
              </label>
              <input
                id="concept-title"
                type="text"
                placeholder="e.g. Sunrise over the East River"
                className="h-12 px-4 rounded-md bg-background border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="concept-desc" className="text-sm text-foreground/75">
                What happens
              </label>
              <textarea
                id="concept-desc"
                rows={4}
                placeholder="Two people, one evening. What do they do?"
                className="px-4 py-3 rounded-md bg-background border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="concept-city" className="text-sm text-foreground/75">
                City
              </label>
              <input
                id="concept-city"
                type="text"
                placeholder="Brooklyn"
                className="h-12 px-4 rounded-md bg-background border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="concept-email" className="text-sm text-foreground/75">
                Your email
              </label>
              <input
                id="concept-email"
                type="email"
                placeholder="you@example.com"
                className="h-12 px-4 rounded-md bg-background border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
              />
            </div>

            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                className="h-12 px-7 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                Submit your concept
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="mt-14 sm:mt-20 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-7 flex justify-center gap-14">
          <a
            href="#"
            className="text-foreground/85 hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-foreground/85 hover:text-foreground transition-colors"
          >
            Sell a date
          </a>
        </div>
      </footer>
    </div>
  );
}
