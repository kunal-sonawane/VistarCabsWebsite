export const site = {
  name: "Vistar Cabs",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_PRIMARY_PHONE || "8485884417",
  secondaryPhone: process.env.NEXT_PUBLIC_SECONDARY_PHONE || "8788373586",
  tertiaryPhone: process.env.NEXT_PUBLIC_TERTIARY_PHONE || "8485884417",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918767613575").replace(
    /\D/g,
    "",
  ),
  email: "infovistarcabs@gmail.com",
  address:
    "VISTAR CABS, SHOP NO. 2, DIVYA SWAPNA, OPPOSITE NIRGUDE HOSPITAL, JAIL ROAD, NASHIK ROAD, NASHIK.",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://share.google/drNYhoiOVwR7HExG3",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://www.linkedin.com/in/vistar-cabs-7965b9448/",
  demoContacts: process.env.NODE_ENV !== "production",
  apiUrl: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
    /\/$/,
    "",
  ),
  description:
    "Plan local, intercity and airport cab enquiries from Nashik across Maharashtra with Vistar Cabs.",
};

export function getApiUrl() {
  const configured = process.env.NEXT_PUBLIC_API_URL;
  // In production, route browser requests through the Next.js rewrite. This
  // keeps admin session cookies first-party even when the API has another host.
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    configured
  )
    return "";
  if (configured) {
    try {
      const url = new URL(configured);
      if (
        typeof window !== "undefined" &&
        (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
        window.location.hostname !== "localhost" &&
        window.location.hostname !== "127.0.0.1"
      )
        return `http://${window.location.hostname}:5000`;
      return configured.replace(/\/$/, "");
    } catch {
      return configured.replace(/\/$/, "");
    }
  }
  if (typeof window !== "undefined")
    return `http://${window.location.hostname}:5000`;
  return "http://localhost:5000";
}

export const cities = [
  {
    name: "Nashik",
    slug: "nashik",
    detail: "Vistar Cabs’ home base for journeys across north Maharashtra.",
    tag: "Home city",
    intro:
      "Start in Nashik and plan a local ride or a longer journey across Maharashtra. Ask about Sinnar, Nashik Road, Panchavati, Trimbakeshwar, Anjaneri, Igatpuri, vineyards and other nearby destinations. Share your pickup point and stops so availability can be confirmed.",
    places: [
      "Panchavati and Ramkund",
      "Trimbakeshwar",
      "Anjaneri hills",
      "Sinnar",
      "Nashik Road",
      "Igatpuri and vineyard district",
      "Pandavleni Caves",
    ],
    airport: "Nashik Airport (Ozar)",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    detail:
      "A major city connection for business, family and airport journeys.",
    tag: "City connection",
    intro:
      "Enquire about Mumbai pickups, Nashik–Mumbai travel, Thane and nearby places, and transfers to either Mumbai airport. Share the neighbourhood, airport and terminal so the team can confirm availability.",
    places: [
      "South Mumbai and Fort",
      "Bandra and western suburbs",
      "Thane",
      "Navi Mumbai",
      "Matheran",
      "Mumbai CSMIA (BOM)",
      "Navi Mumbai International Airport (NMI)",
    ],
    airport: "Mumbai CSMIA and Navi Mumbai International Airport",
  },
  {
    name: "Pune",
    slug: "pune",
    detail:
      "An education, business and heritage city linked to Nashik by road.",
    tag: "City connection",
    intro:
      "Use this page to plan a Pune pickup, a Nashik–Pune enquiry, an airport connection or a nearby visit. Ask about Lonavala, Bhimashankar and Mahabaleshwar, and share the area and schedule for an availability check.",
    places: [
      "Shivajinagar and central Pune",
      "Hinjawadi and west Pune",
      "Pune Airport",
      "Lonavala",
      "Bhimashankar",
      "Mahabaleshwar",
    ],
    airport: "Pune Airport",
  },
  {
    name: "Chhatrapati Sambhajinagar",
    slug: "sambhajinagar",
    detail:
      "A regional city connection for heritage, pilgrimage and airport journeys.",
    tag: "Regional connection",
    intro:
      "Enquire about travel between Nashik and Chhatrapati Sambhajinagar, local pickups or a connection to the city airport. Exact pickup points, stops and service availability are confirmed directly.",
    places: [
      "Bibi Ka Maqbara",
      "Panchakki",
      "Ellora Caves",
      "Ajanta Caves",
      "Chhatrapati Sambhajinagar Airport",
    ],
    airport: "Chhatrapati Sambhajinagar Airport (IXU)",
  },
  {
    name: "Ahilyanagar",
    slug: "ahilyanagar",
    detail:
      "A regional stop between Nashik and destinations across Maharashtra.",
    tag: "Regional connection",
    intro:
      "Share your origin, destination, date and planned stops to ask about an Ahilyanagar journey. Local and intercity arrangements depend on the exact route and confirmed availability.",
    places: [
      "Ahmednagar Fort",
      "Meherabad",
      "Shani Shingnapur route",
      "Bhandardara",
      "Local city pickups",
    ],
    airport:
      "Airport connections are arranged by request; confirm the airport and route.",
  },
  {
    name: "Shirdi",
    slug: "shirdi",
    detail: "A pilgrimage destination with road and airport journey enquiries.",
    tag: "Pilgrimage connection",
    intro:
      "Plan a road journey to Shirdi or ask about pickup and drop arrangements connected with Shirdi Airport. Confirm the airport, date, vehicle and availability with Vistar Cabs before travel.",
    places: [
      "Shri Sai Baba Samadhi Mandir",
      "Dwarkamai",
      "Chavadi",
      "Shirdi Airport",
    ],
    airport: "Shirdi Airport (SAG)",
  },
];

export const routes = [
  {
    from: "Nashik",
    to: "Pune",
    slug: "nashik-to-pune-cab",
    note: "Intercity journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "The Nashik–Pune road journey is commonly planned via Sinnar, Sangamner, Narayangaon and Chakan. The distance is approximately 210 km and a drive often takes around 4–5 hours, but the actual route and duration vary with the pickup and drop addresses, traffic, weather and stops. Request a one-way or return trip by sharing your date, pickup point and Pune destination. Vistar Cabs confirms availability and fare directly; no fixed fare or arrival time is promised on this page.",
  },
  {
    from: "Nashik",
    to: "Mumbai",
    slug: "nashik-to-mumbai-cab",
    note: "City and airport connections",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Plan the Nashik–Mumbai journey with your exact Nashik pickup and Mumbai neighbourhood or airport terminal. The commonly used road corridor passes through Igatpuri and Kasara toward Shahapur and Thane; the route and journey time depend on your addresses, traffic, weather and stops. For airport transfers, include the airport, terminal, flight number and scheduled time. Share your date and whether you need a one-way or return journey; Vistar Cabs will confirm the available arrangement and fare.",
  },
  {
    from: "Nashik",
    to: "Sambhajinagar",
    slug: "nashik-to-sambhajinagar-cab",
    note: "Regional intercity enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Nashik to Chhatrapati Sambhajinagar, tell us whether you are travelling to the city, the airport, or onward to a heritage destination such as Ellora or Ajanta. These are separate onward plans, so provide the exact addresses, date, and any stops. Confirm site access with the relevant authority and cab availability with Vistar Cabs.",
  },
  {
    from: "Nashik",
    to: "Ahilyanagar",
    slug: "nashik-to-ahilyanagar-cab",
    note: "Regional journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Nashik to Ahilyanagar, share the exact pickup and drop areas rather than only the city names. If you are visiting a destination such as Shani Shingnapur or Bhandardara, list it as a planned stop and explain whether you need a one-way or return trip. The team will review the full route and date.",
  },
  {
    from: "Nashik",
    to: "Shirdi",
    slug: "nashik-to-shirdi-cab",
    note: "Pilgrimage and airport connections",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Nashik to Shirdi, specify whether your destination is the temple area, your accommodation, or Shirdi Airport. Include your travel date, pickup point, stop list, and return preference so the team can review the request. Temple access and visit timing should be checked separately with the relevant authority.",
  },
  {
    from: "Pune",
    to: "Nashik",
    slug: "pune-to-nashik-cab",
    note: "Return and pickup enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Pune to Nashik, name the Pune neighbourhood, hotel, office, or airport pickup point and the exact Nashik destination. Share the departure date and time, plus any planned stops or return needs. The team confirms availability and fare for the specific addresses.",
  },
  {
    from: "Mumbai",
    to: "Nashik",
    slug: "mumbai-to-nashik-cab",
    note: "City and airport pickup requests",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Mumbai to Nashik, identify the Mumbai neighbourhood or airport terminal and the exact Nashik drop address. If you are connecting from a flight, include its scheduled time and allow a suitable arrival buffer. Share any stops and return preference; actual travel time depends on traffic and the selected route.",
  },
  {
    from: "Mumbai",
    to: "Pune",
    slug: "mumbai-to-pune-cab",
    note: "Metro-to-metro journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Mumbai to Pune, provide the specific pickup neighbourhood and Pune destination, not just the city names. A business address, hotel, home, or airport terminal can change the pickup plan. Add your date, preferred departure time, stop list, and return requirement for a clear quote request.",
  },
  {
    from: "Pune",
    to: "Mumbai",
    slug: "pune-to-mumbai-cab",
    note: "Metro-to-metro journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Pune to Mumbai, share the exact Pune pickup and Mumbai destination. If the drop is at an airport, name the airport and terminal and include your flight time; otherwise give the neighbourhood or full address. Add the travel date, preferred pickup time, and any planned stops.",
  },
  {
    from: "Pune",
    to: "Chhatrapati Sambhajinagar",
    slug: "pune-to-sambhajinagar-cab",
    note: "Regional city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Pune to Chhatrapati Sambhajinagar, specify the city address or airport and whether you plan to continue to Ellora, Ajanta, or another stop. Share the date, pickup time, and one-way or return requirement. Confirm visitor access and opening information with the relevant sites.",
  },
  {
    from: "Chhatrapati Sambhajinagar",
    to: "Pune",
    slug: "sambhajinagar-to-pune-cab",
    note: "Regional city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Chhatrapati Sambhajinagar to Pune, provide the exact city or airport pickup and your destination area in Pune. Mention any scheduled arrival, time-sensitive appointment, additional stop, or return leg so the request can be assessed against your schedule.",
  },
  {
    from: "Chhatrapati Sambhajinagar",
    to: "Ahilyanagar",
    slug: "sambhajinagar-to-ahilyanagar-cab",
    note: "Regional intercity enquiry",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Chhatrapati Sambhajinagar to Ahilyanagar, give the exact pickup and destination addresses and list any heritage, pilgrimage, or family stops you want to include. A stop can affect the route and timing, so include it in the original enquiry with your date and preferred pickup time.",
  },
  {
    from: "Ahilyanagar",
    to: "Chhatrapati Sambhajinagar",
    slug: "ahilyanagar-to-sambhajinagar-cab",
    note: "Regional intercity enquiry",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Ahilyanagar to Chhatrapati Sambhajinagar, share the pickup address, destination locality, date, and the time you hope to arrive. If you are travelling onward to an airport or heritage site, name it clearly and include any stops or return plan.",
  },
  {
    from: "Ahilyanagar",
    to: "Shirdi",
    slug: "ahilyanagar-to-shirdi-cab",
    note: "Pilgrimage area connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Ahilyanagar to Shirdi, tell us whether you are travelling to the temple area, accommodation, or airport. Include the exact pickup, planned arrival time, date, and any other stops. If you need a return journey, include when you expect to leave Shirdi.",
  },
  {
    from: "Shirdi",
    to: "Ahilyanagar",
    slug: "shirdi-to-ahilyanagar-cab",
    note: "Regional connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Shirdi to Ahilyanagar, include your pickup point near the temple or accommodation and the exact destination address. Share your preferred departure time, travel date, additional stops, and whether the trip is one-way or includes a return.",
  },
  {
    from: "Mumbai",
    to: "Shirdi",
    slug: "mumbai-to-shirdi-cab",
    note: "City to pilgrimage destination",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Mumbai to Shirdi, specify the Mumbai pickup locality or airport, your Shirdi destination, and preferred arrival window. Pilgrimage visits may involve a separate return plan or additional stops; list these with your date so the team can review the full request. Check current temple guidance before travel.",
  },
  {
    from: "Shirdi",
    to: "Mumbai",
    slug: "shirdi-to-mumbai-cab",
    note: "Pilgrimage to city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "For Shirdi to Mumbai, provide your Shirdi pickup point, exact Mumbai destination, and preferred departure time. If you are travelling to an airport, include its name, terminal, and flight time; leave a suitable buffer for traffic. Add any stops or return needs when you send the enquiry.",
  },
];

export const airports = [
  {
    slug: "nashik-ozar",
    name: "Nashik Airport (Ozar)",
    city: "Nashik",
    code: "ISK",
    description:
      "Ask about a pickup or drop connected with Nashik Airport at Ozar. Include your flight number, terminal information, arrival or departure time and exact address so the transfer can be reviewed.",
  },
  {
    slug: "mumbai-csmia",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    code: "BOM",
    description:
      "Plan an airport transfer to or from Mumbai CSMIA. Include the terminal, flight details, pickup neighbourhood and time buffer you need. Availability and waiting arrangements must be confirmed.",
  },
  {
    slug: "navi-mumbai-airport",
    name: "Navi Mumbai International Airport",
    city: "Mumbai",
    code: "NMI",
    description:
      "Ask about a transfer to or from Navi Mumbai International Airport. Include the terminal, flight details, pickup neighbourhood and time buffer; confirm service availability directly.",
  },
  {
    slug: "pune-airport",
    name: "Pune Airport",
    city: "Pune",
    code: "PNQ",
    description:
      "Enquire about a Pune Airport pickup or drop. Provide the terminal, flight number, flight time and destination address when requesting an arrangement.",
  },
  {
    slug: "sambhajinagar-airport",
    name: "Chhatrapati Sambhajinagar Airport",
    city: "Chhatrapati Sambhajinagar",
    code: "IXU",
    description:
      "Share your flight details, pickup or drop address, date and passenger count for an airport transfer enquiry in Chhatrapati Sambhajinagar.",
  },
  {
    slug: "shirdi-airport",
    name: "Shirdi Airport",
    city: "Shirdi",
    code: "SAG",
    description:
      "Ask about a transfer to or from Shirdi Airport. Include flight timing, accommodation or temple-area destination, date and passenger details.",
  },
];


export const airportEditorialContent: Record<string, { title: string; intro: string; items: { title: string; copy: string }[] }> = {
  "nashik-ozar": {
    "title": "Nashik Airport (Ozar) cab connections",
    "intro": "Ozar Airport and Nashik city are separate pickup locations. Give the exact airport or city address and flight schedule; verify current passenger flights and pickup arrangements for your date.",
    "items": [
      {
        "title": "Airport to Nashik city",
        "copy": "Share the full address or neighbourhood and scheduled landing time. Confirm the meeting point and availability before travel."
      },
      {
        "title": "Nashik Road station connection",
        "copy": "If the trip also involves Nashik Road station, provide the train schedule and list airport and station stops in order."
      },
      {
        "title": "Temple-area onward travel",
        "copy": "For Trimbakeshwar or Panchavati, name the destination and whether you need a direct drop, waiting or return. Check visitor guidance separately."
      },
      {
        "title": "Longer Maharashtra route",
        "copy": "For Pune, Mumbai, Shirdi or another destination, provide the full address, date and return or overnight needs."
      }
    ]
  },
  "mumbai-csmia": {
    "title": "Plan a Mumbai CSMIA taxi transfer",
    "intro": "Mumbai CSMIA serves different city areas and onward routes. Use the airport and terminal shown on your ticket, then share the flight schedule and exact address.",
    "items": [
      {
        "title": "Arrival to a Mumbai neighbourhood",
        "copy": "Name the suburb, hotel, office or building and a practical drop address. Check pickup instructions for your terminal."
      },
      {
        "title": "Departure pickup from the city",
        "copy": "Provide the full pickup address, flight time and terminal. Allow a traffic buffer and confirm the pickup window."
      },
      {
        "title": "CSMIA or Navi Mumbai Airport",
        "copy": "Do not assume the two airports are interchangeable. Confirm the airport on your ticket and airline information."
      },
      {
        "title": "Continue to Pune, Nashik or beyond",
        "copy": "Include destination, flight arrival time, luggage and planned stops or return needs for an intercity trip."
      }
    ]
  },
  "navi-mumbai-airport": {
    "title": "Plan a Navi Mumbai Airport transfer",
    "intro": "Use the exact airport named by your airline and verify current passenger-flight and terminal details for your date. Include the flight schedule, pickup direction and onward address.",
    "items": [
      {
        "title": "Confirm the airport first",
        "copy": "Check your ticket and airline updates to distinguish Navi Mumbai International Airport from Mumbai CSMIA. Verify current operations and terminal details."
      },
      {
        "title": "Navi Mumbai area pickup or drop",
        "copy": "Specify the node, sector, building or meeting point and whether you travel to or from the airport."
      },
      {
        "title": "Mumbai Metropolitan Region",
        "copy": "If continuing to Thane, Mumbai or another regional area, provide the complete drop address."
      },
      {
        "title": "Long-distance connection",
        "copy": "For Pune, Nashik or another city, include arrival details, stops, passenger count and return or overnight needs."
      }
    ]
  },
  "pune-airport": {
    "title": "Pune Airport taxi and cab connections",
    "intro": "A Pune Airport enquiry should identify the correct terminal or meeting point and exact city destination. Flight timing, traffic and the address at the other end shape the pickup plan.",
    "items": [
      {
        "title": "Airport to Pune neighbourhoods",
        "copy": "Provide the exact destination in Viman Nagar, Kharadi, Hadapsar, Hinjawadi or another locality. Add building or campus entry details."
      },
      {
        "title": "Pickup for a departing flight",
        "copy": "Share your home, office or hotel address, flight time and terminal. Confirm a suitable pickup window with traffic in mind."
      },
      {
        "title": "Airport and railway station",
        "copy": "If you need both Pune Airport and the railway station, provide each arrival or departure time and stop order."
      },
      {
        "title": "Outstation from Pune Airport",
        "copy": "For Nashik, Mumbai, Lonavala or another destination, share the final address, arrival time, luggage and return needs."
      }
    ]
  },
  "sambhajinagar-airport": {
    "title": "Chhatrapati Sambhajinagar Airport cab planning",
    "intro": "For IXU, share flight details, date, meeting point and destination address. If the transfer continues to a heritage site, describe that as a separate stop or journey.",
    "items": [
      {
        "title": "Airport to the city",
        "copy": "Name your hotel, home, railway station or city landmark and provide a clear address or meeting point."
      },
      {
        "title": "Bibi Ka Maqbara or Panchakki",
        "copy": "Add the landmark as a named stop and allow visit time. Check opening and visitor access with the site authority."
      },
      {
        "title": "Ellora visit",
        "copy": "State whether Ellora is the final destination or one stop in a wider itinerary. Confirm entry and return plans."
      },
      {
        "title": "Ajanta and longer routes",
        "copy": "Ajanta is a distinct longer-distance plan. Include visit time and return or overnight needs; do not assume it fits a short airport ride."
      }
    ]
  },
  "shirdi-airport": {
    "title": "Shirdi Airport cab and temple-area connections",
    "intro": "A Shirdi Airport transfer may continue to accommodation, the temple area or another city. Include your flight schedule and exact destination, and verify current flight operations and pickup guidance.",
    "items": [
      {
        "title": "Airport to temple-area accommodation",
        "copy": "Provide the hotel or meeting point, expected arrival and passenger or luggage requirements. Confirm pickup details directly."
      },
      {
        "title": "Darshan and return timing",
        "copy": "If the trip includes temple visits, state the order and expected return window. Check current darshan guidance with the temple trust."
      },
      {
        "title": "Nashik or regional travel",
        "copy": "For an onward road journey, name the destination and exact address and say whether you need a one-way or return arrangement."
      },
      {
        "title": "Pilgrimage group request",
        "copy": "Mention passenger count, baggage and other pilgrimage destinations. Vehicle availability is confirmed after review."
      }
    ]
  }
};
export const places = [
  {
    slug: "anjaneri",
    name: "Anjaneri",
    title: "Plan a Nashik to Anjaneri journey",
    description:
      "Anjaneri hill and fort area is a regional outing near Nashik. Share your intended trailhead or visit point, date and return plan, and check current weather and access conditions.",
    tip: "Confirm the exact road drop point; cab access does not imply access to walking trails.",
  },
  {
    slug: "sinnar",
    name: "Sinnar",
    title: "Nashik to Sinnar cab enquiries",
    description:
      "Ask about a local or intercity trip between Nashik and Sinnar. Share your exact pickup and drop points, date and any stops.",
    tip: "Confirm the destination address and timing before travel.",
  },
  {
    slug: "nashik-road",
    name: "Nashik Road",
    title: "Nashik Road pickup and drop enquiries",
    description:
      "Plan a pickup or drop around Nashik Road, including a connection to the wider Nashik area. Share your address and preferred time.",
    tip: "Allow time for local traffic and share a clear meeting point.",
  },
  {
    slug: "trimbakeshwar",
    name: "Trimbakeshwar",
    title: "Nashik to Trimbakeshwar cab enquiries",
    description:
      "Plan a road journey from Nashik to Trimbakeshwar. Share your pickup, date, passenger count and whether you would like to return the same day.",
    tip: "Check current temple timings and local access guidance before travelling.",
  },
  {
    slug: "igatpuri",
    name: "Igatpuri",
    title: "Nashik to Igatpuri cab enquiries",
    description:
      "Enquire about a trip between Nashik and Igatpuri, including local sightseeing or a return journey. Share stops, schedule and exact addresses.",
    tip: "Weather and seasonal road conditions can affect travel time.",
  },
  {
    slug: "vineyards",
    name: "Nashik vineyard country",
    title: "Plan a Nashik vineyard area visit",
    description:
      "Tell Vistar Cabs which vineyard area or venues you plan to visit, how long you expect to stay, and your preferred pickup time.",
    tip: "Confirm visiting hours, entry rules and reservations directly with each venue.",
  },
  {
    slug: "panchavati",
    name: "Panchavati",
    title: "Panchavati and central Nashik cab enquiries",
    description:
      "Plan local transport to Panchavati and nearby Nashik landmarks. Share your pickup area, stops and preferred schedule.",
    tip: "Allow for local traffic and check any event-day access restrictions.",
  },
  {
    slug: "pandavleni-caves",
    name: "Pandavleni Caves",
    title: "Plan a visit to Pandavleni Caves",
    description:
      "Enquire about local transport for Pandavleni Caves and nearby Nashik destinations. Include your intended visit time and return plan.",
    tip: "Check current opening hours, entry requirements and walking conditions before setting out.",
  },
];

export const cityContent: Record<
  string,
  {
    heading: string;
    overview: string;
    tripIdeas: { title: string; copy: string }[];
    services: { title: string; copy: string }[];
    checklist: string[];
    editorialSections?: {
      eyebrow: string;
      title: string;
      intro: string;
      items: { title: string; copy: string }[];
    }[];
  }
> = {
  nashik: {
    heading: "Build a Nashik day around your priorities",
    overview:
      "Nashik can be the start of a short local ride, a temple visit, a vineyard-area outing or a longer intercity trip. Combine only the places that fit your schedule, then share each stop in order so the team can discuss a realistic plan.",
    tripIdeas: [
      {
        title: "City and station pickups",
        copy: "Use the Nashik city page to describe a hotel, home, business address or Nashik Road railway pickup. Give the exact entrance or a nearby meeting landmark.",
      },
      {
        title: "Temple and heritage visits",
        copy: "Panchavati, Ramkund and Trimbakeshwar can be requested as separate stops. Confirm temple access, visit timing and any local restrictions before departure.",
      },
      {
        title: "Countryside and hill routes",
        copy: "Igatpuri and vineyard-area trips need a clear return plan. Ask each venue about its visiting arrangements and leave room for seasonal road conditions.",
      },
      {
        title: "Railway and airport connections",
        copy: "For Nashik Road station or Ozar Airport, include the train or flight schedule and your onward address. Confirm the pickup point and service availability for the exact time.",
      },
      {
        title: "Work, appointments and family visits",
        copy: "For an office, hospital or family address, share the correct entrance and your preferred arrival window. If the schedule has more than one stop, list them in order.",
      },
    ],
    services: [
      { title: "Local Nashik rides", copy: "Share the pickup and drop addresses for a city transfer, station connection, appointment or family visit. For several stops, send the order and approximate waiting needs." },
      { title: "One-way and return trips", copy: "Request a direct journey or a return arrangement from Nashik. Include the return date and time if known; Vistar Cabs will confirm the available plan and complete fare." },
      { title: "Outstation journeys", copy: "Use Nashik as a starting point for a route such as Pune, Mumbai, Shirdi or another destination. Give the exact localities, date, passenger count and any planned stops." },
      { title: "Airport or railway pickups", copy: "Name Ozar Airport or Nashik Road station, add your flight or train timing and provide the onward address. Meeting points and pickup availability need direct confirmation." },
      { title: "Pilgrimage and sightseeing", copy: "For Panchavati, Ramkund, Trimbakeshwar or a countryside itinerary, list each visit in order. Check venue access and opening guidance separately before arranging travel." },
    ],
    checklist: [
      "Pickup address or train/flight arrival detail",
      "Every planned stop in visit order",
      "Preferred start time and return window",
      "Luggage, accessibility or waiting requirements",
    ],
    editorialSections: [
      {
        "eyebrow": "Nashik taxi guide",
        "title": "Cab and taxi services in Nashik",
        "intro": "Nashik journeys range from neighbourhood pickups to airport connections, temple visits and longer Maharashtra routes. Share the exact address, date, time and stop order for review.",
        "items": [
          {
            "title": "Local Nashik cab",
            "copy": "For a city transfer, appointment or family pickup, enter the locality and exact address. Add a building entrance or nearby meeting point."
          },
          {
            "title": "Nashik Road railway station",
            "copy": "Include the train number, schedule, station meeting point and onward address. Confirm the pickup arrangement for your travel time."
          },
          {
            "title": "Nashik Airport at Ozar",
            "copy": "Include flight details, pickup or drop direction and onward address. Verify current flights and pickup arrangements with your airline and airport."
          },
          {
            "title": "One-way and return routes",
            "copy": "For Mumbai, Pune, Shirdi or another destination, provide exact start and end locations and say whether you need a return."
          },
          {
            "title": "Temple and vineyard visits",
            "copy": "Name Panchavati, Ramkund, Trimbakeshwar or vineyard venues in order. Check opening, access and reservations directly."
          }
        ]
      },
      {
        "eyebrow": "Nashik places and routes",
        "title": "Plan places to visit from Nashik",
        "intro": "Nashik combines riverfront landmarks, pilgrimage destinations and countryside outings. Share a realistic schedule and confirm site access before travel.",
        "items": [
          {
            "title": "Panchavati and Ramkund",
            "copy": "Give the specific ghat, temple-area entrance or meeting point. Event days and local access may affect pickup."
          },
          {
            "title": "Trimbakeshwar",
            "copy": "Include your preferred arrival and return window, and check current darshan and visitor guidance with the temple authority."
          },
          {
            "title": "Vineyard district",
            "copy": "List venue names and expected visit times. Check reservations and visitor hours directly with each venue."
          },
          {
            "title": "Anjaneri and Pandavleni",
            "copy": "Share the intended road drop point and return plan. Cab drop-off does not imply access to walking trails or caves."
          },
          {
            "title": "Igatpuri and countryside",
            "copy": "Name the destination or accommodation and any stops. Weather and seasonal road conditions can affect the itinerary."
          }
        ]
      }
    ],
  },
  mumbai: {
    heading: "Plan Mumbai by neighbourhood and terminal",
    overview:
      "Mumbai-area journeys can span several districts and airport choices. Tell us whether the trip is within the city, a Nashik connection, or an airport pickup/drop, and name the exact terminal or locality to avoid confusion.",
    tripIdeas: [
      {
        title: "South and central Mumbai",
        copy: "Share the full address and a practical pickup point for central-city destinations. For multi-stop plans, list each stop and the time you expect to spend.",
      },
      {
        title: "Thane and Navi Mumbai",
        copy: "Specify the neighbourhood or node rather than only “Mumbai”. This helps clarify the side of the metropolitan area and the intended road journey.",
      },
      {
        title: "Two airport options",
        copy: "Choose Mumbai CSMIA (BOM) or Navi Mumbai International Airport (NMI) in your enquiry. Add terminal and flight details where known; transfer availability is confirmed directly.",
      },
      {
        title: "Intercity travel to Nashik or Pune",
        copy: "Give the exact Mumbai neighbourhood and destination city address. For a return or a stop on the way, include the date and full plan so the team can review it together.",
      },
      {
        title: "Multi-stop city itineraries",
        copy: "List each Mumbai pickup and drop in visit order, including the time-sensitive stop. Traffic and access restrictions can affect the schedule, so confirm the final plan directly.",
      },
    ],
    services: [
      { title: "Local Mumbai transfers", copy: "Enter the specific neighbourhood, building and meeting point at both ends. For several city stops, share their sequence and any appointment times." },
      { title: "One-way and return journeys", copy: "Request a direct Mumbai-to-destination transfer or ask about a return plan. Add the travel date, pickup time and the exact destination locality for a clear review." },
      { title: "Airport transfers", copy: "Select the correct airport, BOM or NMI, and include its terminal, flight number and scheduled time. Share the other end of the ride and allow a practical traffic buffer." },
      { title: "Business and guest movement", copy: "For meetings, site visits or guest pickups, provide the office, hotel or venue address and any time-sensitive arrivals. Ask the team to confirm the schedule and vehicle." },
      { title: "Regional trips", copy: "For Nashik, Pune or another intercity destination, name the start and end areas rather than only the cities. Include stops and return needs in the enquiry." },
    ],
    checklist: [
      "Full neighbourhood, building or pickup gate",
      "Correct airport and terminal (BOM or NMI)",
      "Flight number and scheduled time, if relevant",
      "Traffic buffer and any additional stops",
    ],
    editorialSections: [
      {
        "eyebrow": "Mumbai taxi guide",
        "title": "Local, airport and outstation cab enquiries in Mumbai",
        "intro": "Mumbai pickups depend on the precise neighbourhood, airport and terminal. Use the exact locality or address and share the date and preferred time.",
        "items": [
          {
            "title": "Local Mumbai transfers",
            "copy": "Give both neighbourhoods, the full address and a practical pickup point. List additional stops and appointment times."
          },
          {
            "title": "Business and guest movement",
            "copy": "For office visits, client pickups or events, identify the building, gate or meeting point and time-sensitive schedule."
          },
          {
            "title": "Airport transfer: BOM or NMI",
            "copy": "Confirm the airport shown on your ticket, terminal and flight schedule with your airline before sending a request."
          },
          {
            "title": "One-way and return journeys",
            "copy": "For Nashik, Pune or another city, provide the Mumbai start area and exact destination. State return needs and stops."
          },
          {
            "title": "Thane and Navi Mumbai",
            "copy": "Specify the node, sector or neighbourhood rather than using only Mumbai to distinguish regional pickup and drop locations."
          }
        ]
      },
      {
        "eyebrow": "Mumbai areas and landmarks",
        "title": "Plan a Mumbai city itinerary by area",
        "intro": "A multi-stop Mumbai day can cross busy districts and different access points. Check visitor arrangements and share stops in your preferred order.",
        "items": [
          {
            "title": "Gateway of India and South Mumbai",
            "copy": "Share a street address or clear meeting landmark for the waterfront or Fort area. Confirm local access and event-day restrictions."
          },
          {
            "title": "Marine Drive and central areas",
            "copy": "Add exact pickup and drop points for hotel, office or promenade visits. Allow flexibility for traffic and access rules."
          },
          {
            "title": "Bandra and western suburbs",
            "copy": "Name the suburb, venue or building. If the plan has several stops, list them in travel order."
          },
          {
            "title": "Thane and Navi Mumbai",
            "copy": "Use the exact locality, node or sector. For an airport connection, verify whether your flight is at BOM or NMI."
          },
          {
            "title": "Journeys beyond Mumbai",
            "copy": "For Lonavala, Nashik, Pune or another destination, share the complete itinerary and whether you need a return."
          }
        ]
      }
    ],
  },
  pune: {
    heading: "Connect Pune city trips with nearby escapes",
    overview:
      "Use this page for a city address, Pune Airport connection or an onward journey to nearby destinations. A day trip can involve longer road time than a city transfer, so include the return plan and expected stops when asking for availability.",
    tripIdeas: [
      {
        title: "Pune city and business areas",
        copy: "Name the locality, office, hotel or railway pickup and include any time-sensitive arrival requirement.",
      },
      {
        title: "Lonavala and the hill route",
        copy: "Lonavala is a hill-station destination with forts and rock-cut cave attractions in the wider area. Choose the places you want to visit and check current access before travel.",
      },
      {
        title: "Bhimashankar visit",
        copy: "This trip combines a major temple destination with a protected natural area. Confirm current temple, road and sanctuary guidance, especially during monsoon conditions.",
      },
      {
        title: "Pune Airport and station pickups",
        copy: "Name the airport or railway station, terminal or exit, scheduled arrival and onward destination. Add a working callback number so the pickup details can be coordinated.",
      },
      {
        title: "Meetings, campus and hospital appointments",
        copy: "Pune destinations can be spread across the city. Provide the area and exact entrance, then state any arrival deadline or return requirement in your request.",
      },
    ],
    services: [
      { title: "Local Pune travel", copy: "Share the exact neighbourhood and address for a city ride, meeting, campus visit, appointment or shopping trip. If you need several stops, list them in visit order." },
      { title: "Airport and station connections", copy: "For Pune Airport or a railway station, provide the flight or train schedule, terminal or exit, onward destination and a suitable callback number." },
      { title: "One-way intercity cab", copy: "Request a direct transfer from Pune to Nashik, Mumbai or another city. Tell us the pickup locality, destination address, date and preferred departure time." },
      { title: "Return and day-trip requests", copy: "For Lonavala, Bhimashankar or another longer outing, include your planned stops, visit time and return window. The team will confirm which arrangement is available." },
      { title: "Family and group journeys", copy: "Mention passenger count, luggage and comfort needs so the team can discuss a suitable vehicle category. Vehicle choice and availability are confirmed for your date." },
    ],
    checklist: [
      "Pune pickup locality or airport details",
      "Destination addresses and sightseeing stops",
      "One-way or return request and waiting needs",
      "Seasonal road, access and venue checks",
    ],
    editorialSections: [
      {
        eyebrow: "Pune cab guide",
        title: "Cab services in Pune for city, airport and outstation trips",
        intro:
          "Pune trips can start in the old city, continue through a business district or connect to a destination beyond the city. Share the exact pickup and drop locations, date and preferred time so Vistar Cabs can review the journey you have in mind.",
        items: [
          {
            title: "Local cab in Pune",
            copy: "For an appointment, campus visit, shopping trip or city transfer, enter the neighbourhood and the actual address. If you need multiple stops, list them in the order you plan to visit and ask about waiting arrangements.",
          },
          {
            title: "Pune Airport and railway station",
            copy: "For an airport or station connection, include your flight or train schedule, terminal or meeting point, and onward address. Add a practical time buffer for city traffic and confirm the pickup arrangement before travelling.",
          },
          {
            title: "One-way Pune intercity cab",
            copy: "You can enquire about a direct Pune journey to Nashik, Mumbai or another destination. Provide the pickup locality and destination address; the route, fare and vehicle are confirmed for your specific request.",
          },
          {
            title: "Return and sightseeing journeys",
            copy: "For a return trip or a day out, include every stop, the expected visit time and your preferred return window. The team needs the complete itinerary to check whether the requested schedule can be arranged.",
          },
          {
            title: "Business, family and group travel",
            copy: "For an office transfer, family visit or group outing, share passenger count, luggage and any arrival deadline. Ask the team to confirm a suitable available vehicle and the full trip terms.",
          },
        ],
      },
      {
        eyebrow: "Pune places and day trips",
        title: "Places to visit in Pune and nearby",
        intro:
          "Pune brings together Maratha-era landmarks, temples, museums, gardens and routes into the Sahyadri hills. Pick the places that matter to your visit, then check current opening, entry and access details with each venue before planning the cab schedule.",
        items: [
          {
            title: "Historic Pune and forts",
            copy: "Shaniwar Wada, Lal Mahal and Aga Khan Palace offer distinct windows into the city’s history. Sinhagad, Rajgad and other forts are separate road outings, so share the exact destination and return plan.",
          },
          {
            title: "Temples and heritage stops",
            copy: "Dagdusheth Halwai Ganpati Temple, Chaturshringi Temple and Pataleshwar Cave Temple can be considered for a city itinerary. Mention the preferred sequence and allow time for local access and visits.",
          },
          {
            title: "Gardens, hills and lakes",
            copy: "Saras Baug, Empress Garden, Pune-Okayama Friendship Garden, Vetal Tekdi and Pashan Lake suit different kinds of city visits. Confirm visitor access and any restrictions for the date you plan to travel.",
          },
          {
            title: "Museums and city culture",
            copy: "Raja Dinkar Kelkar Museum and other cultural venues can be added as named stops. Check opening days and visiting hours directly, then include your preferred arrival window in the enquiry.",
          },
          {
            title: "Hill-station and countryside plans",
            copy: "Lonavala, Khandala, Mulshi, Pawna Lake and Mahabaleshwar are longer journeys beyond a short city ride. Give the exact places, travel date and whether you need a return or overnight arrangement.",
          },
        ],
      },
      {
        eyebrow: "Choose for your itinerary",
        title: "Which cab should you ask about?",
        intro:
          "The right vehicle depends on your group, luggage and route. These are general categories to help describe your request; Vistar Cabs will confirm which options are available for your date.",
        items: [
          {
            title: "Hatchback",
            copy: "Ask about a compact option for a small party and lighter luggage, especially for a straightforward city journey.",
          },
          {
            title: "Sedan",
            copy: "A sedan may suit a small family or business trip where you want a separate boot for bags. Share the passenger and luggage count when enquiring.",
          },
          {
            title: "SUV",
            copy: "For a larger party or more luggage on an intercity route, ask whether an SUV is available and confirm its passenger and baggage capacity.",
          },
          {
            title: "Tempo Traveller",
            copy: "For a group travelling together, ask about a Tempo Traveller and confirm seating, luggage space and availability for your itinerary.",
          },
        ],
      },
      {
        eyebrow: "How the enquiry works",
        title: "Send a clear Pune cab enquiry",
        intro:
          "Use the quick trip form near the top of this page. It asks for the trip details and a callback mobile number; it does not ask for your name and does not confirm a booking or fare by itself.",
        items: [
          {
            title: "1. Enter the journey",
            copy: "Fill in your starting point, destination, travel date and preferred pickup time. Use full locality or address details where possible.",
          },
          {
            title: "2. Add a callback number",
            copy: "Enter a mobile number Vistar Cabs can use to follow up about the request and confirm trip details.",
          },
          {
            title: "3. Submit and send WhatsApp",
            copy: "Submitting saves the enquiry and opens WhatsApp with the trip information prepared. Press Send in WhatsApp to message Vistar Cabs.",
          },
          {
            title: "4. Wait for confirmation",
            copy: "Before treating the journey as booked, get direct confirmation of availability, vehicle, total fare, waiting, tolls and any other trip terms.",
          },
        ],
      },
    ],
  },
  sambhajinagar: {
    heading: "Shape a heritage-focused Sambhajinagar visit",
    overview:
      "Chhatrapati Sambhajinagar is a useful base for city pickups, airport connections and heritage itineraries. Ajanta and Ellora are separate destinations; state clearly whether you want one site, both sites or only a city transfer.",
    tripIdeas: [
      {
        title: "City landmarks",
        copy: "For Bibi Ka Maqbara, Panchakki or a hotel/rail pickup, provide a precise meeting point and list any additional stops.",
      },
      {
        title: "Ellora Caves",
        copy: "Allow time for the site visit and the return journey. Check current ticketing, opening and access information with the relevant site authority.",
      },
      {
        title: "Ajanta Caves",
        copy: "Treat Ajanta as a dedicated day plan rather than assuming it fits a short city ride. Share the planned departure, return window and any overnight arrangement.",
      },
      {
        title: "Railway station and airport transfers",
        copy: "For a station or IXU airport pickup, share your arrival schedule, meeting point and final address. Confirm current pickup access and availability before relying on a transfer.",
      },
      {
        title: "Separate heritage stops",
        copy: "Ajanta and Ellora are different visits. Tell the team which site you want, whether you need a dedicated visit or a multi-day plan, and where you will stay or return.",
      },
    ],
    services: [
      { title: "City transfers", copy: "Provide the exact pickup and drop locality for hotels, appointments, station arrivals or city landmarks. Add a meeting point if the address has multiple entrances." },
      { title: "Airport connections", copy: "For IXU, share the flight schedule, pickup or drop direction, meeting point and onward destination. Confirm current airport access and vehicle availability directly." },
      { title: "Nashik and Pune routes", copy: "For intercity travel, enter your actual starting and ending addresses. Mention whether you need a one-way trip, return or an additional stop." },
      { title: "Ajanta or Ellora visit planning", copy: "Choose which heritage site is part of your itinerary and give the date, planned visit time and return or overnight needs. Check access and opening information with the site authority." },
      { title: "Family and group travel", copy: "Tell us how many passengers are travelling and how much luggage you have. The team can confirm a suitable available vehicle after reviewing the full plan." },
    ],
    checklist: [
      "City, railway or IXU airport pickup details",
      "Which heritage site(s) are on the itinerary",
      "Visit date and expected time at each stop",
      "Return, overnight and luggage requirements",
    ],
    editorialSections: [
      {
        "eyebrow": "Sambhajinagar taxi guide",
        "title": "Cab services for city, airport and heritage journeys",
        "intro": "Enquiries may be for a city transfer, airport connection or dedicated heritage visit. Ajanta and Ellora are separate destinations, so specify which one is planned.",
        "items": [
          {
            "title": "Local city transfers",
            "copy": "Provide the exact neighbourhood, hotel, appointment address or landmark and a clear meeting point. Add other stops in order."
          },
          {
            "title": "Railway station and airport",
            "copy": "Share your train or flight schedule, station exit or airport details, onward address and preferred pickup time."
          },
          {
            "title": "Ellora Caves",
            "copy": "Plan time for the road and site visit. Check current opening, ticket and visitor guidance with the site authority."
          },
          {
            "title": "Ajanta Caves",
            "copy": "Plan Ajanta separately from a short city ride and from Ellora unless you have confirmed a workable multi-day itinerary."
          },
          {
            "title": "Intercity travel",
            "copy": "For Nashik, Pune or another city, provide exact start and end addresses, date, time and stops."
          }
        ]
      },
      {
        "eyebrow": "Heritage places and visits",
        "title": "Explore heritage around Sambhajinagar",
        "intro": "The city and nearby heritage sites have different road and visitor arrangements. Choose the destination and confirm entry information before travel.",
        "items": [
          {
            "title": "Bibi Ka Maqbara",
            "copy": "Name the entrance or meeting point and whether this is a direct drop or part of a longer visit."
          },
          {
            "title": "Panchakki",
            "copy": "Add it as a specific stop and share the planned visit window. Check current access and opening details."
          },
          {
            "title": "Ellora and Grishneshwar",
            "copy": "State whether you want one stop or both and confirm site access and temple guidance separately."
          },
          {
            "title": "Ajanta visit planning",
            "copy": "Include expected site time and a return or overnight plan; do not assume Ajanta and Ellora fit one short outing."
          },
          {
            "title": "Family and group visits",
            "copy": "Share passenger and luggage counts, destinations and mobility needs. Vehicle availability is confirmed for your request."
          }
        ]
      }
    ],
  },
  ahilyanagar: {
    heading: "Plan regional stops from Ahilyanagar",
    overview:
      "Ahilyanagar journeys may combine city pickups with pilgrimage, heritage or countryside stops. Name the exact destination and village or entrance, then ask the team to confirm whether the full route can be arranged.",
    tripIdeas: [
      {
        title: "City and fort area",
        copy: "Share the full pickup/drop address and whether you need a direct ride or time for a local visit.",
      },
      {
        title: "Meherabad and Shani Shingnapur",
        copy: "These are distinct destination requests. Include them in visit order and ask about a return plan rather than assuming a multi-stop schedule.",
      },
      {
        title: "Bhandardara countryside",
        copy: "A countryside itinerary benefits from a clear start, stops and return time. Check current local access and weather guidance before travel.",
      },
      {
        title: "Regional business and family trips",
        copy: "Share the full town or village names at both ends, not only the district. Mention appointments, additional passengers and any return timing that matters.",
      },
      {
        title: "Temple and rural-area visits",
        copy: "For Shani Shingnapur or a rural destination, name the intended entrance or meeting point and list other stops in order. Confirm current visitor and road information locally.",
      },
    ],
    services: [
      { title: "Local city pickups", copy: "Give the neighbourhood, landmark or full address at both ends. If an appointment or event has a fixed time, include it with your preferred pickup time." },
      { title: "Regional one-way journeys", copy: "For travel to Nashik, Shirdi or another city, name the exact pickup and destination areas. The team will check the route and date before confirming a trip." },
      { title: "Return and multi-stop requests", copy: "Include the expected return time, each stop and any waiting requirement. Stops can affect the route and quote, so request confirmation for the complete itinerary." },
      { title: "Pilgrimage and countryside travel", copy: "For Shani Shingnapur or Bhandardara, provide the destination entrance or meeting point and check current local access and weather guidance before travel." },
      { title: "Passenger and luggage planning", copy: "Mention group size, baggage and any mobility needs so the team can discuss a fitting vehicle category and confirm availability." },
    ],
    checklist: [
      "Exact town, village or attraction entrance",
      "One-way, return or multi-stop itinerary",
      "Expected visit duration and return time",
      "Road and access guidance for your travel date",
    ],
    editorialSections: [
      {
        "eyebrow": "Ahilyanagar cab guide",
        "title": "Local, regional and pilgrimage cab enquiries",
        "intro": "Journeys can include a city pickup, regional destination or pilgrimage stop. Give the exact town, village, entrance or address at both ends.",
        "items": [
          {
            "title": "Local city transfers",
            "copy": "Share the locality, building or landmark for both pickup and drop. Include appointment timing, stops and return needs."
          },
          {
            "title": "Ahmednagar Fort",
            "copy": "Name the fort as a planned stop and provide your starting address. Check current visitor access and local rules."
          },
          {
            "title": "Meherabad visit",
            "copy": "Provide the precise destination and preferred time, along with any onward or return plan. Check visitor guidance directly."
          },
          {
            "title": "Shani Shingnapur",
            "copy": "Include pickup, expected visit time and return window, and confirm current temple access information."
          },
          {
            "title": "Bhandardara countryside",
            "copy": "Name the attraction or accommodation rather than only the region. Weather and road conditions can affect the plan."
          }
        ]
      },
      {
        "eyebrow": "Regional trip planning",
        "title": "Plan a day or intercity journey from Ahilyanagar",
        "intro": "Longer regional plans need clear start and end points, realistic stop times and a return plan. Availability and terms require direct confirmation.",
        "items": [
          {
            "title": "Nashik and Pune routes",
            "copy": "Enter the actual pickup and drop addresses and preferred departure time. Add any intermediate town or stop."
          },
          {
            "title": "Pilgrimage combinations",
            "copy": "List Shani Shingnapur and other destinations in order, then ask the team to review timing and feasibility."
          },
          {
            "title": "Business and industrial visits",
            "copy": "Share a precise address or location pin, entry gate and appointment details for an office or industrial site."
          },
          {
            "title": "Return and waiting requests",
            "copy": "State when you expect to return and how long you may wait. Confirm waiting terms and fare before accepting."
          },
          {
            "title": "Vehicle and luggage planning",
            "copy": "Mention passengers, baggage and mobility requirements. Ask which vehicle category is available for your date."
          }
        ]
      }
    ],
  },
  shirdi: {
    heading: "Organise your Shirdi arrival and local visits",
    overview:
      "A Shirdi trip may involve the airport, accommodation and the Sai Baba temple complex. Share whether you need a direct transfer, a local pickup plan or a connection onward to Nashik or another city.",
    tripIdeas: [
      {
        title: "Temple-area arrival",
        copy: "Mention the Samadhi Mandir area, accommodation or another specific meeting point. Check the temple trust’s current entry and visit guidance.",
      },
      {
        title: "Airport connection",
        copy: "For Shirdi Airport (SAG), add flight details and the onward address. Confirm ground transfer availability and meeting arrangements directly.",
      },
      {
        title: "Regional continuation",
        copy: "If Shirdi is one stop in a longer journey, provide the complete route, date, stop order and return/overnight requirements.",
      },
      {
        title: "Arrival from another city",
        copy: "For a Nashik, Mumbai or Ahilyanagar connection, give the exact pickup address, Shirdi destination and planned arrival time. A request is confirmed only after the team replies.",
      },
      {
        title: "Temple visit and return plan",
        copy: "If you need a return after darshan, include the expected departure window and any accommodation or other stops. Check current temple access and visit guidance with the temple authority.",
      },
    ],
    services: [
      { title: "Temple-area transfers", copy: "Name your hotel, accommodation, temple-area entrance or agreed meeting point. For busy dates, allow time for local traffic and confirm the pickup procedure." },
      { title: "One-way arrival in Shirdi", copy: "Share the origin city, pickup address, travel date and exact Shirdi destination. The enquiry is a request; the team must confirm the vehicle and availability." },
      { title: "Return after darshan", copy: "Include when you expect to leave, whether you need another stop and where you want to return. Confirm waiting terms and the complete fare before accepting." },
      { title: "Airport or station connection", copy: "For a flight or train connection, provide the schedule, meeting point and onward address. Check current terminal or station pickup instructions separately." },
      { title: "Pilgrimage group travel", copy: "Mention the number of passengers, luggage and any additional pilgrimage stops. Vistar Cabs can discuss a suitable available vehicle once the itinerary is clear." },
    ],
    checklist: [
      "Flight details or exact road pickup point",
      "Temple, hotel or onward destination",
      "Visit date and expected arrival time",
      "Other regional stops and return plan",
    ],
    editorialSections: [
      {
        "eyebrow": "Shirdi cab guide",
        "title": "Cab services for Sai Baba darshan and onward journeys",
        "intro": "Shirdi trips may involve the temple area, accommodation, airport or a longer pilgrimage route. Share your arrival point, stop sequence and return timing.",
        "items": [
          {
            "title": "Temple-area pickup or drop",
            "copy": "Name the Samadhi Mandir area, accommodation or meeting point. Check current temple access and local pickup instructions."
          },
          {
            "title": "Local pilgrimage stops",
            "copy": "If visiting Dwarkamai, Chavadi or another stop, list the sequence and expected wait. Confirm visitor arrangements with the temple trust."
          },
          {
            "title": "Shirdi Airport (SAG)",
            "copy": "Include flight number, scheduled time, date and onward address. Verify current flight operations and pickup guidance."
          },
          {
            "title": "Nashik and regional routes",
            "copy": "Provide full addresses, travel time and temple or hotel stops for a road connection to Nashik or another destination."
          },
          {
            "title": "Return after darshan",
            "copy": "Share your expected departure window, accommodation pickup and return destination. Confirm waiting terms and fare directly."
          }
        ]
      },
      {
        "eyebrow": "Shirdi pilgrimage planning",
        "title": "Plan a temple-area visit and regional trip",
        "intro": "A pilgrimage itinerary is easier to review when temple, accommodation and onward travel are described separately. Confirm visitor access and cab details directly.",
        "items": [
          {
            "title": "Samadhi Mandir area",
            "copy": "Give a suitable pickup point or accommodation address and check the temple trust’s current entry guidance."
          },
          {
            "title": "Dwarkamai and Chavadi",
            "copy": "List these as separate stops and include an expected visit window. Local access may affect timing."
          },
          {
            "title": "Group pilgrimage",
            "copy": "Share passenger count, baggage and mobility needs. Vehicle suitability and availability must be confirmed."
          },
          {
            "title": "Airport arrival to temple or hotel",
            "copy": "Include flight schedule and the exact destination after landing. Verify flight and pickup procedures before travel."
          },
          {
            "title": "Multi-city or overnight route",
            "copy": "List all cities and stops and say whether an overnight stay or return trip is needed."
          }
        ]
      }
    ],
  },
};

// Long-form, original Vistar Cabs editorial copy for the city landing pages.
// It follows useful travel topics seen on other cab sites without reusing their wording or service claims.
export const cityLongForm: Record<string, { heading: string; paragraphs: string[] }[]> = {
  nashik: [
    { heading: "Cab and taxi service in Nashik", paragraphs: [
      "Nashik trips can begin in the older neighbourhoods around Panchavati and Ramkund, near the commercial areas, at a hotel, or at a home on the edge of the city. When you enquire for a Nashik cab, give the full pickup and destination addresses rather than only naming the locality. A building entrance, gate, landmark or a nearby meeting point can help clarify where the driver should meet you. If the journey includes an appointment, a station pickup or more than one stop, add those details in the order you expect to travel.",
      "A local taxi request may be a short point-to-point ride, a series of visits during the day, or transport for visiting family and business guests. Tell Vistar Cabs whether you need a direct drop or want the vehicle to wait while you attend an appointment. The time required, stop sequence, date and passenger or luggage count all help the team understand the request. Availability, vehicle category, waiting arrangements and the complete fare are confirmed directly before you accept a trip.",
    ] },
    { heading: "Outstation cab journeys from Nashik", paragraphs: [
      "Nashik connects by road with destinations such as Mumbai, Pune, Shirdi, Ahilyanagar and Chhatrapati Sambhajinagar. A one-way request is suited to a journey ending in another city, while a return request needs the return date and preferred departure time as well as the outward details. For an overnight visit or a plan with multiple destinations, explain the full itinerary at the start so the team can review the route and schedule together.",
      "Highway trips are affected by the selected pickup point, traffic, weather, road conditions and stops along the way. We do not use a generic distance or arrival time as a guarantee for your particular trip. Share any appointment or train connection that gives you a deadline, and allow a practical buffer. Before confirming, ask for the total fare and clarify tolls, driver allowance, waiting, night travel, extra stops and any return or accommodation terms that apply to your enquiry.",
    ] },
    { heading: "Temple, heritage and vineyard visits around Nashik", paragraphs: [
      "Visitors often plan a Nashik itinerary around Panchavati, Ramkund and Trimbakeshwar, while others add Pandavleni, Anjaneri, Sinnar or a vineyard-area visit. These places are not interchangeable short city stops: travel time, parking, walking, visitor access and the length of the visit can change how many destinations fit into a day. Name each place you want to visit, identify the exact entrance or drop point where possible, and set a realistic return window.",
      "For temples, caves, forts and private venues, check current opening hours, entry rules, event-day restrictions and reservation requirements with the relevant authority or venue. A cab enquiry arranges transport discussion; it does not include entry tickets, guarantee access, or confirm a darshan slot. If you are travelling with older passengers, children or people who need extra assistance, mention mobility and luggage needs so the team can discuss an appropriate available vehicle and pickup plan.",
    ] },
    { heading: "Nashik airport, station and trip enquiries", paragraphs: [
      "Nashik Road railway station and Ozar Airport are distinct pickup locations, and the address at the other end of the trip matters just as much as the arrival point. For a station journey, share train timing and a clear meeting location. For an airport journey, confirm the airport and current flight information with your airline, then provide the flight number, scheduled time, pickup direction and onward address. If you are connecting to a temple, hotel or another city, describe that as part of the itinerary.",
      "Use the enquiry form on this page to enter your origin, destination, travel date, preferred time and callback mobile number. Submitting an enquiry records a request and opens WhatsApp with the details prepared; press Send there if you want to message Vistar Cabs. The form is not a confirmed reservation. Wait for direct confirmation of availability, vehicle, fare, pickup meeting point and trip terms before making plans that depend on the cab.",
    ] },
  ],
  mumbai: [
    { heading: "Local cab service across Mumbai", paragraphs: [
      "Mumbai journeys often cross several distinct neighbourhoods in a single day. A pickup in Colaba, Fort, Dadar, Bandra, Andheri, Powai, BKC, Thane or Navi Mumbai can involve different roads, entry gates and traffic conditions. For a local taxi enquiry, enter the exact building or venue at both ends and note any time-sensitive appointment. If you are visiting several offices, hospitals, hotels or family addresses, list the stops in sequence instead of describing the trip only as ‘Mumbai local’.",
      "A private cab may be useful for a direct city transfer or for an itinerary with multiple planned stops. Tell the team whether you want a one-way drop, a return ride or an arrangement that includes waiting. Mumbai traffic can vary substantially by hour, day and route, so a general online estimate should not be treated as a guaranteed pickup or arrival time. For a flight, train or meeting, share the required arrival time and leave a buffer that you consider appropriate.",
    ] },
    { heading: "Mumbai airport transfers and intercity routes", paragraphs: [
      "Mumbai airport enquiries must identify the airport shown on the ticket. Chhatrapati Shivaji Maharaj International Airport (BOM/CSMIA) and Navi Mumbai International Airport are separate locations. Include the terminal and flight schedule, whether the cab is meeting an arrival or taking you to a departure, and the exact address at the other end. Confirm current operating, terminal and pickup instructions with your airline or airport before travel; never rely on an assumed terminal or airport name.",
      "Mumbai is also a road starting point for Nashik, Pune, Shirdi and other destinations in Maharashtra. For a one-way or return outstation cab, provide the precise origin and destination, the date, passenger count and any scheduled stop. A return journey may take place on the same day or a later date, so state which you need. Vistar Cabs reviews the requested route and confirms availability, vehicle and total fare directly; this page does not promise a fixed price or travel duration.",
    ] },
    { heading: "Plan a Mumbai sightseeing or family itinerary", paragraphs: [
      "A day in Mumbai may include heritage landmarks such as the Gateway of India and the Fort area, a waterfront visit, a museum, a market or a family destination farther across the city. Select the places that matter to your visit and group nearby stops where practical. For each destination, check current opening hours, entry arrangements, event restrictions and parking or drop-off instructions with the venue. Include realistic visit time and the final drop point when describing a multi-stop trip.",
      "For airport guests, business visitors or family members unfamiliar with the city, a clear meeting point can make handovers easier. Provide a hotel name plus its address, a building entrance, or a recognisable public meeting location. If your group has substantial luggage or accessibility needs, mention them in advance so a suitable vehicle can be discussed. Any requested route, waiting time, extra stop or return leg should be included before the team confirms the complete arrangement.",
    ] },
    { heading: "Send a Mumbai taxi enquiry", paragraphs: [
      "The form on this page collects the journey basics: starting point, destination, date, preferred time and callback mobile number. Use the actual neighbourhood or address rather than a broad city label, especially when a terminal, railway station or multiple stops are involved. The more precise the route, the easier it is for the team to review what you are asking for and follow up about availability and terms.",
      "Submitting the form saves an enquiry and prepares a WhatsApp message; it does not by itself send that message or book a cab. Press Send in WhatsApp if you want to deliver it, then wait for Vistar Cabs to confirm the vehicle, pickup instructions, fare, toll and waiting terms. Keep your travel confirmation and airline or railway details available if the request depends on a scheduled arrival.",
    ] },
  ],
  pune: [
    { heading: "Cab and taxi service in Pune", paragraphs: [
      "Pune combines historic neighbourhoods, educational institutions, technology parks, hospitals, shopping areas and residential districts. A local cab request may connect Deccan, Shivajinagar, Kothrud, Baner, Hinjawadi, Kharadi, Viman Nagar, Hadapsar, Magarpatta or another part of the city. Enter the exact pickup and drop addresses, including a building, campus gate or meeting point. If the day includes client meetings, campus visits or medical appointments, list each stop and the time you need to reach it.",
      "When comparing a direct ride with an hourly or multi-stop arrangement, consider how long you expect to be at each place and whether the cab needs to wait or return later. These details affect the trip plan and quote, and should be agreed with Vistar Cabs before travel. City traffic and road conditions vary by time and location; use your own arrival buffer for a flight, train, examination or appointment instead of relying on an estimated duration as a guarantee.",
    ] },
    { heading: "Pune outstation, airport and railway transfers", paragraphs: [
      "Pune has road connections with Nashik, Mumbai, Shirdi, Lonavala and other Maharashtra destinations. A one-way intercity enquiry should include a precise origin and destination; a return request should include both travel dates and the preferred return time. If you plan to stop for a visit, meal or appointment, list it before requesting a quote. This helps the team assess the complete itinerary rather than pricing or confirming only one part of it.",
      "For Pune Airport or Pune railway station, share the flight or train number and schedule, the relevant terminal or meeting point and your final address. If you need a transfer to or from another city, identify every airport and station involved. Confirm current pickup procedures with the airport or railway operator, and discuss the pickup window and waiting arrangement directly with Vistar Cabs. Vehicle availability, fare and any terms remain subject to confirmation for your date.",
    ] },
    { heading: "Places to visit in Pune and nearby", paragraphs: [
      "Pune itineraries can include Shaniwar Wada, Lal Mahal, Dagdusheth Ganpati, Pataleshwar Cave Temple, Aga Khan Palace, museums, gardens and local markets. A city visit can also extend to hill forts or countryside destinations such as Sinhagad, Lonavala, Khandala or Mulshi. These places require different amounts of road travel and time on site, so choose a manageable sequence and share the exact destinations you want to include.",
      "Attractions may have their own visiting hours, entry rules, event schedules, parking limits and access conditions. Check those details with the venue before setting off. For hill or countryside trips, weather and road conditions may affect your plan; include a return time and any overnight requirement in your enquiry. Cab availability does not guarantee entry to a site or access to a walking trail, and tickets or venue reservations should be arranged separately where required.",
    ] },
    { heading: "Choose a vehicle and send a Pune cab enquiry", paragraphs: [
      "The appropriate vehicle depends on how many people are travelling, the amount of luggage, route length and comfort or accessibility needs. A small party with light bags may ask about a compact car; families or business travellers may prefer additional boot space; a larger group should ask whether a higher-capacity vehicle is available. Do not assume a vehicle category or seating capacity without confirmation for your requested date.",
      "Use the form near the top of this page to submit the origin, destination, date, time and callback mobile number. The enquiry is saved and WhatsApp opens with the trip details prepared; press Send there to message Vistar Cabs. The team must directly confirm the vehicle, total fare, tolls, waiting, extra stops and cancellation terms before the journey is considered arranged.",
    ] },
  ],
  sambhajinagar: [
    { heading: "Cab service in Chhatrapati Sambhajinagar", paragraphs: [
      "Chhatrapati Sambhajinagar is a starting point for city transfers, airport and railway connections, business visits and heritage travel. When requesting a local cab, give the neighbourhood, hotel, appointment address or precise landmark, plus the entrance where you want to meet. If a trip includes Bibi Ka Maqbara, Panchakki or another city stop, list each place in visit order and include the time you expect to spend there.",
      "A short city ride and a day of sightseeing need different schedules. Tell Vistar Cabs whether the journey is a direct transfer, a return ride or a multi-stop plan with waiting. Passenger count, luggage and mobility needs are also useful when the team discusses a suitable available vehicle. Confirm all pickup, fare and waiting arrangements in advance; the enquiry form records your request but does not confirm a cab automatically.",
    ] },
    { heading: "Plan an Ajanta or Ellora road journey", paragraphs: [
      "Ellora Caves and Ajanta Caves are separate heritage destinations and should be planned as distinct journeys unless you have carefully checked the time and route for a wider itinerary. Ellora may be combined in a regional plan with nearby destinations such as Grishneshwar, subject to the schedule and current visitor access. Ajanta generally needs its own clear travel plan. Give the exact departure point, site, visit window and return or overnight requirement.",
      "Before travel, confirm current opening times, entry arrangements, ticket rules, visitor restrictions and local transport access with the site authority. A cab drop does not mean that entry, parking, a guide or permission to visit is included. If you are travelling with a family or group, share passenger and baggage counts and allow time for walking and site visits, not only the road portion of the day.",
    ] },
    { heading: "Airport, station and intercity cab planning", paragraphs: [
      "For Chhatrapati Sambhajinagar Airport (IXU) or the railway station, include the flight or train schedule, a clear meeting point and the exact onward address. If you are travelling to a hotel or heritage site, name that destination separately. Verify current airline, terminal and pickup instructions for the date of travel, then discuss the proposed pickup window and waiting terms directly with the cab team.",
      "Intercity requests to Pune, Nashik, Ahilyanagar or another destination should state the full addresses at both ends, not just the city names. Add any intermediate stop, airport connection, appointment deadline, return date or overnight plan. Actual travel time depends on the selected route, traffic, weather and stops. Vistar Cabs can review the request and confirm whether it can be arranged, along with the applicable fare and trip conditions.",
    ] },
    { heading: "How to enquire for a Sambhajinagar cab", paragraphs: [
      "Enter your starting point, destination, travel date, preferred pickup time and callback number in the enquiry form. For a sightseeing request, use the destination list to explain which heritage site you want to visit and whether you need a return journey. Clear details help avoid mixing up city transfers, airport pickups and longer trips to a separate archaeological site.",
      "Submitting an enquiry is the first step in a conversation, not a completed booking. The form stores the trip request and prepares a WhatsApp message for you; press Send in WhatsApp if you want to contact Vistar Cabs that way. Wait for direct confirmation of availability, vehicle, fare, stops, waiting and pickup instructions before relying on the arrangement.",
    ] },
  ],
  ahilyanagar: [
    { heading: "Local taxi and cab journeys in Ahilyanagar", paragraphs: [
      "Ahilyanagar journeys may begin in the city centre, at a home or hotel, near a railway connection or at a business address. Give the locality and exact entrance at both ends of a local cab trip. If you have a meeting, appointment or family visit at a fixed time, include it with the requested pickup time. A clear address is especially useful when the destination is outside the central city or uses a village or site name shared by several places.",
      "For a ride with multiple stops, arrange the itinerary in order and explain whether you need the driver to wait or return later. Passenger numbers, luggage and accessibility requirements can affect which vehicle may suit the request. The page provides a way to ask about a trip; it does not publish a live fleet or guarantee a particular cab. Vistar Cabs confirms service availability, vehicle, fare and waiting conditions directly.",
    ] },
    { heading: "Regional and pilgrimage cab enquiries", paragraphs: [
      "From Ahilyanagar, travellers may enquire about road journeys to Shirdi, Nashik, Pune, Chhatrapati Sambhajinagar and other regional destinations. A one-way request should name the precise drop address, while a return trip needs the date and expected departure time for the journey back. For a pilgrimage visit, identify the temple or destination entrance and provide a realistic visit window rather than only saying that you need a full-day cab.",
      "Shani Shingnapur, Meherabad, Ahmednagar Fort and countryside destinations have their own visitor and road arrangements. Confirm entry, local guidance, opening times and weather-dependent access with the relevant authority or venue. If you intend to visit more than one place, list them in sequence and ask the team to review the whole route. Waiting, extra stops, tolls and any overnight terms should be agreed before you accept the trip.",
    ] },
    { heading: "Plan a reliable Ahilyanagar trip request", paragraphs: [
      "Provide the travel date, preferred start time, exact pickup and destination, passenger count and luggage details. For an airport or railway connection, add the flight or train schedule and the meeting point. For a trip that continues to another city or temple, enter the final address and mention any time you must arrive by. A general place name without the actual destination can make it difficult to assess the route accurately.",
      "Road conditions, traffic, weather and site access can change the schedule. Use a suitable buffer for appointments and confirm current visitor instructions before departure. Sending the form records an enquiry and opens WhatsApp with the information prepared; it does not send the message until you press Send or guarantee a reservation. Wait for a direct response from Vistar Cabs confirming the complete fare, vehicle and trip terms.",
    ] },
  ],
  shirdi: [
    { heading: "Taxi service in Shirdi for temple and town travel", paragraphs: [
      "Shirdi visitors may need a short transfer between accommodation and the temple area, a pickup from a railway or airport connection, or a longer road journey to another city. Specify the hotel, entrance or meeting point rather than only writing ‘temple’. If you are travelling with family or a group, include passenger and luggage counts and the time you expect to arrive so the team can review the trip request.",
      "A local itinerary may include the Samadhi Mandir area, Dwarkamai, Chavadi or other places in town. Plan each stop in sequence and check current darshan guidance, opening information, local access and event-day rules with the temple trust or relevant authority. Travel and waiting arrangements depend on the date and the day’s access conditions. A cab enquiry does not include temple entry, darshan booking or a guarantee of a particular visit time.",
    ] },
    { heading: "Shirdi airport, railway and outstation connections", paragraphs: [
      "For Shirdi Airport (SAG) or a railway arrival, share your flight or train number, scheduled time, date, meeting point and onward address. Verify the latest service and pickup instructions with the airline or station for your travel date. If you are continuing to a hotel, temple-area location or another city, say so clearly. This helps distinguish an airport transfer from a longer outstation journey and its return requirements.",
      "Shirdi road enquiries may connect with Nashik, Ahilyanagar, Mumbai, Pune or other places. Provide the exact starting and ending addresses, planned stops, departure window and whether you need a same-day return or a later trip back. Travel time and route conditions vary, so do not rely on a generic estimate for a scheduled darshan or onward connection. Confirm the fare, waiting, tolls and full itinerary directly with Vistar Cabs.",
    ] },
    { heading: "Send a Shirdi cab enquiry with clear trip details", paragraphs: [
      "Use the form to submit the origin, destination, travel date, preferred time and mobile number for a callback. If your plan includes darshan, accommodation, an airport or several pilgrimage stops, enter those details in the trip description or provide them when the team follows up. A precise return window can be important on busy dates, so include it at the beginning rather than waiting until the outward trip is discussed.",
      "After submission, the enquiry is saved and WhatsApp opens with a prepared message. Press Send there to deliver the message to Vistar Cabs. A form submission alone is not a confirmed booking. Wait for the team to confirm the vehicle, availability, pickup location, total fare and applicable waiting or stop terms before making dependent travel plans.",
    ] },
  ],
};

export const destinationGuides = [
  {
    citySlug: "mumbai",
    cityName: "Mumbai",
    slug: "south-mumbai-and-fort",
    name: "South Mumbai and Fort",
    category: "City neighbourhood",
    title: "Plan a South Mumbai pickup or multi-stop visit",
    intro:
      "South Mumbai and the Fort area can involve busy streets, one-way access and several possible meeting points. Share the street address or a nearby landmark and say whether this is a direct transfer or part of a longer city itinerary.",
    planning: [
      "Confirm the exact entrance or pickup gate with your host.",
      "List any additional stops in visit order.",
      "Allow time for city traffic and confirm the final pickup window.",
    ],
    faq: [
      [
        "Can I add several stops?",
        "Include all stops and expected wait time in your enquiry; the team will confirm whether that itinerary can be arranged.",
      ],
      [
        "Is the trip confirmed when I send this request?",
        "No. It is an enquiry. The team must confirm the vehicle, fare, availability and pickup details.",
      ],
    ],
  },
  {
    citySlug: "mumbai",
    cityName: "Mumbai",
    slug: "thane",
    name: "Thane",
    category: "Neighbourhood connection",
    title: "Enquire about a Thane cab pickup or drop",
    intro:
      "Thane is part of the wider Mumbai Metropolitan Region and has its own neighbourhoods and pickup points. Specify the exact area and both addresses instead of describing the journey only as “Mumbai”.",
    planning: [
      "Share the locality, building name and a clear meeting point.",
      "If travelling onward, provide the destination city or airport.",
      "For multiple pickups, list passengers and locations in order.",
    ],
    faq: [
      [
        "Can the route continue to Nashik?",
        "You can request a Thane–Nashik journey, but Vistar Cabs must confirm route and date availability.",
      ],
      [
        "Can I request a local Thane trip?",
        "Yes, send the stops and preferred duration for the team to review.",
      ],
    ],
  },
  {
    citySlug: "mumbai",
    cityName: "Mumbai",
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    category: "Neighbourhood connection",
    title: "Plan a Navi Mumbai pickup with clear location details",
    intro:
      "Navi Mumbai covers multiple nodes and business or residential areas. Use the exact node, sector and building or terminal so your pickup and drop request is unambiguous.",
    planning: [
      "Name the node or locality and a specific meeting point.",
      "If connecting to NMIA, include the airport and terminal details.",
      "Share any additional stops and whether you need a return.",
    ],
    faq: [
      [
        "Is this the Navi Mumbai airport page?",
        "The airport has its own enquiry page. This guide is for local-area pickup and drop planning.",
      ],
      [
        "Can I start a Nashik trip from Navi Mumbai?",
        "You can send the request with your exact address and date; service availability is confirmed directly.",
      ],
    ],
  },
  {
    citySlug: "pune",
    cityName: "Pune",
    slug: "lonavala",
    name: "Lonavala",
    category: "Nearby destination",
    title: "Plan a Pune to Lonavala day trip enquiry",
    intro:
      "Lonavala is known for hill scenery and heritage attractions, including the Karla and Bhaja cave areas. Decide which places you want to include before requesting a cab, since a sightseeing itinerary differs from a direct drop.",
    planning: [
      "List the attractions or addresses you intend to visit.",
      "Ask venues or authorities about current entry and access conditions.",
      "Include your expected return time and any overnight plan.",
    ],
    faq: [
      [
        "Can I request a stop at Karla or Bhaja Caves?",
        "Include each planned stop; the team will confirm route feasibility and waiting terms.",
      ],
      [
        "Does this page show a fixed fare?",
        "No. Fare and availability depend on your exact date, stops and return plan.",
      ],
    ],
  },
  {
    citySlug: "pune",
    cityName: "Pune",
    slug: "bhimashankar",
    name: "Bhimashankar",
    category: "Pilgrimage and nature",
    title: "Plan a Bhimashankar road journey enquiry",
    intro:
      "Bhimashankar is both a pilgrimage destination and a wildlife sanctuary in the Sahyadri region. Treat it as a dedicated road plan, check current temple and sanctuary guidance, and account for seasonal road conditions.",
    planning: [
      "Confirm current temple entry and local road guidance.",
      "Share the pickup, intended arrival time and return requirements.",
      "During wet weather, check official travel advisories before departure.",
    ],
    faq: [
      [
        "Can I combine Bhimashankar with other Pune stops?",
        "List every stop and the time you expect at each; the team will review whether the schedule is workable.",
      ],
      [
        "Is a return cab guaranteed?",
        "No. A return is only a request until the team confirms availability and terms.",
      ],
    ],
  },
  {
    citySlug: "sambhajinagar",
    cityName: "Chhatrapati Sambhajinagar",
    slug: "ellora-caves",
    name: "Ellora Caves",
    category: "Heritage destination",
    title: "Plan a Chhatrapati Sambhajinagar to Ellora visit",
    intro:
      "Ellora is a major rock-cut cave complex near Chhatrapati Sambhajinagar. A visit needs a clear pickup point, time for the site and a confirmed return plan; check current opening and entry guidance with the site authority.",
    planning: [
      "Share your exact hotel, city or airport pickup.",
      "Check current entry, opening and visitor rules before travelling.",
      "State whether the request includes nearby stops or is a direct transfer.",
    ],
    faq: [
      [
        "Can I add other heritage stops?",
        "List them in order and ask the team to confirm the itinerary and waiting terms.",
      ],
      [
        "Are entry tickets included?",
        "No inclusion is promised here; confirm entry arrangements with the site authority.",
      ],
    ],
  },
  {
    citySlug: "sambhajinagar",
    cityName: "Chhatrapati Sambhajinagar",
    slug: "ajanta-caves",
    name: "Ajanta Caves",
    category: "Heritage destination",
    title: "Plan a Chhatrapati Sambhajinagar to Ajanta enquiry",
    intro:
      "Ajanta is a separate heritage visit from the city and Ellora. Share the exact pickup, date, expected site time and return or overnight plan so the requested journey can be reviewed clearly.",
    planning: [
      "Check current opening, entry and visitor instructions with the site authority.",
      "Allow for the full road journey and time at the caves.",
      "Do not combine Ajanta and other sites without confirming a realistic schedule.",
    ],
    faq: [
      [
        "Can Ajanta and Ellora be combined in one day?",
        "Do not assume so. Share your proposed timing and let the team review the requested itinerary.",
      ],
      [
        "Does the cab enquiry include site admission?",
        "No. Site entry and ticket arrangements are separate unless explicitly confirmed.",
      ],
    ],
  },
  {
    citySlug: "ahilyanagar",
    cityName: "Ahilyanagar",
    slug: "meherabad",
    name: "Meherabad",
    category: "Spiritual and heritage stop",
    title: "Enquire about a trip to Meherabad",
    intro:
      "Meherabad is associated with Meher Baba and includes a samadhi and visitor areas. If you plan a visit, share the address, expected time on site and any additional stops in the Ahilyanagar area.",
    planning: [
      "Check current visitor guidance and access arrangements before setting out.",
      "Share the exact pickup and destination address.",
      "Include return timing or any onward destination.",
    ],
    faq: [
      [
        "Can I arrange a multi-stop visit?",
        "You can request a multi-stop itinerary; the team must confirm time and availability.",
      ],
      [
        "Are visiting hours guaranteed here?",
        "No. Check the destination’s current official visitor information.",
      ],
    ],
  },
  {
    citySlug: "ahilyanagar",
    cityName: "Ahilyanagar",
    slug: "shani-shingnapur-route",
    name: "Shani Shingnapur route",
    category: "Pilgrimage route",
    title: "Plan an Ahilyanagar to Shani Shingnapur enquiry",
    intro:
      "Shani Shingnapur is a pilgrimage destination in Ahilyanagar district. Specify the temple destination, date, pickup point and any planned stops so the team can review the requested route.",
    planning: [
      "Check current temple access and visitor guidance.",
      "Share the precise pickup and drop location.",
      "For return travel, include your preferred waiting or pickup time.",
    ],
    faq: [
      [
        "Can I combine Shirdi and Shani Shingnapur?",
        "You can request both as stops; the team will confirm route feasibility and timing.",
      ],
      [
        "Is availability guaranteed for festival days?",
        "No. Availability and access rules must be confirmed for the requested date.",
      ],
    ],
  },
  {
    citySlug: "ahilyanagar",
    cityName: "Ahilyanagar",
    slug: "bhandardara",
    name: "Bhandardara",
    category: "Countryside destination",
    title: "Plan a Bhandardara countryside trip enquiry",
    intro:
      "Bhandardara is a countryside destination in Ahilyanagar district. Share the precise attraction or accommodation, planned stops and return timing; weather and local access may affect a trip plan.",
    planning: [
      "Choose specific destinations rather than only “Bhandardara”.",
      "Check current weather and road access before travel.",
      "Share overnight, luggage and return requirements.",
    ],
    faq: [
      [
        "Can I request a day trip?",
        "You can enquire with a proposed schedule; the team will confirm if it can support the timing.",
      ],
      [
        "Can a cab include sightseeing stops?",
        "List each stop and ask the team to confirm the itinerary and waiting terms.",
      ],
    ],
  },
  {
    citySlug: "shirdi",
    cityName: "Shirdi",
    slug: "shirdi-pilgrimage-area",
    name: "Shri Sai Baba Samadhi Mandir",
    category: "Pilgrimage visit",
    title: "Plan your Shirdi temple-area arrival",
    intro:
      "The Shirdi temple complex includes the Samadhi Mandir, Dwarkamai, Chavadi and Gurusthan. Share whether you need a direct drop, accommodation pickup or a local plan, and check the temple trust’s current visitor guidance.",
    planning: [
      "Confirm the requested drop point and any vehicle access limits.",
      "Allow time for the temple visit and local movement.",
      "For airport arrivals, add the flight details and onward address.",
    ],
    faq: [
      [
        "Can I request several temple-area stops?",
        "Include the stop order and expected wait; the team will confirm whether it can be arranged.",
      ],
      [
        "Can I connect this trip to Nashik?",
        "You can enquire about the route, but availability and terms require direct confirmation.",
      ],
    ],
  },
  {
    citySlug: "nashik",
    cityName: "Nashik",
    slug: "anjaneri",
    name: "Anjaneri hills and temple area",
    category: "Nashik day trip",
    title: "Plan a Nashik to Anjaneri journey enquiry",
    intro:
      "Anjaneri, in the Nashik region, is associated with the Anjaneri fort and temple area. Share your intended trailhead or visit point, travel date and return plan; check local access and trail conditions before you go.",
    planning: [
      "Confirm the precise meeting point and intended route with your group.",
      "Check current weather, trail and local access guidance before departure.",
      "Allow time for the visit and return; confirm the cab waiting arrangement directly.",
    ],
    faq: [
      [
        "Can this be combined with Trimbakeshwar?",
        "You can request both as stops; the team will review the itinerary and timing.",
      ],
      [
        "Does the cab take visitors onto the trail?",
        "No off-road or trail access is implied. Confirm the road drop point and any walking required.",
      ],
    ],
  },
  {
    citySlug: "mumbai",
    cityName: "Mumbai",
    slug: "matheran",
    name: "Matheran",
    category: "Hill destination",
    title: "Plan a Mumbai-region journey to Matheran",
    intro:
      "Matheran is a hill destination in Raigad district with vehicle restrictions in its central area. Plan a road drop to an allowed access point, then check current local transport and visitor guidance before travel.",
    planning: [
      "Verify current vehicle access rules and the designated drop point.",
      "Share luggage and onward movement requirements for the group.",
      "Confirm a return pickup meeting point and time directly.",
    ],
    faq: [
      [
        "Can a cab drive into the vehicle-restricted area?",
        "Do not assume that it can. Confirm current access rules and the permitted vehicle drop point.",
      ],
      [
        "Can I combine the trip with other stops?",
        "List each stop and ask the team to check travel time and availability.",
      ],
    ],
  },
  {
    citySlug: "pune",
    cityName: "Pune",
    slug: "mahabaleshwar",
    name: "Mahabaleshwar",
    category: "Hill destination",
    title: "Plan a Pune to Mahabaleshwar road enquiry",
    intro:
      "Mahabaleshwar is a hill station in the Satara region, known for its plateau scenery and viewpoints. Specify the locations you want to visit, your stay area and return or overnight plan; seasonal road conditions can affect travel.",
    planning: [
      "List the viewpoints or attractions you plan to include.",
      "Check current local conditions and venue access before travel.",
      "State whether you need a return journey, overnight arrangement or luggage space.",
    ],
    faq: [
      [
        "Can I request multiple viewpoints?",
        "Include the stop order and expected time at each; the team will confirm the requested plan.",
      ],
      [
        "Is travel time fixed?",
        "No. Weather, traffic, road conditions and stops affect journey time.",
      ],
    ],
  },
];
