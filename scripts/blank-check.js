// Blank-chat check. Runs the happy path and the error path on a phone and a
// laptop setup and counts moments when the newest turn shows nothing.
//
// What is sampled: inside the page, the newest turn in the thread. A sample
// is "blank" when that turn shows none of the thinking dots, the error bubble
// or a card (or the one it shows has no height).
// When: every 30 ms, and also on every change to the thread, from the moment
// the guest's message appears until 800 ms after the three cards show.
//
// Usage: node scripts/blank-check.js <url> <commit> > docs/session/blank-check.json
// Needs Playwright (not a dependency of the app). Set HTTPS_PROXY if required.
const { chromium, devices } = require("playwright");

const [url, commit] = process.argv.slice(2);
const REQUEST = "Weekend for two near Gion, tea and great ramen";
const SETUPS = {
  phone: { label: "iPhone 14 emulated in Chromium, 390px wide", options: { ...devices["iPhone 14"] } },
  laptop: { label: "Chromium, 1440px wide", options: { viewport: { width: 1440, height: 820 } } },
};

function startSampling() {
  const w = window;
  w.__check = { interval: [], mutation: [], blankAt: [] };
  const look = (kind) => {
    const turn = [...document.querySelectorAll("[data-turn]")].pop();
    if (!turn) return;
    const shown = turn.querySelector("[data-dots], [data-error-bubble], article[data-type]");
    let state = "blank";
    if (shown && shown.getBoundingClientRect().height > 0) {
      state = shown.matches("[data-dots]") ? "thinking" : shown.matches("[data-error-bubble]") ? "errorBubble" : "cards";
    }
    w.__check[kind].push({ t: performance.now(), state });
    if (state === "blank") w.__check.blankAt.push({ kind, t: performance.now() });
  };
  setInterval(() => look("interval"), 30);
  new MutationObserver(() => look("mutation")).observe(document.querySelector("main"), {
    childList: true, subtree: true, attributes: true, characterData: true,
  });
}

function summarise(raw) {
  const count = (list) => list.reduce((acc, s) => ({ ...acc, [s.state]: (acc[s.state] || 0) + 1 }), {});
  const times = raw.interval.map((s) => s.t);
  const gaps = times.slice(1).map((t, i) => t - times[i]);
  return {
    intervalSamples: raw.interval.length,
    intervalBlank: raw.interval.filter((s) => s.state === "blank").length,
    intervalSamplesByWhatWasShown: count(raw.interval),
    threadChangesChecked: raw.mutation.length,
    threadChangesBlank: raw.mutation.filter((s) => s.state === "blank").length,
    sampledForMs: Math.round(times[times.length - 1] - times[0]),
    averageGapMs: Math.round((gaps.reduce((a, b) => a + b, 0) / gaps.length) * 10) / 10,
    longestGapMs: Math.round(Math.max(...gaps) * 10) / 10,
  };
}

(async () => {
  const proxy = process.env.HTTPS_PROXY;
  const browser = await chromium.launch(proxy && !url.includes("localhost") ? { proxy: { server: proxy } } : {});
  const result = {
    url, commit, testedAt: new Date().toISOString(), request: REQUEST,
    window: "new browser context for each run: no cookies, storage or logins",
    setups: {},
  };
  for (const [name, setup] of Object.entries(SETUPS)) {
    result.setups[name] = { setup: setup.label };
    for (const path of ["happyPath", "errorPath"]) {
      const context = await browser.newContext(setup.options);
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(startSampling);
      if (path === "errorPath") await page.getByRole("switch").click();
      await page.getByLabel("Trip request").fill(REQUEST);
      await page.getByRole("button", { name: "Send" }).click();
      if (path === "errorPath") {
        const retry = page.getByRole("button", { name: "Try again" });
        await retry.waitFor();
        await page.waitForTimeout(600);
        await retry.click();
      }
      await page.waitForSelector('article[data-type="food"]');
      await page.waitForTimeout(800);
      const cards = await page.locator("article[data-type]").count();
      result.setups[name][path] = { cardsAtEnd: cards, ...summarise(await page.evaluate(() => window.__check)) };
      await context.close();
    }
  }
  await browser.close();
  console.log(JSON.stringify(result, null, 2));
})();
