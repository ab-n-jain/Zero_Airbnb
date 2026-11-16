# Kyoto weekend planner

A chat prototype. One trip request returns one stay, one experience and one food spot for a weekend in Kyoto. Sample data, no login.

![Chat thread showing the stay, experience and food cards](docs/screenshot.png)

## What it does

- **Chat page:** a header, a scrolling thread and a send button.
- **Thinking state:** on send, the input and button lock and three pulsing dots show in the reply bubble until the cards arrive.
- **Mock reply:** `POST /api/plan` waits 1.8 seconds and returns the same sample reply for any message.
- **Three cards**, each its own component with its own layout:

| Card | Image box | Biggest text | Accent |
| --- | --- | --- | --- |
| Stay | Top, full width | Listing title | Rose |
| Experience | Left side | Start time | Teal |
| Food spot | Right side, round | Cuisine | Amber |

On a laptop the stay card sits beside the other two. On a phone the cards stack in the same order.

## Sample data

The reply in `lib/sampleReply.ts` is typed by hand from one row per sheet of the "Kyoto Weekend Prototype Content Pack" workbook:

| Sheet | Option ID | Row |
| --- | --- | --- |
| Stays | S1 | Restored machiya townhouse near Gion |
| Experiences | E1 | Tea ceremony in a 100-year-old machiya |
| Food | F1 | Menya Inoichi |

Each item's keys are its sheet's column names (`Listing Title`, `Experience Title`, `Place Name`, `Neighbourhood`, `Price per Night (USD)` and so on), and the values are the row's cells as the workbook has them. The cards format them for display, for example `2025-04-12` as "12 Apr" and `10:30` as "10:30 AM".

Two keys are not workbook columns: `type` labels the card and `art` picks a placeholder illustration, because the pack has no photos. A blank cell shows as the filler text "To be added"; these three rows have no blank cells.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000 and send a trip request.

## Where things are

- `components/Chat.tsx`: the thread, the input lock and the request
- `components/ThinkingBubble.tsx`: the pulsing dots
- `components/cards/`: `StayCard`, `ExperienceCard`, `FoodCard` and the placeholder art
- `app/api/plan/route.ts`: the mock reply
- `lib/sampleReply.ts`, `lib/types.ts`: the sample reply and its shape
