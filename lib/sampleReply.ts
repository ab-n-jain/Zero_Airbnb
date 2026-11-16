import type { PlanReply } from "./types";

// Fake sample reply, typed by hand from one row per sheet of the
// "Kyoto Weekend Prototype Content Pack" workbook:
//   Stays       S1  Restored machiya townhouse near Gion
//   Experiences E1  Tea ceremony in a 100-year-old machiya
//   Food        F1  Menya Inoichi
// The pack has no review count for experiences and no signature dish for
// food spots, so those fields are null and the cards show filler text.
// It also has no photos, so `art` picks a placeholder illustration.
export const FILLER = "To be added";

export const sampleReply: PlanReply = {
  intro:
    "Here's your Kyoto weekend for 11 – 13 Apr: a stay in Gion, one thing to do and one place to eat.",
  stay: {
    type: "stay",
    name: "Restored machiya townhouse near Gion",
    area: "Gion",
    kind: "Entire townhouse",
    host: "Kenji",
    pricePerNight: 168,
    total: 366,
    rating: 4.92,
    reviews: 214,
    guestFavorite: false,
    perks: ["Private garden and cedar soaking tub"],
    dates: "11 – 13 Apr",
    nights: 2,
    art: "machiya",
  },
  experience: {
    type: "experience",
    name: "Tea ceremony in a 100-year-old machiya",
    category: "Culture",
    startTime: "10:30 AM",
    day: "12 Apr",
    duration: "2 hrs",
    meetingPoint: "Outside Gion-Shijo Station, exit 6",
    host: "Mei",
    pricePerGuest: 58,
    rating: 4.96,
    reviews: null,
    availability: "Spots open",
    art: "tea",
  },
  food: {
    type: "food",
    dish: null,
    place: "Menya Inoichi",
    area: "Gion",
    meal: "Dinner",
    priceBand: "$",
    cuisine: "Ramen",
    walkFromStay: "8 min walk",
    tip: "No reservations - arrive before 18:00",
    art: "ramen",
  },
};
