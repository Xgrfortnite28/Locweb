export const siteConfig = {
  name: "Best Plumber & Septic",
  phone: "(470) 210-2112",
  phoneHref: "tel:4702102112",
  address: "4045 Five Forks Trickum Rd SW #180, Lilburn, GA 30047",
  mapsHref:
    "https://maps.google.com/?q=4045%20Five%20Forks%20Trickum%20Rd%20SW%20%23180%2C%20Lilburn%2C%20GA%2030047",
  tagline: "Reliable plumbing and septic service in Lilburn, Georgia.",
  serviceAreas: ["Lilburn", "Tucker", "Stone Mountain", "Snellville", "Norcross"],
  services: [
    {
      title: "Drain Cleaning",
      description:
        "Kitchen sinks, shower drains, laundry drains, and stubborn blockages.",
      icon: "🌀",
    },
    {
      title: "Leak Repair",
      description:
        "Faucets, under-sink leaks, damaged fittings, and hidden drips.",
      icon: "💧",
    },
    {
      title: "Pipe Repair & Replacement",
      description:
        "Cracked sections, damaged drain lines, and durable repair work.",
      icon: "🔧",
    },
    {
      title: "Water Heater Service",
      description:
        "Performance checks, repair support, and hot water service requests.",
      icon: "♨️",
    },
    {
      title: "Water Pressure Repair",
      description:
        "Low flow troubleshooting, worn valves, and pressure balancing.",
      icon: "🚿",
    },
    {
      title: "Septic Services",
      description:
        "Septic-related service requests, support, and inspection-style visits.",
      icon: "🛢️",
    },
    {
      title: "Fixture & Faucet Repair",
      description:
        "Toilets, flush handles, sinks, faucets, and everyday fixture issues.",
      icon: "🚰",
    },
    {
      title: "Sump Pump Repair",
      description:
        "Float switch issues, activation problems, and testing after repair.",
      icon: "⚙️",
    },
  ],
  reviews: [
    {
      name: "Eric Robertson",
      initials: "ER",
      text: "The kitchen faucet had been dripping for several days and I couldn’t fix it myself. They replaced the worn washer efficiently and checked the other taps.",
    },
    {
      name: "Axel Owens",
      initials: "AO",
      text: "The washing machine drain clogged mid cycle. They removed the blockage and flushed the system thoroughly. Efficient and reliable repair.",
    },
    {
      name: "Sarah Young",
      initials: "SY",
      text: "My basement sump pump wasn’t activating properly. They replaced the float switch and tested it under load. It works perfectly now.",
    },
  ],
  faqs: [
    {
      question: "What services can I request online?",
      answer:
        "You can request drain cleaning, leak repair, pipe work, water heater service, septic service, fixture repair, and more.",
    },
    {
      question: "How does online booking work?",
      answer:
        "Choose your service, date, and preferred arrival window. After you submit, the team can review the request and follow up if needed.",
    },
    {
      question: "Do you serve homes outside Lilburn?",
      answer:
        "The site is positioned for Lilburn and nearby areas. You can confirm your service address when you request an appointment.",
    },
  ],
} as const;

export const bookingWindowsByWeekday: Record<number, string[]> = {
  0: [],
  1: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  2: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  3: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  4: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  5: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"],
  6: ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"],
};

export const bookingLimits = {
  daysAhead: 60,
};
