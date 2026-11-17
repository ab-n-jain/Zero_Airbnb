import type { PlanReply } from "./types";

type Kind = "string" | "number";
type Shape = Record<string, Kind | "string?">;

// Every key a card reads, and what it must hold. "string?" may be blank (null).
const STAY: Shape = {
  "Option ID": "string",
  "Listing Title": "string",
  "Property Type": "string",
  Neighbourhood: "string",
  Nights: "number",
  "Price per Night (USD)": "number",
  "Total for 2 Nights (USD)": "number",
  "Guest Rating": "number",
  "Review Count": "number",
  "Host First Name": "string",
  Highlight: "string",
  "Check-in Date": "string",
  "Check-out Date": "string",
  art: "string",
};

const EXPERIENCE: Shape = {
  "Option ID": "string",
  "Experience Title": "string",
  Category: "string",
  "Host First Name": "string?",
  Date: "string",
  "Start Time": "string",
  "Duration (hours)": "number",
  "Price per Guest (USD)": "number",
  "Total for 2 Guests (USD)": "number",
  Rating: "number",
  "Meeting Point": "string",
  Availability: "string",
  art: "string",
};

const FOOD: Shape = {
  "Option ID": "string",
  "Place Name": "string",
  Cuisine: "string",
  Neighbourhood: "string",
  Meal: "string",
  "Price Level": "string",
  "Est. Cost for 2 (USD)": "number",
  "Walk from Stay (min)": "number",
  "Booking Note": "string?",
  art: "string",
};

function matches(item: unknown, type: string, shape: Shape) {
  if (typeof item !== "object" || item === null) return false;
  const record = item as Record<string, unknown>;
  if (record.type !== type) return false;
  return Object.entries(shape).every(([key, kind]) => {
    const value = record[key];
    if (kind === "string?") return value === null || typeof value === "string";
    return typeof value === kind;
  });
}

// True only when the answer holds all three items with every field the cards need.
export function isPlanReply(data: unknown): data is PlanReply {
  if (typeof data !== "object" || data === null) return false;
  const reply = data as Record<string, unknown>;
  return (
    typeof reply.intro === "string" &&
    matches(reply.stay, "stay", STAY) &&
    matches(reply.experience, "experience", EXPERIENCE) &&
    matches(reply.food, "food", FOOD)
  );
}
