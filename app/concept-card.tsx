import Image from "next/image";
import Link from "next/link";
import { type DateConcept, cardGradient } from "./dates";

export default function ConceptCard({ c }: { c: DateConcept }) {
  return (
    <Link
      href={`/dates/${c.slug}`}
      className="bg-card rounded-md overflow-hidden flex flex-col group hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="aspect-[4/5] relative">
        {c.image ? (
          <Image
            src={c.image}
            alt={c.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: cardGradient(c.slug) }}
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
          <p className="mt-2 text-foreground/70 leading-relaxed">{c.desc}</p>
        </div>
        <hr className="border-foreground/10" />
        <div className="flex flex-col gap-1 text-sm text-foreground/65">
          <p>
            {c.location} · {c.duration}
          </p>
          <p>Cost est. {c.costEst}</p>
        </div>
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
        <span className="mt-1 inline-flex items-center justify-center h-11 px-5 rounded-md bg-foreground text-background font-medium group-hover:bg-foreground/90 transition-colors">
          See the date
        </span>
      </div>
    </Link>
  );
}
