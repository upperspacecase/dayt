export type DateConcept = {
  slug: string;
  title: string;
  desc: string;
  location: string;
  costEst: string;
  duration: string;
  energy: string;
  stage: string;
  tags: string[];
  arc: string[];
  moment: string;
  bring: string;
  backup: string;
  image?: string;
};

export const dates: DateConcept[] = [
  {
    slug: "golden-hour-tram-ride",
    title: "Golden Hour Tram Ride",
    desc: "The cable car climbs over the East River as the skyline catches fire.",
    location: "Roosevelt Island",
    costEst: "~$10",
    duration: "2 hours",
    energy: "Low-key",
    stage: "Either",
    tags: ["sunset", "skyline", "iconic"],
    arc: [
      "Meet at 59th & 2nd and grab two coffees on the way.",
      "Take the 7:40 tram so you lift off as the sun drops.",
      "On the island, walk south to the lighthouse with the skyline at your back.",
      "Ride back once the city lights come on.",
    ],
    moment:
      "That first half-minute when the car leaves the ground and nobody says anything. Let it be quiet.",
    bring: "Two coffees and an OMNY-ready phone ($2.90 a ride).",
    backup:
      "If it's pouring, the tram still runs. Ride it both ways and watch the rain move over the river.",
    image: "/tram.png",
  },
  {
    slug: "rooftop-wine-williamsburg",
    title: "Wine Above the City",
    desc: "A rooftop pour with Manhattan glittering across the water.",
    location: "Williamsburg",
    costEst: "~$60",
    duration: "90 min",
    energy: "Low-key",
    stage: "Either",
    tags: ["rooftop", "wine", "skyline views"],
    arc: [
      "Get there before sunset to claim a west-facing spot.",
      "Order one bottle, not two glasses. Sharing a bottle is its own small commitment.",
      "Watch the light go from gold to blue over the skyline.",
    ],
    moment:
      "When the skyline lights flick on, ask what they'd do with a year that couldn't fail.",
    bring: "A light layer. It's cooler up high.",
    backup:
      "If the roof's closed for weather, drop to a candlelit wine bar on Wythe and keep the one-bottle rule.",
    image: "/wine.png",
  },
  {
    slug: "ceramics-and-cocktails",
    title: "Ceramics & Cocktails",
    desc: "Throw a wobbly bowl together, then toast it two doors down.",
    location: "Greenpoint",
    costEst: "~$70",
    duration: "2.5 hours",
    energy: "Hands-on",
    stage: "Either",
    tags: ["creative", "hands-on", "playful"],
    arc: [
      "Book a beginner wheel-throwing session ahead of time.",
      "Make a mess. The point is laughing, not the bowl.",
      "Walk to a nearby bar and toast the ugliest thing you made.",
    ],
    moment:
      "Hands covered in clay, both of you bad at it. Being beginners together pulls people closer than being impressive ever does.",
    bring: "Clothes you don't mind ruining.",
    backup: "If the studio's booked out, a paint-your-own night does the same job.",
    image: "/ceramics.png",
  },
  {
    slug: "ferry-skyline-at-night",
    title: "The Midnight Ferry",
    desc: "A free boat past the Statue of Liberty with the skyline behind you.",
    location: "Lower Manhattan to Staten Island",
    costEst: "Free–$15",
    duration: "2 hours",
    energy: "Low-key",
    stage: "New",
    tags: ["free", "skyline", "on the water"],
    arc: [
      "Catch the Staten Island Ferry from Whitehall Terminal after dark.",
      "Stand at the back rail for the skyline, the front for the Statue.",
      "Get off, find a slice on Staten Island, ride straight back.",
    ],
    moment:
      "At the rail with the wind and the lights, conversation comes easy. The view does the work for you.",
    bring: "A jacket. It's windy out on the water.",
    backup: "Rain? Stay on the enclosed deck. The views still hold.",
  },
  {
    slug: "museum-then-a-question",
    title: "One Room, One Drink",
    desc: "Skip the whole museum. Pick one room each, then a drink to argue about it.",
    location: "Upper East Side",
    costEst: "~$40",
    duration: "2 hours",
    energy: "Low-key",
    stage: "Either",
    tags: ["art", "conversation", "curious"],
    arc: [
      "At the Met, split up for twenty minutes. Each of you finds the one piece you'd hang in your home.",
      "Bring each other to your pick and say why.",
      "Leave, find a bar, keep arguing about it.",
    ],
    moment:
      "What someone chooses tells you more about them than an hour of small talk.",
    bring: "Nothing. It's pay-what-you-wish for NY, NJ, and CT residents.",
    backup: "Any museum works. The Whitney, the Frick, the Noguchi out in Queens.",
  },
  {
    slug: "split-everything-food-crawl",
    title: "Split Everything",
    desc: "A food crawl with one rule: you each pick, you both share.",
    location: "Williamsburg or Chinatown",
    costEst: "~$50",
    duration: "2 hours",
    energy: "Active",
    stage: "New",
    tags: ["food", "walking", "playful"],
    arc: [
      "Set a budget and one rule: each pick gets split, no exceptions.",
      "Take turns choosing. They pick, you pick, repeat.",
      "Rank your finds on the walk home.",
    ],
    moment:
      "Handing someone a bite of the thing you were excited about is a tiny act of generosity that reads as warmth.",
    bring: "Cash and an appetite.",
    backup: "Off-season? Run the same game through a food hall or Chinatown.",
  },
  {
    slug: "garden-walk-golden-hour",
    title: "The Long Walk",
    desc: "A slow garden loop at golden hour, phones in pockets.",
    location: "Prospect Heights",
    costEst: "~$25",
    duration: "90 min",
    energy: "Low-key",
    stage: "Together a while",
    tags: ["outdoors", "calm", "reconnect"],
    arc: [
      "Go to the Brooklyn Botanic Garden an hour before close, when the crowds thin.",
      "Phones away. That's the deal.",
      "Walk slow. Let the silences sit.",
    ],
    moment:
      "Ask the one you don't usually ask: what's something you've wanted to try and never told me?",
    bring: "Nothing but your attention.",
    backup: "Winter? The conservatory glasshouses stay warm and green.",
  },
  {
    slug: "coney-island-off-season",
    title: "Off-Season Coney",
    desc: "The boardwalk in the cold, mostly empty, oddly romantic.",
    location: "Coney Island",
    costEst: "~$30",
    duration: "3 hours",
    energy: "Active",
    stage: "Either",
    tags: ["nostalgic", "walking", "oddball"],
    arc: [
      "Take the train to the end of the line.",
      "Walk the empty boardwalk and split a hot dog and a funnel cake.",
      "Dare each other onto whatever ride is running.",
    ],
    moment:
      "A little cold and a little adrenaline makes the whole thing feel like a memory you're making on purpose.",
    bring: "Warm layers.",
    backup: "Summer version: do it late at night to skip the crowds.",
  },
  {
    slug: "the-cloisters-escape",
    title: "A Different Century",
    desc: "A medieval monastery at the top of Manhattan, with the Hudson below.",
    location: "Washington Heights",
    costEst: "~$30",
    duration: "3 hours",
    energy: "Low-key",
    stage: "Either",
    tags: ["escape", "quiet", "romantic"],
    arc: [
      "Take the A train all the way up. The trip is part of it.",
      "Wander the cloister gardens and the unicorn tapestries.",
      "Picnic in Fort Tryon Park after, river view.",
    ],
    moment:
      "It feels like leaving the city without leaving. The shared sense of escape does the bonding.",
    bring: "A picnic for the park.",
    backup: "Rain stays inside the museum. Skip the park leg.",
  },
  {
    slug: "small-room-jazz",
    title: "A Small Dark Room",
    desc: "Live jazz close enough to feel the bass in your chest.",
    location: "West Village",
    costEst: "~$80",
    duration: "2 hours",
    energy: "Low-key",
    stage: "Either",
    tags: ["music", "intimate", "classic"],
    arc: [
      "Book the early set. It's calmer and easier to talk after.",
      "Sit close to the stage.",
      "Get a nightcap nearby and trade what the music made you think about.",
    ],
    moment:
      "You don't have to talk during the set. Shared attention is its own kind of closeness.",
    bring: "A reservation. The good rooms fill up.",
    backup: "No seats? A piano bar in the Village runs late.",
  },
  {
    slug: "sunrise-brooklyn-bridge",
    title: "Beat the City Awake",
    desc: "The Brooklyn Bridge at sunrise, before anyone else is on it.",
    location: "Brooklyn Bridge",
    costEst: "~$20",
    duration: "2 hours",
    energy: "Active",
    stage: "New",
    tags: ["sunrise", "rare", "memorable"],
    arc: [
      "Set an absurd alarm. Meet on the Brooklyn side before dawn.",
      "Walk toward Manhattan as the sky goes pink.",
      "Reward yourselves with breakfast and coffee down in the Seaport.",
    ],
    moment:
      "Doing something a little ridiculous together, like being awake for this, bonds people fast.",
    bring: "Coffee for the walk and a warm layer.",
    backup: "Overcast? The empty bridge is still worth it. Lean into the moody version.",
  },
  {
    slug: "comedy-and-a-slice",
    title: "Laugh First",
    desc: "A tiny comedy club, then a late slice to recap your favorite bits.",
    location: "Greenwich Village",
    costEst: "~$70",
    duration: "2.5 hours",
    energy: "Low-key",
    stage: "New",
    tags: ["comedy", "easy", "fun"],
    arc: [
      "Reserve a late show. They're looser and busier.",
      "Sit together near the middle.",
      "After, grab a slice and rank the comics.",
    ],
    moment:
      "Laughing together is a shortcut. Shared laughter syncs people up before you've said anything real.",
    bring: "A reservation and a two-drink-minimum budget.",
    backup: "Sold out? An open mic is rougher and somehow more fun.",
  },
];

export function findDate(slug: string): DateConcept | undefined {
  return dates.find((d) => d.slug === slug);
}

// Three fresh concepts, deterministic per calendar day, rotating through the library.
export function getDailyThree(now: number = Date.now()): DateConcept[] {
  const n = dates.length;
  const epochDay = Math.floor(now / 86_400_000);
  const stride = Math.max(1, Math.floor(n / 3));
  const idxs: number[] = [];
  let i = epochDay % n;
  while (idxs.length < 3) {
    if (!idxs.includes(i)) idxs.push(i);
    i = (i + stride) % n;
    if (idxs.length < 3 && idxs.includes(i)) i = (i + 1) % n;
  }
  return idxs.map((idx) => dates[idx]);
}

// Stable soft gradient for concepts without a photo. Editorial, cream-friendly.
export function cardGradient(slug: string): string {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `linear-gradient(135deg, hsl(${h} 38% 84%), hsl(${(h + 38) % 360} 44% 73%))`;
}
