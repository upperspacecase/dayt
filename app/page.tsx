import Image from "next/image";

type Card = {
  title: string;
  desc: string;
  location: string;
  price: string;
  duration: string;
  tags: string[];
  image?: string;
  gradient?: string;
};

const cards: Card[] = [
  {
    title: "Golden Hour Tram Ride",
    desc: "A slow evening that turns strangers into co-conspirators.",
    location: "Alfama",
    price: "€38",
    duration: "2 hours",
    tags: ["sunset", "conversation", "iconic"],
    gradient:
      "linear-gradient(135deg, #d6a36a 0%, #a86b3c 45%, #4a2e1c 100%)",
  },
  {
    title: "Wine Above the River",
    desc: "A rooftop pause with the city glowing beneath you.",
    location: "Graça",
    price: "€44",
    duration: "90 min",
    tags: ["rooftop", "wine", "views"],
    gradient:
      "linear-gradient(135deg, #e0b67a 0%, #8a4a35 50%, #2b1a14 100%)",
  },
  {
    title: "Ceramics & Vermouth",
    desc: "Make something together before the night opens up.",
    location: "Príncipe Real",
    price: "€52",
    duration: "2.5 hours",
    tags: ["creative", "hands-on", "intimate"],
    image: "/ceramics.png",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <header className="px-8 sm:px-14 pt-8 sm:pt-10">
        <div
          className="text-3xl sm:text-4xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Dayt
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 sm:px-12 mt-14 sm:mt-20">
        <h1
          className="text-center leading-[1.05] max-w-5xl tracking-tight text-5xl sm:text-7xl font-normal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Real dates, in your city, created by people who live there.
        </h1>

        <form className="mt-10 sm:mt-14 w-full max-w-2xl flex flex-col sm:flex-row gap-3 sm:gap-4">
          <label htmlFor="city-or-email" className="sr-only">
            Enter your city or email
          </label>
          <input
            id="city-or-email"
            type="text"
            placeholder="Enter your city or email"
            className="flex-1 h-14 px-5 rounded-md bg-transparent border border-foreground/15 placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors text-base"
          />
          <button
            type="submit"
            className="h-14 px-7 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap"
          >
            Show me one.
          </button>
        </form>

        <section className="mt-16 sm:mt-24 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="bg-card rounded-md overflow-hidden flex flex-col"
            >
              <div
                className="aspect-[4/5] relative"
                style={c.gradient ? { background: c.gradient } : undefined}
              >
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6 sm:p-7 flex flex-col gap-4">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <hr className="border-foreground/10" />
                <p className="text-sm text-foreground/65">
                  {c.location} · {c.price} · {c.duration}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-tag text-sm text-foreground/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <p className="mt-14 sm:mt-20 text-foreground/65 text-base">
          Curated by <em className="italic">47 locals</em> in Lisbon.
        </p>
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
