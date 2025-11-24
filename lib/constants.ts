export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "CES (Consumer Electronics Show) 2026",
    slug: "ces-2026",
    location: "Las Vegas, NV, USA",
    date: "2026-01-06",
    time: "08:00 AM",
  },
  {
    image: "/images/event3.png",
    title: "Mobile World Congress (MWC) 2026",
    slug: "mwc-2026",
    location: "Barcelona, Spain",
    date: "2026-03-02",
    time: "09:30 AM",
  },
  {
    image: "/images/event4.png",
    title: "International JavaScript Conference London 2026",
    slug: "ijc-london-2026",
    location: "London, UK",
    date: "2026-05-11",
    time: "10:00 AM",
  },
  {
    image: "/images/event5.png",
    title: "React Summit Amsterdam 2026",
    slug: "react-summit-amsterdam-2026",
    location: "Amsterdam, Netherlands",
    date: "2026-06-12",
    time: "09:00 AM",
  },
  {
    image: "/images/event6.png",
    title: "LEAP 2026 Tech Conference",
    slug: "leap-2026",
    location: "RECC Malham, Saudi Arabia",
    date: "2026-04-13",
    time: "10:00 AM",
  },
];
