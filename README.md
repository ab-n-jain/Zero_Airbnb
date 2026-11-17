**Live prototype:** https://zeroairbnb.vercel.app

# Kyoto weekend planner

A chat prototype. One trip request returns one stay, one experience and one food spot for a weekend in Kyoto. Sample data, no login.

![Chat thread showing the stay, experience and food cards](docs/screenshot.png)

## Moderated session checklist

Rules copied from "Moderated Session Prototype Requirements: Trip-Planner Chat". A tick means the rule was run and seen to pass on that setup, and every line names what backs it: a screenshot for thirteen lines, a file for one and text for one.

**How it was tested:** against the live link, https://zeroairbnb.vercel.app, in a browser window with no cookies, saved logins or storage (the same as a private or incognito window). The phone setup is an emulated iPhone 14 (390px wide, Safari user agent, touch) and the laptop setup is a 1440px window, both in Chromium. It has not been run on a real iPhone in Safari or on a MacBook in Chrome.

**Request typed:** `Weekend for two near Gion, tea and great ramen`

| Rule | Phone | Laptop | Screenshot | What was seen |
| --- | --- | --- | --- | --- |
| Opening the link needs no install, no login and no configuration | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | The page loaded straight into the chat: no login page, no redirect, no password field, in a window with no cookies |
| Only the production `*.vercel.app` domain is shared, and it loads in a private window without a login | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | https://zeroairbnb.vercel.app is the only link in this README and in the team message |
| The newest deployment is finished before testing | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | Vercel reported each deployment as successful on GitHub before the test that used it: [`d2b6f44`](https://github.com/ab-n-jain/Zero_Airbnb/commit/d2b6f44) at 05:45:26 UTC for the screenshots (taken 05:50 to 05:51 UTC), and [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) at 05:51:41 UTC for the blank-chat check (05:55 UTC). The Deployments tab in Vercel itself was not viewed |
| One typed trip request shows a thinking state first | ✅ | ✅ | [phone](docs/session/phone-thinking.png), [laptop](docs/session/laptop-thinking.png) | Three pulsing dots, input locked, no cards yet |
| Then 3 of 3 cards show: a stay card, an Experience card and a food card | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | 3 of 3 cards |
| The three cards look clearly different, not one layout with the text swapped | ✅ | ✅ | [phone](docs/session/phone-cards.png), [laptop](docs/session/laptop-cards.png) | Stay: image on top, title biggest, rose. Experience: image on the left, start time biggest, teal. Food: round image on the right, cuisine biggest, amber |
| At phone width nothing is cut off and nothing needs sideways scrolling | ✅ | n/a | [phone](docs/session/phone-cards.png), [phone](docs/session/phone-error.png) | No element past the screen edge, no clipped text, no sideways scroll |
| The forced failure shows a friendly message and a "Try again" button inside the assistant bubble | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | "We couldn't put your Kyoto weekend together." with the button inside the bubble |
| The chat is never empty at the moment of failure | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | The error bubble takes the place of the dots |
| The chat is never empty at the moment "Try again" is pressed | ✅ | ✅ | [phone](docs/session/phone-retry-thinking.png), [laptop](docs/session/laptop-retry-thinking.png) | The dots take the place of the error bubble; the guest's message stays |
| The chat is never empty after "Try again", and the three cards come back | ✅ | ✅ | [phone](docs/session/phone-retry-sequence.png), [laptop](docs/session/laptop-retry-sequence.png) | Three frames from one run in a single image: the error bubble, the dots after "Try again" is pressed, then 3 of 3 cards with the guest's message shown once |
| 0 blank-chat moments across both paths | ✅ | ✅ | No screenshot. Backed by a file: [blank-check.json](docs/session/blank-check.json) | 0 blank of 304 samples on the phone setup and 0 blank of 305 on the laptop setup. The check ran from 05:55:28 to 05:55:52 UTC on 2026-11-17, inside the window from 05:51:41 to 05:56:26 UTC when [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) was the newest finished deployment. Full result in the table below |
| The page shows visible wording that the trips are sample data and nothing is booked | ✅ | ✅ | [phone](docs/session/phone-open.png), [laptop](docs/session/laptop-open.png) | "These trips are sample data for a prototype. Nothing is booked." under the message box, on every screen |
| The failure can be triggered without editing code | ✅ | ✅ | [phone](docs/session/phone-error.png), [laptop](docs/session/laptop-error.png) | "Force failure" switch in the header, then send any message |
| The message sharing the link says which request to type and how to trigger the failure | ✅ | ✅ | No screenshot. Backed by text: "Team message" below | The message says both and carries the production link. It still has to be posted in Slack by a person |

### Blank-chat measurement

- **Result:** 0 blank samples out of 609 across both setups and both paths.
- **What was sampled:** the newest turn in the thread, read inside the page. A sample counts as blank when that turn shows none of the thinking dots, the error bubble or a card.
- **When:** every 30 ms, from the moment the guest's message appears until 0.8 seconds after the three cards show. The same check also ran on every change to the thread, so a blank shorter than 30 ms would still be caught.
- **Where and when it ran:** against https://zeroairbnb.vercel.app on 2026-11-17 at 05:55 UTC, in a fresh browser window with no cookies or logins for each run.
- **Commit that served the live site:** from 05:51:41 to 05:56:26 UTC on 2026-11-17, the newest finished deployment was [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9). The check ran inside that window: it started at 05:55:28 UTC and its result was written at 05:55:52 UTC. The window opens when Vercel reported the deployment of [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) successful and closes when it reported the next one, [`91ec463`](https://github.com/ab-n-jain/Zero_Airbnb/commit/91ec463), successful. Both times come from the Vercel status that GitHub shows on each commit, not from the Vercel dashboard.
- **App code in that commit:** identical to [`69c07dc`](https://github.com/ab-n-jain/Zero_Airbnb/commit/69c07dc), the commit that added this checklist and the sample-data note. The four commits from there to [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) changed only `README.md` and files in `docs/`.
- **Raw result and script:** [docs/session/blank-check.json](docs/session/blank-check.json), produced by [scripts/blank-check.js](scripts/blank-check.js).

| Setup | Path | Samples | Showing dots | Showing error bubble | Showing cards | Blank | Blank thread changes | Sampled for | Longest gap between samples |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Phone | Send, then cards | 104 | 69 | 0 | 35 | **0** | 0 of 2 | 3.1 s | 38.7 ms |
| Phone | Forced failure, Try again, then cards | 200 | 129 | 33 | 38 | **0** | 0 of 4 | 6.0 s | 35.9 ms |
| **Phone total** | Both paths | **304** | 198 | 33 | 73 | **0** | 0 of 6 | 9.1 s | 38.7 ms |
| Laptop | Send, then cards | 104 | 67 | 0 | 37 | **0** | 0 of 2 | 3.1 s | 31.9 ms |
| Laptop | Forced failure, Try again, then cards | 201 | 129 | 32 | 40 | **0** | 0 of 4 | 6.0 s | 39.2 ms |
| **Laptop total** | Both paths | **305** | 196 | 32 | 77 | **0** | 0 of 6 | 9.1 s | 39.2 ms |

**About the "Blank thread changes" column:** it counts how many times the thread changed during the run, and how many of those changes left the newest turn blank. `blank-check.json` holds only these counts; it does not record what each change was. Reading the 2 changes as "the message and dots appear, then the cards replace the dots", and the 4 changes as "the message and dots appear, the error bubble replaces the dots, the dots replace the error bubble, then the cards replace the dots", is worked out from the order of the flow, not taken from the run log.

All twelve images are in `docs/session/` and were taken from the live link on 2026-11-17: ten single screenshots between 05:50 and 05:51 UTC, when the newest finished deployment was [`d2b6f44`](https://github.com/ab-n-jain/Zero_Airbnb/commit/d2b6f44), and the two retry sequence images at 06:21 UTC, when it was [`c04dd96`](https://github.com/ab-n-jain/Zero_Airbnb/commit/c04dd96). The app code is identical in both and in [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9). The phone card screenshots are taller than the phone screen so all three cards fit in one image; on the device the guest scrolls the thread to see them.

**About the retry sequence images:** a screenshot of the cards after a retry looks exactly like a screenshot of the cards after a normal request, so a single frame cannot show that a retry happened. Each sequence image therefore holds three frames from one run, with the time of each frame after Send. The captions and the header line on those two images were added outside the app; [retry-sequence.json](docs/session/retry-sequence.json) holds what the page showed at each frame and the two requests sent (`forceFail` true, then false).

**About four of the single screenshots:** the cards and error-bubble images are byte-for-byte identical to the ones first taken from a local build in [`69c07dc`](https://github.com/ab-n-jain/Zero_Airbnb/commit/69c07dc), because the live site renders the same pixels. Git therefore shows them as unchanged since that commit, and the repo alone cannot show they were retaken from the live link.

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
