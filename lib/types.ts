// Shape of one planner reply: always one stay, one experience and one food spot.
// A field the content pack has no value for is null and shows as filler text.

// Stay keys are the column names of the workbook's Stays sheet.
// `type` and `art` are the only keys the workbook does not have.
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
  name: string;
  category: string;
  startTime: string;
  day: string;
  duration: string;
  meetingPoint: string;
  host: string | null;
  pricePerGuest: number;
  rating: number;
  reviews: number | null;
  availability: string;
  art: string;
};

export type Food = {
  type: "food";
  dish: string | null;
  place: string;
  area: string;
  meal: string;
  priceBand: string;
  cuisine: string;
  walkFromStay: string;
  tip: string | null;
  art: string;
};

export type PlanReply = {
  intro: string;
  stay: Stay;
  experience: Experience;
  food: Food;
};
