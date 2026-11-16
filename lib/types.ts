// Shape of one planner reply: always one stay, one experience and one food spot.
// Each item's keys are the column names of its sheet in the content pack
// workbook. `type` and `art` are the only keys the workbook does not have.
// A cell the workbook leaves blank is null and shows as filler text.

export type Stay = {
  type: "stay";
  "Option ID": string;
  "Listing Title": string;
  "Property Type": string;
  Neighbourhood: string;
  Nights: number;
  "Price per Night (USD)": number;
  "Total for 2 Nights (USD)": number;
  "Guest Rating": number;
  "Review Count": number;
  "Host First Name": string;
  Highlight: string;
  "Check-in Date": string;
  "Check-out Date": string;
  art: string;
};

export type Experience = {
  type: "experience";
  "Option ID": string;
  "Experience Title": string;
  Category: string;
  "Host First Name": string | null;
  Date: string;
  "Start Time": string;
  "Duration (hours)": number;
  "Price per Guest (USD)": number;
  "Total for 2 Guests (USD)": number;
  Rating: number;
  "Meeting Point": string;
  Availability: string;
  art: string;
};

export type Food = {
  type: "food";
  "Option ID": string;
  "Place Name": string;
  Cuisine: string;
  Neighbourhood: string;
  Meal: string;
  "Price Level": string;
  "Est. Cost for 2 (USD)": number;
  "Walk from Stay (min)": number;
  "Booking Note": string | null;
  art: string;
};

export type PlanReply = {
  intro: string;
  stay: Stay;
  experience: Experience;
  food: Food;
};
