export type ArcStep = { t: string; d: string };

export type Concept = {
  id: string;
  title: string;
  area: string;
  vibe: string;
  budget: string;
  energy: string;
  stage: string;
  tint: string;
  timing: string;
  hook: string;
  arc: ArcStep[];
  spot: string;
  moment: string;
  bring: string;
  backup: string;
};

export const CONCEPTS: Concept[] = [
  {
    id: "last-light",
    title: "The Last Light on the Water",
    area: "Greenpoint",
    vibe: "Golden hour",
    budget: "$40–100",
    energy: "Low-key",
    stage: "Something new",
    tint: "#E8A06A",
    timing: "Friday, arrive by 7:10pm",
    hook: "Oysters on a dock while Manhattan catches fire across the river.",
    arc: [
      { t: "7:10", d: "A dozen cold ones and a cold bottle of something on the dock at the end of the street. No reservation — there’s never a wait this early." },
      { t: "8:14", d: "Sunset hits the glass towers across the water and the whole skyline turns molten. You will both stop mid-sentence. That’s the point." },
      { t: "9:00", d: "Walk it off along the waterfront to the little wine bar two blocks in for a nightcap and the post-mortem." },
    ],
    spot: "The end of India Street, where the ferry pier juts into the East River.",
    moment: "8:14pm. The sun drops behind Midtown and the towers go gold to pink to deep blue in about four minutes. Don’t narrate it. Watch.",
    bring: "A sweater for after sundown, and cash for the oyster guy.",
    backup: "If it’s pouring, the wine bar two blocks in has the same view through big windows and better lighting.",
  },
  {
    id: "no-phones-jazz",
    title: "Slow Jazz, No Phones",
    area: "West Village",
    vibe: "After dark",
    budget: "$40–100",
    energy: "Low-key",
    stage: "Something new",
    tint: "#9A6B8A",
    timing: "Sunday, the 9pm set",
    hook: "A basement, a stand-up bass, and a no-photos rule that does the work for you.",
    arc: [
      { t: "8:30", d: "Negronis at the bar upstairs. Tell them you’re there for the late set; they’ll seat you close." },
      { t: "9:00", d: "Downstairs. The room is dark and small and the house rule is phones away. Suddenly you’re two people in a room with a trio." },
      { t: "10:30", d: "Spill out onto the quiet streets and find the all-night slice place. Eat it standing up." },
    ],
    spot: "A below-grade jazz room off Seventh Ave South — the kind with twelve tables and a one-drink minimum.",
    moment: "The lights drop for the second song and the bassist starts something slow. Neither of you can reach for a phone. You have to be there.",
    bring: "Nothing. That’s the appeal.",
    backup: "Full house? The piano bar around the corner takes walk-ins and the crowd sings.",
  },
  {
    id: "dumpling-crawl",
    title: "The Midnight Dumpling Crawl",
    area: "Chinatown",
    vibe: "After dark",
    budget: "Under $40",
    energy: "Adventurous",
    stage: "First date",
    tint: "#C7553B",
    timing: "Late — start at 10pm",
    hook: "Three spots, one block apart, until you find the best soup dumpling in the city. Loser’s theory, winner’s treat.",
    arc: [
      { t: "10:00", d: "Spot one: the soup dumplings. Order one basket, split it, score it out of ten. No mercy." },
      { t: "10:40", d: "Spot two: the hand-pulled noodles in the window. Watch the guy do it. Order the dan dan." },
      { t: "11:20", d: "Spot three: the dessert that decides it. Black sesame soup or the egg tart from the bakery that’s somehow still open." },
    ],
    spot: "A three-stop loop between Mott, Bayard and Doyers — the bend in Doyers Street is the prettiest fifty feet in Chinatown.",
    moment: "Standing on the curve of Doyers at 11pm, full and laughing, arguing about which basket won. This is where you’ll both decide you like each other.",
    bring: "An appetite and small bills. A scoring system is encouraged.",
    backup: "Everything’s closed? The 24-hour spot on Forsyth never lets you down.",
  },
  {
    id: "rooftop-record",
    title: "Rooftop & a Record Store",
    area: "Lower East Side",
    vibe: "Golden hour",
    budget: "$40–100",
    energy: "Lively",
    stage: "Something new",
    tint: "#D98841",
    timing: "Saturday afternoon into evening",
    hook: "You each pick a record for the other, blind. Then you drink where the whole city is the wallpaper.",
    arc: [
      { t: "5:00", d: "The record shop on Orchard. Rule: you each buy one record for the other, under twenty bucks, no consulting. You don’t open the bag yet." },
      { t: "6:15", d: "Up to the rooftop bar a few blocks north. Get the corner with the water tanks in view." },
      { t: "7:30", d: "Open the bags. Defend your picks. This tells you everything." },
    ],
    spot: "A vinyl shop on Orchard Street, then a hotel rooftop with an unbothered skyline view.",
    moment: "The reveal. What someone chooses for you when they can’t ask is the most honest thing they’ll do all night.",
    bring: "Twenty dollars each, sealed. No peeking.",
    backup: "Rooftop closed for weather? The listening bar downstairs lets you play your new records.",
  },
  {
    id: "picnic-unpacked",
    title: "A Picnic You Didn’t Pack",
    area: "Prospect Heights",
    vibe: "Outdoorsy",
    budget: "Under $40",
    energy: "Low-key",
    stage: "Long-haul",
    tint: "#7E9B5F",
    timing: "Saturday, late morning",
    hook: "You shop the way you walk — one stop each, no plan — and let the park sort out the rest.",
    arc: [
      { t: "11:00", d: "Hit the market on the avenue. Each of you grabs three things for the basket, no coordinating. One has to be a surprise." },
      { t: "12:00", d: "Find the long meadow. Claim a tree. Lay it all out and discover whether you’ve assembled a feast or four kinds of cheese." },
      { t: "2:00", d: "Walk the long loop home, slow, the way you can only do on a day with nowhere to be." },
    ],
    spot: "The cheesemonger, the bakery and the wine shop on Vanderbilt, then the Long Meadow.",
    moment: "Unpacking the basket under the tree and realizing, between the two of you, you somehow nailed it. Or didn’t. Both are good stories.",
    bring: "A blanket and the surprise item. Bonus points for a thermos.",
    backup: "Rain? The same haul becomes a floor picnic at home, which is honestly the upgrade.",
  },
  {
    id: "off-season-coney",
    title: "Coney Island, Off-Season",
    area: "Coney Island",
    vibe: "Old New York",
    budget: "Under $40",
    energy: "Adventurous",
    stage: "Something new",
    tint: "#5E83A6",
    timing: "Any clear, cold afternoon",
    hook: "The boardwalk with nobody on it. You, the gulls, and a hot dog in the wind.",
    arc: [
      { t: "2:00", d: "Take the train to the end of the line. The whole way there is part of it." },
      { t: "2:45", d: "Walk the empty boardwalk. The rides are still, the light is flat and silver, and it feels like the set after everyone’s gone home." },
      { t: "3:30", d: "The original hot dog place is open year-round. Eat outside anyway, collars up." },
    ],
    spot: "The Riegelmann Boardwalk in the dead of the off-season, end to end.",
    moment: "The Wonder Wheel standing still against a white sky, the beach completely empty, and the strange romance of a fun place with no fun happening. You’ll feel like you’re getting away with something.",
    bring: "Your warmest coat and a flask of something to pass back and forth.",
    backup: "Too brutal out? The aquarium next door is gloriously warm and weirdly romantic in winter.",
  },
  {
    id: "tasting-strangers",
    title: "A Tasting Menu for Two Strangers",
    area: "Tribeca",
    vibe: "Slow & candlelit",
    budget: "Splurge",
    energy: "Low-key",
    stage: "Long-haul",
    tint: "#8A5A4A",
    timing: "An anniversary that needs the swing",
    hook: "Counter seats at the tasting place, where the only job is to be impressed together for three hours.",
    arc: [
      { t: "7:00", d: "Two seats at the counter — not a table. You want to watch the kitchen work an arm’s length away." },
      { t: "7:30", d: "The procession begins. Don’t look at the menu ahead. Let each course be a small ambush." },
      { t: "10:00", d: "The walk after a long meal, through quiet cobblestone streets, is the dessert course." },
    ],
    spot: "A counter-only tasting room in Tribeca — the kind where the chef hands you the plate himself.",
    moment: "The course that makes you both laugh in disbelief and immediately want to call someone. Don’t. Stay in it.",
    bring: "Your appetite, your good shirt, and zero plans for tomorrow morning.",
    backup: "Couldn’t get the counter? The bar menu at the same place is the whole personality for a third of the swing.",
  },
  {
    id: "met-after-hours",
    title: "The Museum, Almost Empty",
    area: "Upper East Side",
    vibe: "Artful",
    budget: "$40–100",
    energy: "Low-key",
    stage: "Something new",
    tint: "#7A6FA0",
    timing: "Friday, the late hours",
    hook: "The big museum stays open late on Fridays. Skip the blockbusters. Find the empty rooms.",
    arc: [
      { t: "7:00", d: "Go on a Friday evening when the school groups are long gone. Walk straight past whatever’s famous." },
      { t: "7:45", d: "The game: each of you leads the other to one room, one object, and explains why it wrecks you. No art degree required." },
      { t: "9:00", d: "The balcony bar with the live music, a martini, and the great hall below you." },
    ],
    spot: "The encyclopedic museum on Fifth, after dark, when the marble halls go quiet.",
    moment: "Standing alone in a gallery you have entirely to yourselves, in front of the thing one of you chose, learning something true about how the other one sees.",
    bring: "Comfortable shoes and an opinion you’re willing to defend.",
    backup: "Too crowded even late? The little Frick-style house museum nearby is hushed and intimate and never mobbed.",
  },
  {
    id: "cold-plunge",
    title: "Cold Plunge, Hot Coffee",
    area: "Williamsburg",
    vibe: "Outdoorsy",
    budget: "$40–100",
    energy: "Adventurous",
    stage: "Long-haul",
    tint: "#5E91A0",
    timing: "Saturday, first thing",
    hook: "A bathhouse, a shocking plunge, then the best coffee of your life because you earned it.",
    arc: [
      { t: "9:00", d: "Book the early slot at the bathhouse. Sauna, then the cold plunge. Daring each other in is half of it." },
      { t: "10:30", d: "Out, glowing and slightly unhinged, to the café down the block. Coffee has never tasted like this." },
      { t: "11:30", d: "A long, clear-headed walk to the water. You’ll both feel like you split a secret." },
    ],
    spot: "A Russian-style bathhouse, then a serious coffee bar two doors down.",
    moment: "The thirty seconds in the cold plunge when you’re both yelling and laughing and absolutely alive. Shared adversity, the fun kind.",
    bring: "A swimsuit, sandals, and a willingness to look undignified.",
    backup: "Fully booked? An infrared sauna studio does the same trick on a smaller scale.",
  },
  {
    id: "harlem-supper",
    title: "Supper and a Set, Uptown",
    area: "Harlem",
    vibe: "Old New York",
    budget: "$40–100",
    energy: "Lively",
    stage: "Something new",
    tint: "#B5743C",
    timing: "Sunday evening",
    hook: "Red beans, a brass band, and the kind of room that’s been good at this for ninety years.",
    arc: [
      { t: "6:30", d: "Dinner at the supper club where the food is Lowcountry and the walls are covered in history." },
      { t: "8:00", d: "Stay for the live set. This is not background music. The horns will get you out of your seat." },
      { t: "9:30", d: "Walk down to the historic blocks and let one of you point out the brownstones you’d steal." },
    ],
    spot: "A Harlem supper club with a house band and a hundred-year memory.",
    moment: "The trumpet solo that turns the whole room into one thing, and you catch each other already grinning.",
    bring: "An empty stomach and shoes you can move in.",
    backup: "Sold out for the set? The jazz church on Sunday afternoon is free, joyful and unforgettable.",
  },
  {
    id: "ferry-nowhere",
    title: "The Ferry to Nowhere",
    area: "Dumbo",
    vibe: "Golden hour",
    budget: "Under $40",
    energy: "Low-key",
    stage: "First date",
    tint: "#C98A53",
    timing: "Weekday, leave work early",
    hook: "The best cruise in New York: ride the boat for the skyline, get off for the ice cream.",
    arc: [
      { t: "5:30", d: "Catch the ferry as the light turns. Sit up top at the back — that’s where the view lives." },
      { t: "6:00", d: "Hop off under the bridge. The carousel’s spinning and the cobblestones are doing their thing." },
      { t: "6:45", d: "Ice cream from the spot in the old fireboat house, eaten on the rocks with the bridges overhead." },
    ],
    spot: "The East River ferry, then the cobblestone landing under the Brooklyn and Manhattan bridges.",
    moment: "On the water, golden hour, the skyline sliding past at boat speed, the wind doing something good to the whole evening. For the price of a coffee.",
    bring: "A light jacket — it’s windier on the water than you think.",
    backup: "Boat not running? The same view, stationary, from the pier with a slice from Old Fulton Street.",
  },
  {
    id: "flower-market",
    title: "The 6am Flower Market",
    area: "Chelsea",
    vibe: "Slow & candlelit",
    budget: "Under $40",
    energy: "Adventurous",
    stage: "Long-haul",
    tint: "#B06A7E",
    timing: "An absurdly early Saturday",
    hook: "Be the only couple awake. Buy each other flowers before the city is even up.",
    arc: [
      { t: "6:00", d: "The wholesale flower district, before the florists clear it out. Sleepy, fragrant, entirely yours." },
      { t: "6:45", d: "Each of you builds the other a bouquet from scratch. No budget talk, no logic, only what looks like the other person." },
      { t: "7:30", d: "Breakfast sandwiches and coffee on a stoop, arms full of flowers, watching the city finally wake up." },
    ],
    spot: "The 28th Street flower district at dawn, then a corner deli for the after.",
    moment: "Handing over a bouquet you built thinking only of them, on an empty sidewalk at sunrise. Try to top that.",
    bring: "An alarm you’ll obey and cash for the vendors.",
    backup: "Overslept? The greenmarket in the square has the same flowers and far better croissants.",
  },
];

export const FILTERS: Record<string, string[]> = {
  Area: ["Greenpoint", "West Village", "Chinatown", "Lower East Side", "Prospect Heights", "Coney Island", "Tribeca", "Upper East Side", "Williamsburg", "Harlem", "Dumbo", "Chelsea"],
  Vibe: ["Golden hour", "After dark", "Slow & candlelit", "Outdoorsy", "Artful", "Old New York"],
  Budget: ["Under $40", "$40–100", "Splurge"],
  Energy: ["Low-key", "Lively", "Adventurous"],
  Stage: ["First date", "Something new", "Long-haul"],
};

export function findConcept(id: string): Concept | undefined {
  return CONCEPTS.find((c) => c.id === id);
}

export function relatedTo(c: Concept): Concept[] {
  return CONCEPTS.filter((x) => x.id !== c.id && (x.vibe === c.vibe || x.area === c.area)).slice(0, 3);
}

// Three fresh concepts, rotating deterministically by calendar day.
export function getDailyThree(now: number = Date.now()): Concept[] {
  const n = CONCEPTS.length;
  const day = Math.floor(now / 86_400_000);
  const start = (day * 3) % n;
  return [0, 1, 2].map((i) => CONCEPTS[(start + i) % n]);
}
