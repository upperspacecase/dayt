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
    desc: "The cable car climbs over the East River as the skyline catches fire.",
    location: "Roosevelt Island",
    costEst: "$24",
    duration: "2 hours",
    tags: ["sunset", "skyline", "iconic"],
    image: "/tram.png",
  },
  {
    slug: "wine-above-the-city",
    title: "Wine Above the City",
    desc: "A rooftop pour with Manhattan glittering below you.",
    location: "Williamsburg",
    costEst: "$45",
    duration: "90 min",
    tags: ["rooftop", "wine", "skyline views"],
    image: "/wine.png",
  },
  {
    slug: "ceramics-and-cocktails",
    title: "Ceramics & Cocktails",
    desc: "Throw a wobbly bowl together, then toast it two doors down.",
    location: "Greenpoint",
    costEst: "$60",
    duration: "2.5 hours",
    tags: ["creative", "hands-on", "playful"],
    image: "/ceramics.png",
  },
];

export function findDate(slug: string): DateConcept | undefined {
  return dates.find((d) => d.slug === slug);
}
