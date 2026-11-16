// Shape of one planner reply: always one stay, one experience and one food spot.
// A field the content pack has no value for is null and shows as filler text.

export type Stay = {
  type: "stay";
  name: string;
  area: string;
  kind: string;
  host: string;
  pricePerNight: number;
  total: number;
  rating: number;
  reviews: number;
  guestFavorite: boolean;
  perks: string[];
  dates: string;
  nights: number;
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
