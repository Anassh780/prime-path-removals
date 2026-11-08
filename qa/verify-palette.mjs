import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const ROUTES = ["/", "/services", "/services/house-removals", "/about", "/quote", "/contact", "/calculator", "/checklist"];

const OLD_ORANGE = "234, 122, 47";
const OLD_ROYAL = "37, 89, 224";

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

let failures = 0;
const report = [];

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });

  const result = await page.evaluate(([oldOrange, oldRoyal]) => {
    const all = [...document.querySelectorAll("body *")];
    const oldColourHits = [];
    const darkBands = [];
    const ctaFills = new Set();
    let bodyBg = "";

    for (const el of all) {
      const cs = getComputedStyle(el);
      for (const prop of ["color", "backgroundColor", "borderTopColor", "outlineColor"]) {
        const v = cs[prop];
        if (!v) continue;
        if (v.includes(oldOrange) || v.includes(oldRoyal)) {
          oldColourHits.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${prop}=${v}`);
        }
      }
      const bg = cs.backgroundColor;
      if (bg === "rgb(4, 16, 31)" || bg === "rgb(7, 26, 51)") {
        const r = el.getBoundingClientRect();
        if (r.width > 600 && r.height > 200) darkBands.push(Math.round(r.height));
      }
      if (el.tagName === "BUTTON" || el.tagName === "A") {
        const bg = cs.backgroundColor;
        if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") ctaFills.add(bg);
      }
    }
    bodyBg = getComputedStyle(document.body).backgroundColor;
    return {
      oldColourHits: [...new Set(oldColourHits)].slice(0, 6),
      oldColourCount: oldColourHits.length,
      darkBands,
      ctaFills: [...ctaFills],
      bodyBg,
      h1: document.querySelectorAll("h1").length,
    };
  }, [OLD_ORANGE, OLD_ROYAL]);

  const bad = result.oldColourCount > 0;
  if (bad) failures++;
  report.push({
    route,
    ok: !bad,
    oldColourCount: result.oldColourCount,
    examples: result.oldColourHits,
    darkBands: result.darkBands.length,
    h1: result.h1,
    ctaFills: result.ctaFills.slice(0, 6),
  });
}

console.log(JSON.stringify(report, null, 2));
console.log(`\nconsole errors: ${consoleErrors.length}`);
if (consoleErrors.length) console.log(consoleErrors.slice(0, 5).join("\n"));
console.log(`routes with old palette colours: ${failures}`);

await browser.close();
