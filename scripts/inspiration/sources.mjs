// Dayt Knight — inspiration sources for the engine.
//
// Two kinds: people who write about NYC dating (we learn their taste and CREDIT them),
// and local event platforms (the "this weekend" fuel — real, dated, timely). Each source
// is read as plain page text through a real browser (pinchtab), because these sites block
// plain fetch. We learn the PATTERN and remix; we never copy a post.
//
// Add a creator's own site here with their site as the credit. Instagram has no usable
// public API and isn't scraped — point at the creator's website or newsletter instead.
//
// Many of these bot-wall datacenter traffic; the harvester keeps whatever returns content
// and reports the rest honestly. We do not use Reddit.

export const SOURCES = [
  // editorial / creators
  { name: "Secret NYC", url: "https://secretnyc.co/category/things-to-do/", credit: "https://secretnyc.co" },
  { name: "Time Out New York", url: "https://www.timeout.com/newyork/things-to-do/best-date-ideas-in-nyc", credit: "https://www.timeout.com/newyork" },
  { name: "The Infatuation", url: "https://www.theinfatuation.com/new-york/guides/the-best-date-restaurants-in-nyc", credit: "https://www.theinfatuation.com/new-york" },
  { name: "Thrillist New York", url: "https://www.thrillist.com/new-york", credit: "https://www.thrillist.com/new-york" },

  // local event platforms — timely, dated, "this weekend"
  { name: "Time Out NYC — This Week", url: "https://www.timeout.com/newyork/things-to-do/things-to-do-in-new-york-this-week", credit: "https://www.timeout.com/newyork" },
  { name: "Eventbrite NYC", url: "https://www.eventbrite.com/d/ny--new-york/this-weekend/", credit: "https://www.eventbrite.com/d/ny--new-york/events/" },
  { name: "Dice NYC", url: "https://dice.fm/browse/new-york", credit: "https://dice.fm" },
  { name: "Resident Advisor NYC", url: "https://ra.co/events/us/newyork", credit: "https://ra.co" },
  { name: "Fever NYC", url: "https://feverup.com/en/new-york", credit: "https://feverup.com/en/new-york" },
];
