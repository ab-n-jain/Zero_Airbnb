**Live prototype:** https://zeroairbnb.vercel.app

# Kyoto weekend planner

A chat prototype. One trip request returns one stay, one experience and one food spot for a weekend in Kyoto. Sample data, no login.

![Chat thread showing the stay, experience and food cards](docs/screenshot.png)

## Moderated session checklist

Rules copied from "Moderated Session Prototype Requirements: Trip-Planner Chat". A tick means the rule was run and seen to pass on that setup, and every line names what backs it: a screenshot for thirteen lines, a file for one and text for one.

**How it was tested:** on the live link in a fresh browser window with no cookies or logins, using an emulated iPhone 14 and a 1440px laptop window in Chromium, not real devices. Typed request: `Weekend for two near Gion, tea and great ramen`. Method, timings and measurements are in [docs/testing-notes.md](docs/testing-notes.md).

| Rule | Phone | Laptop | Screenshot | What was seen |
| --- | --- | --- | --- | --- |
| Opening the link needs no install, no login and no configuration | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | The page loaded straight into the chat: no login page, no redirect, no password field, in a window with no cookies |
| Only the production `*.vercel.app` domain is shared, and it loads in a private window without a login | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | https://zeroairbnb.vercel.app is the only link in this README and in the team message |
| The newest deployment is finished before testing | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | Vercel showed each deployment finished before the test that used it. Times in [testing notes](docs/testing-notes.md#which-deployment-was-live) |
| One typed trip request shows a thinking state first | ✅ | ✅ | [phone](docs/session/phone-thinking.png), [laptop](docs/session/laptop-thinking.png) | Three pulsing dots, input locked, no cards yet |
| Then 3 of 3 cards show: a stay card, an Experience card and a food card | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | 3 of 3 cards |
| The three cards look clearly different, not one layout with the text swapped | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | Stay: image on top, title biggest, rose. Experience: image on the left, start time biggest, teal. Food: round image on the right, cuisine biggest, amber |
| At phone width nothing is cut off and nothing needs sideways scrolling | ✅ | n/a | [phone](docs/session/phone-cards.png), [phone](docs/session/phone-error.png) | No element past the screen edge, no clipped text, no sideways scroll |
| The forced failure shows a friendly message and a "Try again" button inside the assistant bubble | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | "We couldn't put your Kyoto weekend together." with the button inside the bubble |
| The chat is never empty at the moment of failure | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | The error bubble takes the place of the dots |
| The chat is never empty at the moment "Try again" is pressed | ✅ | ✅ | [phone](docs/session/phone-retry-thinking.png), [laptop](docs/session/laptop-retry-thinking.png) | The dots take the place of the error bubble; the guest's message stays |
| The chat is never empty after "Try again", and the three cards come back | ✅ | ✅ | [phone](docs/session/phone-retry-sequence.png), [laptop](docs/session/laptop-retry-sequence.png) | Three frames from one run in a single image: the error bubble, the dots after "Try again" is pressed, then 3 of 3 cards with the guest's message shown once |
| 0 blank-chat moments across both paths | ✅ | ✅ | No screenshot. Backed by a file: [blank-check.json](docs/session/blank-check.json) | 0 blank of 304 samples on the phone setup and 0 blank of 305 on the laptop setup. Method and full table in [testing notes](docs/testing-notes.md#blank-chat-measurement) |
| The page shows visible wording that the trips are sample data and nothing is booked | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | "These trips are sample data for a prototype. Nothing is booked." under the message box, on every screen |
| The failure can be triggered without editing code | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | "Force failure" switch in the header, then send any message |
| The message sharing the link says which request to type and how to trigger the failure | ✅ | ✅ | No screenshot. Backed by text: "Team message" below | The message says both and carries the production link. It still has to be posted in Slack by a person |

### Screenshot mapping

Every ticked checklist line, grouped by the committed image behind it. Each row has one image from the phone setup and one from the laptop setup, all in `docs/session/`.

| Image | What it shows | Checklist lines it supports |
| --- | --- | --- |
| [phone-open.png](docs/session/phone-open.png), [laptop-open.png](docs/session/laptop-open.png) | First load of the live link | No install, no login, no configuration; production domain loads in a private window; sample-data wording visible |
| [phone-thinking.png](docs/session/phone-thinking.png), [laptop-thinking.png](docs/session/laptop-thinking.png) | Dots after the request is sent | Thinking state shows first |
| [phone-cards.png](docs/session/phone-cards.png), [laptop-cards.png](docs/session/laptop-cards.png) | Three cards after the request | 3 of 3 cards show; cards look clearly different; newest deployment finished before testing; nothing cut off at phone width (phone image only) |
| [phone-error.png](docs/session/phone-error.png), [laptop-error.png](docs/session/laptop-error.png) | Error bubble after a forced failure | Friendly message and "Try again" inside the bubble; chat never empty at the moment of failure; failure triggered without editing code; nothing cut off at phone width (phone image only) |
| [phone-retry-thinking.png](docs/session/phone-retry-thinking.png), [laptop-retry-thinking.png](docs/session/laptop-retry-thinking.png) | Dots right after "Try again" is pressed | Chat never empty at the moment "Try again" is pressed |
| [phone-retry-sequence.png](docs/session/phone-retry-sequence.png), [laptop-retry-sequence.png](docs/session/laptop-retry-sequence.png) | Three frames from one run, joined into one image: the error bubble, the dots right after "Try again" is pressed, then the three cards | Chat never empty after "Try again", and the three cards come back |

Two ticked lines are not backed by a screenshot:

- **0 blank-chat moments across both paths** is backed by a file, not a screenshot. The file is [blank-check.json](docs/session/blank-check.json), the measurement result.
- **The message sharing the link says which request to type and how to trigger the failure** is backed by text, not a screenshot. The text is the "Team message" section below.

## Team message

For #search-trip-planner on Slack.

> Hi Hannah, Tomás, Priya and Daniel. The trip-planner chat prototype is ready for the dry run.
>
> Link: https://zeroairbnb.vercel.app
>
> It opens with no login or install, on phone and laptop. The trips are sample data and nothing is booked.
>
> To see the cards: type "Weekend for two near Gion, tea and great ramen" and press Send.
>
> To see the failure: turn on "Force failure" at the top right, send any request, then press "Try again". The switch fails one request, then turns itself off.
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
