export type DateConcept = {
  slug: string;
  title: string;
  desc: string;
  location: string;
  costEst: string;
  duration: string;
  tags: string[];
  image: string;
};

export const UNLOCK_PRICE = "$9";

export const dates: DateConcept[] = [
  {
    slug: "golden-hour-tram-ride",
    title: "Golden Hour Tram Ride",
    desc: "A slow evening that turns strangers into co-conspirators.",
    location: "Alfama",
    costEst: "€38",
    duration: "2 hours",
    tags: ["sunset", "conversation", "iconic"],
    image: "/tram.png",
  },
  {
    slug: "wine-above-the-river",
    title: "Wine Above the River",
    desc: "A rooftop pause with the city glowing beneath you.",
    location: "Graça",
    costEst: "€44",
    duration: "90 min",
    tags: ["rooftop", "wine", "views"],
    image: "/wine.png",
  },
  {
    slug: "ceramics-vermouth",
    title: "Ceramics & Vermouth",
    desc: "Make something together before the night opens up.",
    location: "Príncipe Real",
    costEst: "€52",
    duration: "2.5 hours",
    tags: ["creative", "hands-on", "intimate"],
    image: "/ceramics.png",
  },
];

export function findDate(slug: string): DateConcept | undefined {
  return dates.find((d) => d.slug === slug);
}
