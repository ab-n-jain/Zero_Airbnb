# Zerobnb: project context

The working record of the Trip-Planner Chat Prototype for Airbnb Search: what we were given, what we built, the design decisions and the reasons behind them, what changed after each review, and what we learnt.

Each topic is written from a design point of view first. Where a decision only makes sense in engineering terms, that part is labelled **Engineering**.

- **Live prototype:** https://zeroairbnb.vercel.app
- **Repository:** https://github.com/ab-n-jain/Zero_Airbnb

---

## 1. The problem in one paragraph

62% of guests who open Airbnb's search filter panel leave before they view a single listing (Search, February 2025 sample). They do the work of filtering and never see a result. The prototype tests a different order: the guest describes the trip in their own words, and the first thing they see is a whole weekend in Kyoto, made of one stay, one Experience and one food spot.

**Our bet:** letting guests describe their trip in their own words, and showing a whole weekend first, will keep more guests going.

**Our target for the guest sessions:** at least 4 of 5 guests reach the three cards without help and pick one they'd want to open. About 38% reach a listing through the filter panel today, so 80% would be a clear signal. It is a target, not a result, and five moderated guests are not live traffic.

---

## 2. What we were given

| Input | What it gave us | How we used it |
|---|---|---|
| **Kyoto Planner Card and Error Spec** (PDF) | The three card types, a "pair rule" (every pair of cards differs on image spot, biggest text and accent), fixed dates (11 to 13 April, 2 nights), "always three", the error flow, and a mock API with a `forceFail` flag returning a 503 | The design foundation for the cards and the error path. We kept its rules, and departed from it where newer inputs overrode it (see section 5) |
| **Problem statement** | Guests quit the search filter panel before seeing a listing | The "why" behind every decision |
| **Kyoto Weekend Prototype Content Pack** (spreadsheet) | Four stays, four Experiences and four food spots, with real column names and no photos, because image rights were not cleared | The source of the mock reply, one row per sheet: S1, E1 and F1 |
| **Stage requirements, three rounds** | 1: chat page, thinking state, mock reply, three cards, README screenshot. 2: broken mock and trigger, Tailwind error bubble, Try again, two screenshots. 3: session checklist, public link, phone and laptop proof | The build plan, stage by stage |
| **Assistant Bubble Error Message Guidelines** | Wording limits, one primary action, no red, the same shape as a normal reply, accessibility minimums | The rules for the error bubble, word for word |
| **Moderated Session Prototype Requirements** | Two setups (iPhone Safari private window, MacBook Chrome incognito), 3 of 3 cards, 0 blank-chat moments, no login, a visible sample-data note, the team message | The README checklist |
| **Leadership Demo Review brief** | A 10-minute meeting, leaders on phones, five questions in their own words, the 62% figure | The first slide deck |
| **Mark Ellis review brief** | Six standing questions, a live test on his own phone, links posted in the call chat | The review deck, the run of show and the review notes |
| **Reviewer feedback, many rounds** | Specific gaps in evidence, wording and story | Most of the changes in section 5 |

We also made a sample spreadsheet, "Kyoto Weekend Content", before the content pack arrived. Once the pack came, it became the only data source, and the sample sheet was not used again.

---

## 3. What we built, in order

1. **The chat page:** a header, a scrolling thread, a message box and a Send button. One request returns one stay, one Experience and one food spot.
2. **The thinking state:** the guest's message and a bubble of three pulsing dots appear together; the input and Send lock until the reply lands.
3. **The three cards,** each a separate component with its own layout.
4. **The mock reply,** typed from one row per sheet of the content pack and served by a mock API route.
5. **The unhappy path:**
   - a broken mock answer
   - a "Force failure" switch
   - a check that rejects any answer the cards can't use
   - a friendly error bubble with "Try again"
6. **Tailwind CSS** for every style in the app.
7. **The public Vercel deployment,** checked in fresh browser windows at phone and laptop sizes.
8. **The evidence:**
   - a checklist in the README
   - screenshots for each line
   - a blank-chat measurement
   - a three-frame retry sequence
   - testing notes
9. **The stories:**
   - a team message
   - a leadership deck
   - a review deck for Mark Ellis, with a script and review notes

---

## 4. Design decisions and why

### 4.1 One message, one whole weekend

**Design.** The guest gets something to look at before they have made any choices. The filter panel asks for decisions first and shows results later; the chat reverses that. Three items, always three, make the answer feel like a plan rather than a list to sort through.

**Engineering.** "Always three" is enforced, not hoped for. Every reply is checked before anything is drawn, and a reply missing any item is treated as a failure (section 4.6).

### 4.2 Three cards, three layouts

**Design.** Each card answers a different question, so each leads with the fact a guest decides on:

| Card | Image spot | Biggest text | Accent |
|---|---|---|---|
| Stay | Top, full width | Listing title | Rose |
| Experience | Left side | Start time | Teal |
| Food | Right side, round | Cuisine | Amber |

- **Why not one card with a type label:** that would make three different choices look like one list of similar results.
- **The pair rule from the spec:** any two cards differ on all three properties, so they never blur together.
- **Why the Experience leads with time:** that is what a guest plans the day around.

**Engineering.** Each card is its own component: `StayCard`, `ExperienceCard` and `FoodCard`. One can change without touching the others, which was a spec requirement.

### 4.3 The food card leads with cuisine, not the dish

**Design.** The spec asked for the signature dish as the biggest text. The content pack has no dish column. We first showed filler ("Dish: to be added"), which put a placeholder in the most prominent spot on the card. We switched the headline to the cuisine ("Ramen"), the closest real field, which still tells the guest what they'll eat.

**Learning.** The biggest text on a card must always be real content. Filler belongs in secondary places.

### 4.4 The thinking state

**Design.**
- **Arrives with the message:** the dots appear in the same render as the guest's message, so there is never a gap where the request seems lost.
- **Locks the input:** the message box and Send are disabled, so the guest can't send twice, and the placeholder reads "Planning your weekend…".
- **Releases with the reply:** the lock lifts as soon as the reply or the error arrives, and the cursor returns to the input.

**Engineering.** One derived value, "is any turn still thinking", drives both the dots and the lock, so they always start and stop together.

### 4.5 The error bubble

**Design.** The failure state is part of the product, not an afterthought. The wording follows the guidelines exactly:

| Part | Text | Rule it meets |
|---|---|---|
| Lead line | "We couldn't put your Kyoto weekend together." | 8 words or fewer, in the guest's terms |
| Supporting sentence | "Your request is saved, so you can try again." | One sentence, saying what happens next |
| Button | "Try again" | One primary action, a verb, sentence case |

- **Words it avoids:** "error", "failed", "invalid", "timeout" and status codes. It never blames the guest's request.
- **The look:**
  - the same shape, corners and left alignment as a normal reply, so it still reads as part of the conversation
  - a white background, a thin grey border and dark grey text
  - no red anywhere, and no warning icon
- **The button:** sits inside the bubble at full width, at least 44 pixels tall, with a visible keyboard focus ring.

**Why we didn't use the spec PDF's wording.** "That took a wrong turn" didn't say what happened, and its two supporting sentences broke the one-sentence rule. The newer guidelines took priority.

**Engineering.** The thread is a polite live region, so screen readers announce the bubble when it appears. Every kind of failure lands on the same bubble:
- a broken answer
- any non-200 reply
- a 12-second timeout
- a dropped connection

The guest never sees raw error text.

### 4.6 The forced failure: broken data, not a server error

**Design.** The stage brief asked for "fake sample data the app cannot turn into cards", which is the realistic version of the problem guests hit: an answer that arrives but is unusable. Testing that proves the app notices bad content, not just a crash.

**Engineering.**
- **The broken answer** has a stay with no listing title, a price of "n/a", an empty Experience and no food item.
- **A reply check** (`lib/validateReply.ts`) lists every field each card reads and rejects anything incomplete.
- **What this changed:** without the check, a bad reply would have crashed a card or left a hole in the thread. With it, any incomplete answer, from the mock or a future real API, shows the friendly bubble.
- **The cost:** the check is strict. One missing field fails the whole answer, which matches the "always three" rule.

### 4.7 The trigger: a one-shot switch in the header

**Design.** Researchers needed to trigger the failure without editing code. A visible switch labelled "Force failure" does that. It turns itself off after one request, so the next request, and "Try again", always succeed. That made the demo repeatable and kept the trigger from being left on by accident.

**Side effect we had to explain.** In screenshots of the error bubble, the switch already reads "off", because it switched itself off on send. The image shows the failure, not the trigger.

### 4.8 Try again replaces the bubble in place

**Design.** A retry is the same request, so it stays the same turn: the error bubble turns back into the dots in the same spot, and the cards land where the bubble was. Adding a new turn would repeat the guest's message and leave a dead error bubble above the cards. Swapping in place means the screen never jumps and is never blank.

**Engineering.** The turn keeps its ID. "Try again" always sends `forceFail: false`, whatever the switch says, so a retry can never hit the broken answer.

### 4.9 Zero blank moments

**Design.** Test guests quit when a failed answer left a blank chat, so "never empty" was the standard, not a nice-to-have. At every moment the newest turn shows the dots, the error bubble or the cards.

**Engineering.** We measured it rather than eyeballing it:
- **What was checked:** the newest turn, every 30 milliseconds and at every change to the thread, on both paths, at phone and laptop sizes.
- **Result:** 609 samples and 0 blank, against the live link.
- **What it does not measure** (section 7):
  - whether the content is correct
  - how long a real reply might take

### 4.10 Visual language

**Design.**
- **Palette from the cards:** rose for stays, teal for Experiences and amber for food, on ink and paper neutrals. The deck reuses the same palette, so the slides and the product feel like one thing.
- **Semantic colour is kept apart:** no red is used anywhere, so the error state reads as calm.
- **Repeated element shapes:** the bubbles share one shape, and the cards share corners, border and label style, so the three cards differ only where it carries meaning (image, headline, accent).

**Engineering.** Colours, fonts and the dots animation are defined once as Tailwind theme tokens in `app/globals.css`. The shared bubble shape lives in one place (`components/bubble.ts`), so the error bubble's shape matches a normal reply because it uses the same classes.

### 4.11 Layout: phone and laptop

**Design.**
- **On a phone,** the cards stack in a fixed order (stay, Experience, food), each at full width.
- **On a laptop,** from 720 pixels wide, the stay card sits on the left and the Experience and food cards stack on the right.
- **A review fix:** the left card's top and bottom now line up with the right pair, and the vertical and horizontal gaps are equal (12 pixels). Before the fix, the two right cards took their own heights and the spare space opened up between them, which looked accidental.

**Engineering.** The cards stretch to fill the grid, and each card pins its footer (price line, booking line) to the bottom.

### 4.12 "Sample data. Nothing is booked."

**Design and ethics.** Research rules require that a guest never believes a real booking is being made. A note sits under the message box on every screen: "These trips are sample data for a prototype. Nothing is booked." The header also says "sample data".

### 4.13 The mock follows the workbook's column names

**Design.** Because the reply is checked against the content pack, its fields use the sheet's own column names ("Listing Title", "Price per Night (USD)", "Highlight"). A reviewer can read across the sheet's header and down the reply and see they match. Formatting for display happens in the cards, so "2025-04-12" shows as "12 Apr" and "10:30" as "10:30 AM".

**Engineering.**
- **Traceability:** each item carries its Option ID (S1, E1, F1).
- **Invented fields removed:** a guest-favourite flag, a signature dish and an Experience review count were never in the workbook.
- **The trade-off:** keys with spaces are clumsier in code, and they tie the code to the sheet's wording. For a real API, tidy names plus one mapping file would be better.

### 4.14 Tailwind CSS for everything

**Design.** The stage asked for the error bubble in Tailwind. Mixing plain CSS for the rest would have split the visual system, so we moved everything to Tailwind on shared tokens. The look did not change.

### 4.15 Reduced motion: an honest half-measure

**Design.** We slowed the dots for guests who turn on "reduce motion". The brief didn't ask for it and we didn't flag it at first. It is only partial: the dots still move. Done properly, they would fade without moving.

---

## 5. What changed after feedback

| Feedback or finding | What we changed | Why it mattered |
|---|---|---|
| The spec's error wording broke the newer guidelines | Rewrote the message to the guidelines | The newer rules take priority; the old copy didn't say what happened |
| The README claimed rows came from the content pack, but field names didn't match the columns | Renamed every field to the sheet's column names and added Option IDs | Makes the mock checkable against its source |
| Filler text never appeared, because the chosen rows had no blanks | Said so plainly, and removed invented fields | Don't claim behaviour nobody can see |
| The left card didn't line up with the right pair | Stretched the cards; equal 12-pixel gaps | Alignment signals intention; misalignment reads as a bug |
| "Make everything Tailwind" | Moved all styles to Tailwind tokens | One visual system |
| Checklist lines without a screenshot behind them | Added screenshots of the dots and of "Try again" being pressed; re-ran everything on the live link | Every tick needs evidence |
| The blank-chat number sat on a figure nobody could see | Added the method, raw result file, script, time and commit | A number is only trustworthy if it is traceable |
| The table's change labels read as if logged | Added a note: the labels come from the flow order, not the run log | Say what is measured and what is inferred |
| "About 320 and 300" vs "304 and 305" | Kept one set of exact figures, from the saved run | Two sets of numbers with no note look careless |
| "Vercel can't show the served commit" | Used GitHub's Vercel status times to prove which deployment served each test | Correct a wrong claim with evidence |
| The retry screenshot was byte-for-byte the cards screenshot | Replaced it with a three-frame sequence from one run: error, dots, cards | A single frame cannot prove a sequence happened |
| The no-login screenshot shows no address bar | Said so: it proves no sign-in page appeared, not which window it was taken in | Be precise about what an image proves |
| The team message had a stale placeholder line and past dates | Removed them | Read it as the receiver; cut anything meant only for you |
| Measurement detail buried the checklist | Moved it to `docs/testing-notes.md`, linked in one line | A shorter front page gets read |
| The deck never stated the bet or a target | Added "Our bet" and "Win if 4 of 5 guests" to slide 2, and an ask on slide 7 | People can only back an idea if they know what is being tested |

---

## 6. Telling the story: the decks

### The leadership deck

Seven slides for a 10-minute meeting, with leaders joining on phones:

- **Slide order:** a title naming the prototype, then the problem with the 62% figure, then one slide per question the leaders sent ahead.
- **Large text, one idea per slide:** because leaders read on small screens.
- **Only two numbers,** both sourced: the 62% from Search, and the 609 checks from our test.
- **No dates:** the brief's dates had passed.

### The review deck for Mark Ellis

Seven slides in the order the review asked for:
1. Title
2. Problem, bet and target
3. Design spec
4. Happy path
5. Error bubble
6. Live link
7. Next steps, with both links

The design spec slide names each card's image spot, numbered text order and accent colour beside a screenshot of the card. The error slide uses an arrow to point at the "Try again" button, and the speaker notes say where to look.

### Why the problem comes first

The decision-maker in the leadership meeting was new to the project. The reason has to come before the solution, and it gives the room a test for the demo: does the guest see something sooner?

### Honest limits on the slides

The decks say:
- the data is sample data
- the reply is a mock
- the phones were emulated

Naming limits before someone asks reads as confidence, not weakness.

### The review notes

Mark's six questions are answered in 56 to 70 words each, from the code and the live link. His feedback is left blank to fill in after the call, and the two next steps are marked as proposals, not agreed.

---

## 7. How we proved it, and where the proof stops

**What we did**
- **Live link:** tested the public production link, not a local copy, in fresh browser windows with no cookies or logins.
- **Two setups:** an emulated iPhone 14 (390 pixels wide) and a 1440-pixel laptop window.
- **Evidence for every claim:** each README checklist line points to a screenshot, a file or text.
- **Deployment timing:** tied each test run to the Vercel deployment that was live at that moment.

**Where the proof stops**
- **Devices:** every phone result comes from an emulated iPhone in Chromium, not Safari on a real iPhone. This is the check we would trust least if phones and laptops disagreed.
- **The blank-chat check counts presence, not quality:** a card full of blank fields would still count as "not blank".
- **The mock always answers in 1.8 seconds and complete:** a real API could be slow, partial, or hit the 12-second timeout, which we never ran.
- **The guest sessions haven't run,** so the 4 of 5 target is untested.

---

## 8. What we learnt

### Design

- **Design the failure state as carefully as the happy path.** The error bubble, the retry and "never blank" are what keep a guest when something goes wrong.
- **A card's headline should be the fact the guest decides on,** and it must be real content, never filler.
- **Different jobs deserve different shapes.** Varying image spot, headline and colour together is what stops three choices from reading as one list.
- **Written rules are design constraints, not paperwork.** The guidelines' word limits and banned words made the error copy better.
- **Alignment is communication.** Unequal gaps and misaligned edges read as mistakes, even when the content is right.
- **State the bet and what counts as winning.** Without a target, a demo shows that something was built, not whether it works.
- **Write for the reader.** Leaders on phones need large text and one idea per slide; a team message must make sense to the person receiving it.

### Engineering

- **Check every reply before drawing it.** It turned an unknown crash into a known, friendly state, and it will protect the real API too.
- **Keep the mock shaped like the real thing,** so swapping in a real API changes one route, not the whole app.
- **Measure, don't eyeball.** Sampling the screen every 30 milliseconds found what screenshots could not.
- **A commit is not a deployment.** Proving which version was live needed the deployment times, not the commit list.
- **Emulators are not devices.** Real phones handle screen height, the keyboard and fonts differently.

### Process and evidence

- **Every tick needs something behind it,** and the README must say whether that is a screenshot, a file or text.
- **A single image cannot prove a sequence.** A retry looks exactly like a first success, so it needed three frames from one run.
- **Say what was measured and what was inferred,** and fix wrong claims in the open.
- **Keep the front page short.** Detail goes one link away.

---

## 9. Still open

1. **Real devices:** run the full checklist on a real iPhone in a Safari private window and a real MacBook in Chrome incognito, the exact research setups.
2. **A real API in place of the fake reply:** change `app/api/plan/route.ts` to call a real service, keep the reply check and the error bubble, and add cleared photos. This depends on the guest sessions meeting the target.
3. **The guest sessions:** run them and record whether 4 of 5 guests reached the cards and picked one to open.
4. **Mark's feedback,** and the comparison with the Host Experience chat patterns, which are not in this repository.
5. **Reduced motion:** make the dots fade without moving, or remove the setting.
6. **Small spec gaps:** there is no `npm run check` script yet, and the forced failure returns broken data rather than the spec's 503.

---

## 10. Where things are

| What | Where |
|---|---|
| Chat page, lock, request, retry | `components/Chat.tsx` |
| Thinking dots | `components/ThinkingBubble.tsx` |
| Error bubble | `components/ErrorBubble.tsx` |
| Shared bubble shape | `components/bubble.ts` |
| The three cards | `components/cards/StayCard.tsx`, `ExperienceCard.tsx`, `FoodCard.tsx` |
| Placeholder illustrations | `components/cards/Art.tsx` |
| Mock API route | `app/api/plan/route.ts` |
| Sample reply and broken reply | `lib/sampleReply.ts`, `lib/brokenReply.ts` |
| Reply check | `lib/validateReply.ts` |
| Reply shape | `lib/types.ts` |
| Theme tokens | `app/globals.css` |
| Checklist and screenshots | `README.md`, `docs/session/` |
| Testing notes and blank-chat measurement | `docs/testing-notes.md`, `docs/session/blank-check.json`, `scripts/blank-check.js` |
| Review deck and review notes | `docs/review/` |
