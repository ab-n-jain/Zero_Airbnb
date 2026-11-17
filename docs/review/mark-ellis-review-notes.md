# Prototype review notes: Mark Ellis

Trip-Planner Chat Prototype for Airbnb Search, reviewed with Mark Ellis (Design Engineer, Host Experience).

- **Deck:** [Trip-Planner-Chat-Prototype-Review.pptx](Trip-Planner-Chat-Prototype-Review.pptx), seven slides: title, problem, design spec, happy path, error bubble, live link, next steps.
- **Live prototype:** https://zeroairbnb.vercel.app
- **Code:** https://github.com/ab-n-jain/Zero_Airbnb

## Mark's six questions

### 1. Why do the stay, Experience and food cards each have their own layout, instead of one card with a type label?

Each card answers a different question, so each leads with something different: the stay with its listing title, the Experience with its start time, the food spot with its cuisine. One card with a type label would make three different choices look like one list. Each card is its own component, `StayCard`, `ExperienceCard` and `FoodCard`, so one can change without touching the others.

### 2. Which Tailwind CSS choices make each card distinct, and what do they share?

Distinct: the stay image is `aspect-video` across the top, under a `text-[22px] font-bold` title in rose. The Experience uses `grid-cols-[38%_1fr]` to put its image left, with a `text-[28px] font-extrabold` teal start time. The food card has a `size-[92px] rounded-full` image on the right and a `font-serif text-2xl` cuisine on an amber tint. Shared: `rounded-2xl` corners, a thin border and the same `text-[11px]` uppercase label.

### 3. What does a guest see if the response fails, and is there ever a moment when the chat is empty?

The thinking dots are replaced, in the same spot, by a friendly bubble: "We couldn't put your Kyoto weekend together." with one "Try again" button inside it. No error codes, no pop-ups, nothing red. "Try again" resends the same message and the three cards return. The same bubble covers a broken answer, an error reply, a 12-second timeout or a dropped connection. 609 checks found no blank moment.

### 4. Where in the code does the hardcoded mock response live, and what would change to call a real API?

The fake reply is written in `lib/sampleReply.ts` and served by `app/api/plan/route.ts` after a 1.8-second delay; a forced failure returns `lib/brokenReply.ts` instead. Calling a real API changes only that route: fetch from the real service and map its answer to the same reply shape. The chat page and the answer check in `lib/validateReply.ts` stay as they are.

### 5. Does the prototype store or send any guest data anywhere?

It stores nothing. The page sends one thing, the typed message, to the prototype's own `/api/plan` route on the same Vercel site. That route reads it, ignores the words and returns the sample reply; nothing is saved. There are no cookies, no browser storage and no analytics, and the page contacts no other site. Vercel, as the host, may log requests as any host does.

### 6. How does the card stack read on a small phone screen compared with a laptop?

On a phone the cards stack in one column, in a fixed order: stay, Experience, food, each at full width, and the guest scrolls down the thread. On a laptop, from 720 pixels wide, they sit in two columns: the stay card on the left, the Experience and food cards stacked on the right, with tops and bottoms aligned. At 390 pixels nothing is cut off and nothing scrolls sideways.

### If Mark asks whether this is real data

No. The cards come from a mock response: fake sample data written into the code, not real bookings. The next step is hooking up a real API in place of the fake reply.

## How the answers were checked

- **Live link:** the code served by https://zeroairbnb.vercel.app is commit `a32a037`, which Vercel reported as deployed at 06:35 UTC on 17 November 2026.
- **Happy path:** checked on the live link at phone size at 07:29 UTC, showing the dots, then three cards.
- **Guest data:** the same run recorded every request the page made. All went to `zeroairbnb.vercel.app`, the only data sent was the message, and no cookies or browser storage were written.
- **Tailwind classes:** read from `components/cards/`.
- **Blank-chat figure:** from [docs/testing-notes.md](../testing-notes.md).
- **Limit:** the phone runs used an emulated iPhone 14, not a real phone.

## Mark's feedback

Not recorded yet. These notes were written before the call, and they won't put words in Mark's mouth. Fill this in during or straight after the call.

| What Mark said he would check | What he saw | His comment |
| --- | --- | --- |
| His phone, typing "Kyoto weekend for two.", shows the thinking animation and then three cards | | |
| The failure case on the shared screen: error bubble, then "Try again" brings the cards back | | |
| How the guest-side chat bubble and cards differ from the Host Experience patterns he shared | | |
| Any other feedback | | |

The Host Experience patterns he shared aren't in this repository, so that comparison needs them before it can be answered.

## Two next steps

Proposed for agreement with Mark on the call. Mark them agreed, or change them, before handing these notes on.

1. **Hook up a real API in place of the fake reply.** Change `app/api/plan/route.ts` to call a real listings and Experiences service and return the same reply shape, keeping the answer check and the error bubble as they are.
2. **Run the full checklist on real devices before the guest sessions.** Repeat the happy path and the error path on a real iPhone in Safari and a real laptop in Chrome, both in private windows, and record the results in the README checklist.

## Links to post in the call chat

```
Live prototype: https://zeroairbnb.vercel.app
Code: https://github.com/ab-n-jain/Zero_Airbnb
```
