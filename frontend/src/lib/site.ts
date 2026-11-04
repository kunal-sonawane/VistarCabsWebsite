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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@vistarcabs.com",
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
      "Share the Nashik pickup area, Pune destination, departure date, passenger count and any planned stops. A return journey can be requested in the enquiry.",
  },
  {
    from: "Nashik",
    to: "Mumbai",
    slug: "nashik-to-mumbai-cab",
    note: "City and airport connections",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Specify your Mumbai neighbourhood or airport terminal, Nashik pickup point, flight schedule if applicable, and preferred arrival buffer.",
  },
  {
    from: "Nashik",
    to: "Sambhajinagar",
    slug: "nashik-to-sambhajinagar-cab",
    note: "Regional intercity enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Tell us whether you are travelling to the city, airport or a nearby heritage destination. Share exact locations and any sightseeing stops.",
  },
  {
    from: "Nashik",
    to: "Ahilyanagar",
    slug: "nashik-to-ahilyanagar-cab",
    note: "Regional journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share the exact pickup and drop areas, date and whether you need a one-way or return arrangement.",
  },
  {
    from: "Nashik",
    to: "Shirdi",
    slug: "nashik-to-shirdi-cab",
    note: "Pilgrimage and airport connections",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Mention whether your destination is the temple area, accommodation or Shirdi Airport, and include any additional stops.",
  },
  {
    from: "Pune",
    to: "Nashik",
    slug: "pune-to-nashik-cab",
    note: "Return and pickup enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share a Pune neighbourhood or airport pickup point, Nashik destination and your preferred schedule.",
  },
  {
    from: "Mumbai",
    to: "Nashik",
    slug: "mumbai-to-nashik-cab",
    note: "City and airport pickup requests",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share a Mumbai neighbourhood or airport terminal, flight details when relevant, and your Nashik destination.",
  },
  {
    from: "Mumbai",
    to: "Pune",
    slug: "mumbai-to-pune-cab",
    note: "Metro-to-metro journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share the exact Mumbai and Pune addresses, departure window, passenger count and any stop requests.",
  },
  {
    from: "Pune",
    to: "Mumbai",
    slug: "pune-to-mumbai-cab",
    note: "Metro-to-metro journey enquiries",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Tell us if your Mumbai destination is a neighbourhood, business address or airport terminal, and include the Pune pickup area.",
  },
  {
    from: "Pune",
    to: "Chhatrapati Sambhajinagar",
    slug: "pune-to-sambhajinagar-cab",
    note: "Regional city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share the pickup and destination areas, date and whether you need a one-way or return journey.",
  },
  {
    from: "Chhatrapati Sambhajinagar",
    to: "Pune",
    slug: "sambhajinagar-to-pune-cab",
    note: "Regional city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Include the city or airport pickup point, Pune destination and any schedule constraints.",
  },
  {
    from: "Chhatrapati Sambhajinagar",
    to: "Ahilyanagar",
    slug: "sambhajinagar-to-ahilyanagar-cab",
    note: "Regional intercity enquiry",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Specify both addresses and any planned heritage or pilgrimage stops along the way.",
  },
  {
    from: "Ahilyanagar",
    to: "Chhatrapati Sambhajinagar",
    slug: "ahilyanagar-to-sambhajinagar-cab",
    note: "Regional intercity enquiry",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share the travel date, exact addresses and preferred arrival time.",
  },
  {
    from: "Ahilyanagar",
    to: "Shirdi",
    slug: "ahilyanagar-to-shirdi-cab",
    note: "Pilgrimage area connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Mention whether the destination is the temple area, accommodation or Shirdi Airport.",
  },
  {
    from: "Shirdi",
    to: "Ahilyanagar",
    slug: "shirdi-to-ahilyanagar-cab",
    note: "Regional connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Include your Shirdi pickup location, destination address and any additional stops.",
  },
  {
    from: "Mumbai",
    to: "Shirdi",
    slug: "mumbai-to-shirdi-cab",
    note: "City to pilgrimage destination",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Share the Mumbai pickup area and expected arrival time in Shirdi. Mention whether the journey includes a return.",
  },
  {
    from: "Shirdi",
    to: "Mumbai",
    slug: "shirdi-to-mumbai-cab",
    note: "Pilgrimage to city connection",
    time: "Confirm estimated time for your pickup and stops",
    details:
      "Provide the Shirdi pickup time and exact Mumbai destination, including the airport terminal if relevant.",
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
    checklist: string[];
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
    ],
    checklist: [
      "Pickup address or train/flight arrival detail",
      "Every planned stop in visit order",
      "Preferred start time and return window",
      "Luggage, accessibility or waiting requirements",
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
    ],
    checklist: [
      "Full neighbourhood, building or pickup gate",
      "Correct airport and terminal (BOM or NMI)",
      "Flight number and scheduled time, if relevant",
      "Traffic buffer and any additional stops",
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
    ],
    checklist: [
      "Pune pickup locality or airport details",
      "Destination addresses and sightseeing stops",
      "One-way or return request and waiting needs",
      "Seasonal road, access and venue checks",
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
    ],
    checklist: [
      "City, railway or IXU airport pickup details",
      "Which heritage site(s) are on the itinerary",
      "Visit date and expected time at each stop",
      "Return, overnight and luggage requirements",
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
    ],
    checklist: [
      "Exact town, village or attraction entrance",
      "One-way, return or multi-stop itinerary",
      "Expected visit duration and return time",
      "Road and access guidance for your travel date",
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
    ],
    checklist: [
      "Flight details or exact road pickup point",
      "Temple, hotel or onward destination",
      "Visit date and expected arrival time",
      "Other regional stops and return plan",
    ],
  },
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
