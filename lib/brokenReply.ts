// Fake broken answer for the forced-failure trigger. It looks like a planner
// reply, but the app cannot turn it into cards: the stay has no listing title
// and a price that is not a number, the experience is empty, and the food
// spot is missing altogether.
export const brokenReply = {
  intro: "Here's your Kyoto weekend for 11 – 13 Apr.",
  stay: {
    type: "stay",
    "Option ID": "S1",
    "Listing Title": null,
    Neighbourhood: "Gion",
    "Price per Night (USD)": "n/a",
  },
  experience: null,
};
