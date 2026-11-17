# Testing notes

The detail behind the [moderated session checklist](../README.md#moderated-session-checklist). The README keeps the ticks and screenshots; this file keeps how they were measured.

## How the tests were run

- **Link tested:** https://zeroairbnb.vercel.app, the production domain.
- **Window:** a new browser session for every run, with no cookies, saved logins or storage. This is the automated equivalent of a private or incognito window, not Safari Private Browsing or Chrome Incognito themselves.
- **Phone setup:** an iPhone 14 emulated in Chromium (390px wide, Safari user agent, touch).
- **Laptop setup:** Chromium at 1440px wide.
- **Not yet done:** a run on a real iPhone in Safari or a real MacBook in Chrome.
- **Request typed:** `Weekend for two near Gion, tea and great ramen`

## Which deployment was live

Vercel reported each deployment as successful on GitHub before the test that used it: [`d2b6f44`](https://github.com/ab-n-jain/Zero_Airbnb/commit/d2b6f44) at 05:45:26 UTC for the screenshots (taken 05:50 to 05:51 UTC), and [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) at 05:51:41 UTC for the blank-chat check (05:55 UTC). The Deployments tab in Vercel itself was not viewed.

## Blank-chat measurement

- **Result:** 0 blank samples out of 609 across both setups and both paths.
- **What was sampled:** the newest turn in the thread, read inside the page. A sample counts as blank when that turn shows none of the thinking dots, the error bubble or a card.
- **When:** every 30 ms, from the moment the guest's message appears until 0.8 seconds after the three cards show. The same check also ran on every change to the thread, so a blank shorter than 30 ms would still be caught.
- **Where and when it ran:** against https://zeroairbnb.vercel.app on 2026-11-17 at 05:55 UTC, in a fresh browser window with no cookies or logins for each run.
- **Commit that served the live site:** from 05:51:41 to 05:56:26 UTC on 2026-11-17, the newest finished deployment was [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9). The check ran inside that window: it started at 05:55:28 UTC and its result was written at 05:55:52 UTC. The window opens when Vercel reported the deployment of [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) successful and closes when it reported the next one, [`91ec463`](https://github.com/ab-n-jain/Zero_Airbnb/commit/91ec463), successful. Both times come from the Vercel status that GitHub shows on each commit, not from the Vercel dashboard.
- **App code in that commit:** identical to [`69c07dc`](https://github.com/ab-n-jain/Zero_Airbnb/commit/69c07dc), the commit that added this checklist and the sample-data note. The four commits from there to [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9) changed only `README.md` and files in `docs/`.
- **Raw result and script:** [session/blank-check.json](session/blank-check.json), produced by [scripts/blank-check.js](../scripts/blank-check.js).

| Setup | Path | Samples | Showing dots | Showing error bubble | Showing cards | Blank | Blank thread changes | Sampled for | Longest gap between samples |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Phone | Send, then cards | 104 | 69 | 0 | 35 | **0** | 0 of 2 | 3.1 s | 38.7 ms |
| Phone | Forced failure, Try again, then cards | 200 | 129 | 33 | 38 | **0** | 0 of 4 | 6.0 s | 35.9 ms |
| **Phone total** | Both paths | **304** | 198 | 33 | 73 | **0** | 0 of 6 | 9.1 s | 38.7 ms |
| Laptop | Send, then cards | 104 | 67 | 0 | 37 | **0** | 0 of 2 | 3.1 s | 31.9 ms |
| Laptop | Forced failure, Try again, then cards | 201 | 129 | 32 | 40 | **0** | 0 of 4 | 6.0 s | 39.2 ms |
| **Laptop total** | Both paths | **305** | 196 | 32 | 77 | **0** | 0 of 6 | 9.1 s | 39.2 ms |

**About the "Blank thread changes" column:** it counts how many times the thread changed during the run, and how many of those changes left the newest turn blank. `blank-check.json` holds only these counts; it does not record what each change was. Reading the 2 changes as "the message and dots appear, then the cards replace the dots", and the 4 changes as "the message and dots appear, the error bubble replaces the dots, the dots replace the error bubble, then the cards replace the dots", is worked out from the order of the flow, not taken from the run log.

## Screenshots

All twelve images are in `docs/session/` and were taken from the live link on 2026-11-17: ten single screenshots between 05:50 and 05:51 UTC, when the newest finished deployment was [`d2b6f44`](https://github.com/ab-n-jain/Zero_Airbnb/commit/d2b6f44), and the two retry sequence images at 06:21 UTC, when it was [`c04dd96`](https://github.com/ab-n-jain/Zero_Airbnb/commit/c04dd96). The app code is identical in both and in [`afe96c9`](https://github.com/ab-n-jain/Zero_Airbnb/commit/afe96c9). The phone card screenshots are taller than the phone screen so all three cards fit in one image; on the device the guest scrolls the thread to see them.

**About the retry sequence images:** a screenshot of the cards after a retry looks exactly like a screenshot of the cards after a normal request, so a single frame cannot show that a retry happened. Each sequence image therefore holds three frames from one run, with the time of each frame after Send. The captions and the header line on those two images were added outside the app; [retry-sequence.json](session/retry-sequence.json) holds what the page showed at each frame and the two requests sent (`forceFail` true, then false).

**About four of the single screenshots:** the cards and error-bubble images are byte-for-byte identical to the ones first taken from a local build in [`69c07dc`](https://github.com/ab-n-jain/Zero_Airbnb/commit/69c07dc), because the live site renders the same pixels. Git therefore shows them as unchanged since that commit, and the repo alone cannot show they were retaken from the live link.
