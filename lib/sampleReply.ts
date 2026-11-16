import type { PlanReply } from "./types";

// Fake sample reply, typed by hand from one row per sheet of the
// "Kyoto Weekend Prototype Content Pack" workbook:
//   Stays       S1  Restored machiya townhouse near Gion
//   Experiences E1  Tea ceremony in a 100-year-old machiya
//   Food        F1  Menya Inoichi
// Every item's keys are its sheet's column names, and the values are the
// row's cells as the workbook has them. The pack has no photos, so `art`
// picks a placeholder illustration. A blank cell would be null and show
// FILLER on the card; these three rows have no blank cells.
export const FILLER = "To be added";

export const sampleReply: PlanReply = {
  intro:
    "Here's your Kyoto weekend for 11 – 13 Apr: a stay in Gion, one thing to do and one place to eat.",
  // Stays sheet, row S1. Keys are the sheet's column names.
  stay: {
    type: "stay",
    "Option ID": "S1",
    "Listing Title": "Restored machiya townhouse near Gion",
    "Property Type": "Entire townhouse",
    Neighbourhood: "Gion",
    Nights: 2,
    "Price per Night (USD)": 168,
    "Total for 2 Nights (USD)": 366,
    "Guest Rating": 4.92,
    "Review Count": 214,
    "Host First Name": "Kenji",
    Highlight: "Private garden and cedar soaking tub",
    "Check-in Date": "2025-04-11",
    "Check-out Date": "2025-04-13",
    art: "machiya",
  },
  // Experiences sheet, row E1.
  experience: {
    type: "experience",
    "Option ID": "E1",
    "Experience Title": "Tea ceremony in a 100-year-old machiya",
    Category: "Culture",
    "Host First Name": "Mei",
    Date: "2025-04-12",
    "Start Time": "10:30",
    "Duration (hours)": 2,
    "Price per Guest (USD)": 58,
    "Total for 2 Guests (USD)": 116,
    Rating: 4.96,
    "Meeting Point": "Outside Gion-Shijo Station, exit 6",
    Availability: "Spots open",
    art: "tea",
  },
  // Food sheet, row F1.
  food: {
    type: "food",
    "Option ID": "F1",
    "Place Name": "Menya Inoichi",
    Cuisine: "Ramen",
    Neighbourhood: "Gion",
    Meal: "Dinner",
    "Price Level": "$",
    "Est. Cost for 2 (USD)": 34,
    "Walk from Stay (min)": 8,
    "Booking Note": "No reservations - arrive before 18:00",
    art: "ramen",
  },
};
