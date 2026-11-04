export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  publishedLabel: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "nashik-to-trimbakeshwar-travel-guide",
    title: "Planning a Nashik to Trimbakeshwar visit",
    summary:
      "A practical checklist for planning the road journey, temple-area arrival and return from Nashik to Trimbakeshwar.",
    image: "/images/blogs/nashik-to-trimbakeshwar-travel-guide.jpg",
    imageAlt: "Trimbakeshwar Temple and its surrounding hills",
    publishedLabel: "Nashik journey guide",
    sections: [
      {
        heading: "Set the visit plan first",
        paragraphs: [
          "Choose your pickup point in Nashik, the date, and whether you need a one-way drop or a return journey. If you are visiting the temple, check current entry and local guidance through the relevant official channels before setting out.",
          "Tell the cab team the time you hope to arrive and whether you expect to stop anywhere else. Availability, waiting arrangements and trip terms need direct confirmation.",
        ],
      },
      {
        heading: "Share a precise meeting point",
        paragraphs: [
          "Use a full address, hotel name or clear landmark for the pickup. For the destination, say whether you need the temple area, a nearby accommodation or another specific stop.",
          "Do not assume a cab can enter a restricted or crowded zone. Confirm an appropriate drop and return meeting point for your travel date.",
        ],
      },
      {
        heading: "Allow room for local conditions",
        paragraphs: [
          "Traffic, weather, temple activity and event-day access can affect the plan. Keep a buffer in your schedule and check for current road or visitor notices before travel.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I request a return cab?",
        answer:
          "Yes. Include your preferred return time in the enquiry; the team must confirm availability and waiting terms.",
      },
      {
        question: "Can I add Anjaneri or another stop?",
        answer:
          "List each stop in order and ask the team to review the route and time needed.",
      },
    ],
  },
  {
    slug: "nashik-travel-guide-first-time-visitors",
    title: "A first-time visitor’s guide to getting around Nashik",
    summary:
      "Use a clear pickup point and a short priority list to make a Nashik city visit easier to plan.",
    image: "/images/blogs/nashik-travel-guide-first-time-visitors.jpg",
    imageAlt: "Godavari riverfront and ghats in Nashik",
    publishedLabel: "Nashik city guide",
    sections: [
      {
        heading: "Group nearby stops together",
        paragraphs: [
          "Panchavati, Ramkund and other central Nashik stops can form one part of an itinerary. Share the places you want to visit in order instead of sending only a broad “Nashik sightseeing” request.",
          "For destinations outside the city centre, such as Trimbakeshwar, Igatpuri or Anjaneri, treat the outing as a separate road plan and ask about the time and return arrangement.",
        ],
      },
      {
        heading: "Choose a clear pickup and drop",
        paragraphs: [
          "Station, airport, hotel and neighbourhood pickups each need a practical meeting point. Add a train or flight detail when it will help identify your arrival, and keep your phone available for the driver or owner to confirm arrangements.",
          "The website records an enquiry; it does not confirm a vehicle, fare or pickup.",
        ],
      },
      {
        heading: "Keep current visitor information handy",
        paragraphs: [
          "Temple access, opening hours, local traffic and event arrangements may change. Check the attraction or local authority’s current guidance before travelling.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I combine local Nashik stops with a longer route?",
        answer:
          "You can request it. Include all stops and the preferred return time so the team can check the plan.",
      },
      {
        question: "Does the enquiry confirm a fare?",
        answer:
          "No. Fare, availability and trip terms are confirmed directly by Vistar Cabs.",
      },
    ],
  },
  {
    slug: "nashik-kumbh-mela-2026-2028-travel-planning",
    title: "Nashik–Trimbakeshwar Simhastha: plan your journey around the event",
    summary:
      "The official Simhastha window runs from October 2026 to July 2028, with key bathing dates in August and September 2027. Check current advisories before travel.",
    image: "/images/blogs/nashik-kumbh-mela-2026-2028-travel-planning.jpg",
    imageAlt: "A gathering at a Godavari ghat during a Nashik religious event",
    publishedLabel: "Simhastha travel guide · check official updates",
    sections: [
      {
        heading: "Know the event window and locations",
        paragraphs: [
          "The official Simhastha portal lists the event window as 31 October 2026 to 24 July 2028, with the major Mela period from 15 June to 30 September 2027. The pilgrimage centres include Nashik’s Godavari ghats and Ramtirth, and Kushavarta Tirth in Trimbakeshwar.",
          "Event schedules, road access and local arrangements can change. Check official updates and travel advisories again before setting out.",
        ],
      },
      {
        heading: "Published Amrut Snan dates",
        paragraphs: [
          "The official calendar lists Amrut Snan dates on 2 August and 31 August 2027, followed by 11 September 2027 at Ramtirth in Nashik and 12 September 2027 at Kushavarta Tirth in Trimbakeshwar.",
          "These dates are published by the official portal; event timings, access or transport operations may still be updated.",
        ],
      },
      {
        heading: "Prepare transport details early",
        paragraphs: [
          "When asking about a cab, include your exact starting address, intended ghat or temple-area destination, travel date, passenger count and preferred return plan. For airport or railway arrivals, share the flight or train details and a clear meeting point.",
          "Large events can involve traffic management, access controls and route changes. Vistar Cabs can only confirm a specific cab request directly; it cannot guarantee event access or a pickup inside a restricted zone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where can I confirm the latest dates?",
        answer:
          "Check the official Simhastha portal and its live calendar for the latest event dates, timings and travel advisories.",
      },
      {
        question:
          "Which places are central to the Nashik and Trimbakeshwar events?",
        answer:
          "The plan discusses Nashik’s Godavari ghats, including Ramkund, and Kushavarta Tirtha in Trimbakeshwar.",
      },
      {
        question: "Does Vistar Cabs guarantee access on a bathing day?",
        answer:
          "No. Vehicle availability, lawful access, pickup points and traffic controls must be confirmed for the requested date.",
      },
    ],
  },
  {
    slug: "nashik-to-mumbai-and-pune-by-cab",
    title: "Planning a Nashik journey to Mumbai or Pune",
    summary:
      "What to include in an intercity cab request from Nashik when your pickup, stops or onward connection matters.",
    image: "/images/blogs/nashik-to-mumbai-and-pune-by-cab.jpg",
    imageAlt: "A highway winding through a hilly landscape",
    publishedLabel: "Intercity journey guide",
    sections: [
      {
        heading: "Make the origin and destination exact",
        paragraphs: [
          "“Mumbai” or “Pune” covers a large area. Include the neighbourhood, hotel, office, station or airport terminal so the destination is specific.",
          "If you need a stop or a second pickup, list it with the preferred order and estimated wait. Ask the team whether the proposed route can be arranged.",
        ],
      },
      {
        heading: "Choose one-way or return clearly",
        paragraphs: [
          "Share the outbound date and time, and include return timing if you need the same request to cover a return. A return vehicle and waiting time are not guaranteed until confirmed.",
          "Leave time for traffic and any planned stops. Travel duration varies with the route and current road conditions.",
        ],
      },
      {
        heading: "Confirm the details before departure",
        paragraphs: [
          "Before travel, confirm the final pickup, destination, vehicle, fare, waiting terms and payment arrangements directly with Vistar Cabs. A website enquiry is a request, not a confirmed booking.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I request a one-way ride?",
        answer:
          "Yes. Select the one-way trip option and provide the exact origin, destination and date.",
      },
      {
        question: "Can I add a Mumbai or Pune airport stop?",
        answer:
          "Include the airport, terminal, flight details and order of stops in your request; the team will confirm feasibility.",
      },
    ],
  },
  {
    slug: "how-to-plan-an-airport-cab-pickup",
    title: "How to plan an airport cab pickup",
    summary:
      "A short checklist for a clearer airport transfer enquiry, from flight details to the final meeting point.",
    image: "/images/blogs/how-to-plan-an-airport-cab-pickup.jpg",
    imageAlt: "Cabs waiting at an airport pickup area",
    publishedLabel: "Airport transfer checklist",
    sections: [
      {
        heading: "Include the flight and terminal",
        paragraphs: [
          "Share the airport, flight number, arrival or departure time and terminal when known. This helps the team discuss the request and the meeting point.",
          "For a pickup, state the onward address. For a drop, add your pickup address and the flight departure time.",
        ],
      },
      {
        heading: "Agree on a meeting point",
        paragraphs: [
          "Airport pickup rules, curbsides and terminal access can change. Confirm the exact meeting point and waiting arrangement directly before you travel.",
          "Keep your phone on and available around arrival time in case the owner needs to confirm details.",
        ],
      },
      {
        heading: "Send a complete enquiry",
        paragraphs: [
          "Add the travel date, pickup time, passenger count and a contact number. The website sends an enquiry for follow-up; it does not provide real-time flight tracking or an instant booking confirmation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to provide a flight number?",
        answer:
          "It is optional, but useful for an airport pickup request when available.",
      },
      {
        question: "Is the pickup automatically confirmed after submitting?",
        answer:
          "No. Vistar Cabs will contact you to confirm availability, fare, meeting point and other terms.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
