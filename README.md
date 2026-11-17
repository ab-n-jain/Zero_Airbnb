# Kyoto weekend planner

A chat prototype. One trip request returns one stay, one experience and one food spot for a weekend in Kyoto. Sample data, no login.

**Live prototype:** https://zeroairbnb.vercel.app

![Chat thread showing the stay, experience and food cards](docs/screenshot.png)

## Moderated session checklist

Rules copied from "Moderated Session Prototype Requirements: Trip-Planner Chat". A tick means the rule was run and seen to pass on that setup.

**How it was tested:** a production build of this repo running locally, in a browser window with no cookies, saved logins or storage (the same as a private or incognito window). The phone setup is an emulated iPhone 14 (390px wide, Safari user agent, touch) and the laptop setup is a 1440px window, both in Chromium. It has not yet been run on a real iPhone in Safari, on a MacBook in Chrome, or against the Vercel link.

**Request typed:** `Weekend for two near Gion, tea and great ramen`

| Rule | Phone (390px) | Laptop (1440px) | What was seen |
| --- | --- | --- | --- |
| One typed trip request shows a thinking state first | ✅ | ✅ | Three pulsing dots, input locked, no cards yet |
| Then 3 of 3 cards show: a stay card, an Experience card and a food card | ✅ | ✅ | 3 of 3 cards |
| The three cards look clearly different, not one layout with the text swapped | ✅ | ✅ | Stay: image on top, title biggest, rose. Experience: image on the left, start time biggest, teal. Food: round image on the right, cuisine biggest, amber |
| At phone width nothing is cut off and nothing needs sideways scrolling | ✅ | n/a | No element past the screen edge, no clipped text, no sideways scroll |
| The forced failure shows a friendly message and a "Try again" button inside the assistant bubble | ✅ | ✅ | "We couldn't put your Kyoto weekend together." with the button inside the bubble |
| The chat is never empty: at the failure, when "Try again" is pressed and after it. 0 blank-chat moments | ✅ | ✅ | 0 blank samples, checked every 30 ms across both paths (about 300 samples per setup) |
| Pressing "Try again" brings the three cards back | ✅ | ✅ | Dots, then 3 of 3 cards; the guest's message is not repeated |
| The page shows visible wording that the trips are sample data and nothing is booked | ✅ | ✅ | "These trips are sample data for a prototype. Nothing is booked." under the message box |
| The failure can be triggered without editing code | ✅ | ✅ | "Force failure" switch in the header, then send any message |
| Opening the link needs no install, no login and no configuration | ⬜ | ⬜ | The app itself has no login and needs no setup. Not ticked until the Vercel link is opened in a private window |
| Only the production `*.vercel.app` domain is shared, and it loads in a private window without a login | ⬜ | ⬜ | Deployed at https://zeroairbnb.vercel.app. Not ticked until it has been opened in a private window on each setup |
| The newest deployment shows as finished before testing | ⬜ | ⬜ | Check the Deployments tab in Vercel before testing the live link |
| The message sharing the link says which request to type and how to trigger the failure | ⬜ | ⬜ | The message is written under "Team message" below and says both; not ticked until it is posted with the live link |

### Screenshots from the run

| | Phone | Laptop |
| --- | --- | --- |
| Three cards | [phone-cards.png](docs/session/phone-cards.png) | [laptop-cards.png](docs/session/laptop-cards.png) |
| Error bubble | [phone-error.png](docs/session/phone-error.png) | [laptop-error.png](docs/session/laptop-error.png) |
| Cards after Try again | [phone-retry.png](docs/session/phone-retry.png) | [laptop-retry.png](docs/session/laptop-retry.png) |

The phone card screenshots are taller than the phone screen so all three cards fit in one image; on the device the guest scrolls the thread to see them.

## Team message

To post in #search-trip-planner on Slack for Hannah Brooks, Tomás Herrera, Priya Raman and Daniel Okafor, once the production Vercel link is live and has been opened in a private window. Replace the link placeholder with the production `*.vercel.app` domain, never a preview link.

> Hi Hannah, Tomás, Priya and Daniel. The trip-planner chat prototype is ready for Thursday's dry run (13 March), ahead of the first guest sessions on 1 April.
>
> Link: https://zeroairbnb.vercel.app
>
> It opens with no login or install, on phone and laptop. The trips are sample data and nothing is booked.
>
> To see the cards: type "Weekend for two near Gion, tea and great ramen" and press Send.
>
> To see the failure: turn on "Force failure" in the header, send any request, then press "Try again".
>
> Tell me here if anything looks off.

## What it does

- **Chat page:** a header, a scrolling thread and a send button.
- **Thinking state:** on send, the input and button lock and three pulsing dots show in the reply bubble until the cards arrive.
- **Mock reply:** `POST /api/plan` waits 1.8 seconds and returns the same sample reply for any message.
- **Forced failure:** turn on the "Force failure" switch in the header, then send any message; that one request gets a broken answer (`"forceFail": true`), and the switch turns itself off.
- **Three cards**, each its own component with its own layout:

| Card | Image box | Biggest text | Accent |
| --- | --- | --- | --- |
| Stay | Top, full width | Listing title | Rose |
| Experience | Left side | Start time | Teal |
| Food spot | Right side, round | Cuisine | Amber |

On a laptop the stay card sits beside the other two. On a phone the cards stack in the same order.

## When an answer breaks

A broken answer shows a friendly bubble in place of the thinking dots. Try again sends the same request without the broken answer, so the dots play and the three cards appear.

The error bubble, after a forced failure:

![Error bubble with the message and a Try again button](docs/screenshot-error.png)

The three cards, after clicking Try again:

![Stay, experience and food cards shown after a retry](docs/screenshot-retry.png)

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

All styling is Tailwind CSS. The colours, fonts and the dots animation are defined once in `app/globals.css`.

- `components/Chat.tsx`: the thread, the input lock and the request
- `components/ThinkingBubble.tsx`: the pulsing dots
- `components/ErrorBubble.tsx`: the message and Try again button shown when an answer is broken
- `components/bubble.ts`: the bubble shape shared by every assistant reply
- `components/cards/`: `StayCard`, `ExperienceCard`, `FoodCard` and the placeholder art
- `app/api/plan/route.ts`: the mock reply
- `lib/sampleReply.ts`, `lib/types.ts`: the sample reply and its shape
- `lib/brokenReply.ts`, `lib/validateReply.ts`: the broken answer and the check that catches it
