/**
 * Prime House Removals — programmatic UI verification.
 *
 * No vision required: this harness asserts layout, accessibility, interaction
 * and honesty rules numerically, then writes a human-readable report.
 *
 * Usage: node qa/qa.mjs [baseUrl]
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = path.resolve("qa/output");
await mkdir(OUT, { recursive: true });

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/services/house-removals", name: "service-detail" },
  { path: "/services/property-clearance", name: "service-detail-2" },
  { path: "/quote", name: "quote" },
  { path: "/calculator", name: "calculator" },
  { path: "/checklist", name: "checklist" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/this-page-does-not-exist", name: "404" },
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const results = { base: BASE, startedAt: new Date().toISOString(), pages: [], issues: [] };

function issue(severity, page, message, detail) {
  results.issues.push({ severity, page, message, detail });
}

/* ----------------------------- helpers ---------------------------------- */

async function collectPage(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 300));
  });
  page.on("pageerror", (err) => pageErrors.push(String(err).slice(0, 300)));
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("favicon")) {
      failedRequests.push(`${res.status()} ${res.url().slice(0, 160)}`);
    }
  });

  const url = BASE + route.path;
  let response;
  try {
    response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch (err) {
    issue("high", route.path, `Navigation failed at ${viewport.name}`, String(err).slice(0, 200));
    await context.close();
    return null;
  }

  await page.waitForTimeout(400);

  const screenshot = path.join(OUT, `${route.name}-${viewport.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });

  const audit = await page.evaluate(() => {
    const vw = window.innerWidth;

    const accessibleName = (el) => {
      const aria = el.getAttribute("aria-label");
      if (aria && aria.trim()) return aria.trim();
      const labelledby = el.getAttribute("aria-labelledby");
      if (labelledby) {
        const target = document.getElementById(labelledby);
        if (target?.textContent?.trim()) return target.textContent.trim();
      }
      // Labelable elements (button/input/select) get their name from <label>.
      if (el.labels && el.labels.length) {
        const fromLabels = [...el.labels]
          .map((label) => (label.textContent || "").trim())
          .join(" ")
          .trim();
        if (fromLabels) return fromLabels;
      }
      const text = (el.innerText || el.textContent || "").trim();
      if (text) return text;
      const img = el.querySelector("img[alt]");
      if (img?.getAttribute("alt")) return img.getAttribute("alt");
      const title = el.getAttribute("title");
      return title ?? "";
    };

    const overflowEls = [];
    document.querySelectorAll("body *").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const style = getComputedStyle(el);
      if (style.position === "fixed" && rect.width > vw + 1) return;
      if (rect.right > vw + 1.5 || rect.left < -1.5) {
        // ignore deliberately off-canvas Radix content
        if (el.closest("[data-radix-popper-content-wrapper]")) return;
        if (el.closest("[aria-hidden='true']")) return;
        overflowEls.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    });

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
      level: Number(h.tagName[1]),
      text: (h.textContent || "").trim().slice(0, 90),
    }));

    const headingJumps = [];
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        headingJumps.push(`${headings[i - 1].level}->${headings[i].level} (${headings[i].text})`);
      }
    }

    const imgs = [...document.querySelectorAll("img")].map((img) => ({
      src: img.getAttribute("src")?.slice(0, 100) ?? "",
      alt: img.getAttribute("alt"),
      naturalWidth: img.naturalWidth,
      complete: img.complete,
    }));

    const links = [...document.querySelectorAll("a")].map((a) => ({
      text: (a.textContent || "").trim().slice(0, 60),
      href: a.getAttribute("href"),
      aria: a.getAttribute("aria-label"),
    }));

    const buttons = [...document.querySelectorAll("button")].map((b) => ({
      text: (b.textContent || "").trim().slice(0, 60),
      aria: b.getAttribute("aria-label"),
      type: b.getAttribute("type"),
      disabled: b.disabled,
      name: accessibleName(b),
    }));

    const controls = [...document.querySelectorAll("input,select,textarea")]
      .filter((el) => {
        // Radix renders a hidden native <select> for form participation and
        // visually hidden inputs; those are not user-facing controls.
        if (el.getAttribute("aria-hidden") === "true") return false;
        if (el.tabIndex === -1) return false;
        if (el.offsetParent === null) return false;
        return true;
      })
      .map((el) => {
        const id = el.id;
        const label = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
        const wrapped = el.closest("label");
        const ariaLabel = el.getAttribute("aria-label");
        const ariaLabelledby = el.getAttribute("aria-labelledby");
        return {
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute("type"),
          id,
          name: el.getAttribute("name"),
          labelled: Boolean(label || wrapped || ariaLabel || ariaLabelledby),
        };
      });

    const parseColor = (value) => {
      const m = value.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(",").map((n) => parseFloat(n));
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    };

    const luminance = ({ r, g, b }) => {
      const channel = (c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    const effectiveBg = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = parseColor(getComputedStyle(node).backgroundColor);
        if (bg && bg.a > 0.85) return bg;
        node = node.parentElement;
      }
      return { r: 255, g: 255, b: 255, a: 1 };
    };

    const contrastSamples = [];
    const textEls = [...document.querySelectorAll("h1,h2,h3,h4,p,li,a,span,button,label,dt,dd")];
    for (const el of textEls.slice(0, 260)) {
      const text = (el.textContent || "").trim();
      if (!text || text.length < 3) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      const fg = parseColor(style.color);
      if (!fg) continue;
      const bg = effectiveBg(el);
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(style.fontSize);
      const weight = parseInt(style.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const required = large ? 3 : 4.5;
      if (ratio < required - 0.05) {
        contrastSamples.push({
          text: text.slice(0, 60),
          ratio: Number(ratio.toFixed(2)),
          required,
          size,
          weight,
          color: style.color,
          bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
        });
      }
    }

    const smallTargets = [];
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (el.getAttribute("aria-hidden") === "true") return;
      // Visually-hidden skip links / screen-reader-only elements are not
      // pointer targets in their hidden state.
      if (rect.width <= 2 && rect.height <= 2) return;
      const labelled = el.closest("label");
      if (labelled) {
        const lr = labelled.getBoundingClientRect();
        if (lr.height >= 24 && lr.width >= 24) return;
      }
      // Inline links inside running text are exempt from target-size rules.
      const display = getComputedStyle(el).display;
      if (display === "inline") return;
      if (rect.height < 24 || rect.width < 24) {
        smallTargets.push({
          text: (el.textContent || "").trim().slice(0, 40),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    });

    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      lang: document.documentElement.lang,
      h1: headings.filter((h) => h.level === 1),
      headings,
      headingJumps,
      overflowEls: overflowEls.slice(0, 12),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: vw,
      imgs,
      links,
      buttons,
      controls,
      contrastSamples: contrastSamples.slice(0, 15),
      smallTargets: smallTargets.slice(0, 15),
      mainLandmark: Boolean(document.querySelector("main")),
      headerLandmark: Boolean(document.querySelector("header")),
      footerLandmark: Boolean(document.querySelector("footer")),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      bodyFont: getComputedStyle(document.body).fontFamily,
      hasRadixSelect: Boolean(document.querySelector("[data-radix-select-trigger]")),
      nativeSelects: [...document.querySelectorAll("select")].filter(
        (el) => el.getAttribute("aria-hidden") !== "true" && el.tabIndex !== -1,
      ).length,
      nativeDateInputs: document.querySelectorAll('input[type="date"]').length,
      docHeight: document.documentElement.scrollHeight,
    };
  });

  await context.close();

  const record = {
    route: route.path,
    name: route.name,
    viewport: viewport.name,
    status: response?.status() ?? null,
    screenshot: path.relative(process.cwd(), screenshot),
    consoleErrors,
    pageErrors,
    failedRequests,
    audit,
  };

  return record;
}

/* ------------------------------ run ------------------------------------- */

async function launchBrowser() {
  // Prefer the locally installed Chrome (the Playwright CDN is unreachable here);
  // fall back to the bundled Chromium when it is available.
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return await chromium.launch();
  }
}

const browser = await launchBrowser();

for (const viewport of VIEWPORTS) {
  for (const route of ROUTES) {
    const record = await collectPage(browser, route, viewport);
    if (!record) continue;
    results.pages.push(record);

    const a = record.audit;
    const where = `${route.path} @${viewport.name}`;

    if (record.status && record.status >= 500) {
      issue("blocker", where, `HTTP ${record.status}`);
    }
    if (record.consoleErrors.length && route.name !== "404") {
      issue("high", where, `Console errors: ${record.consoleErrors.length}`, record.consoleErrors.slice(0, 3));
    }
    if (record.pageErrors.length) {
      issue("blocker", where, "Uncaught page error", record.pageErrors.slice(0, 2));
    }
    if (a.scrollWidth > a.innerWidth + 1) {
      issue("high", where, `Horizontal overflow: scrollWidth ${a.scrollWidth} > ${a.innerWidth}`, a.overflowEls);
    }
    if (a.h1.length !== 1) {
      issue("high", where, `Expected exactly one h1, found ${a.h1.length}`, a.h1.map((h) => h.text));
    }
    if (a.headingJumps.length) {
      issue("medium", where, "Heading level jump", a.headingJumps.slice(0, 4));
    }
    if (!a.mainLandmark) issue("medium", where, "Missing <main> landmark");
    if (!a.headerLandmark) issue("medium", where, "Missing <header> landmark");
    if (!a.footerLandmark) issue("medium", where, "Missing <footer> landmark");
    if (a.lang !== "en-GB" && a.lang !== "en") {
      issue("low", where, `html lang is "${a.lang}"`);
    }
    if (!a.description) issue("medium", where, "Missing meta description");

    const badImgs = a.imgs.filter((i) => i.alt === null);
    if (badImgs.length) issue("high", where, "Images missing alt attribute", badImgs);
    const brokenImgs = a.imgs.filter((i) => i.complete && i.naturalWidth === 0);
    if (brokenImgs.length) issue("high", where, "Images failed to load", brokenImgs.map((i) => i.src));

    const deadLinks = a.links.filter((l) => !l.href || l.href === "#" || l.href === "javascript:void(0)");
    if (deadLinks.length) issue("high", where, "Dead links", deadLinks.slice(0, 6));

    const unnamedButtons = a.buttons.filter((b) => !b.name);
    if (unnamedButtons.length) issue("high", where, "Buttons without accessible name", unnamedButtons.slice(0, 6));

    const unlabelled = a.controls.filter((c) => !c.labelled);
    if (unlabelled.length) issue("high", where, "Form controls without labels", unlabelled.slice(0, 6));

    if (a.contrastSamples.length) {
      issue("medium", where, `Contrast failures: ${a.contrastSamples.length}`, a.contrastSamples.slice(0, 6));
    }
    if (a.smallTargets.length) {
      issue("low", where, `Small tap targets: ${a.smallTargets.length}`, a.smallTargets.slice(0, 6));
    }
    if (a.nativeSelects > 0) issue("medium", where, `Native <select> controls: ${a.nativeSelects}`);
    if (a.nativeDateInputs > 0) issue("medium", where, `Native date inputs: ${a.nativeDateInputs}`);
    if (record.failedRequests.length && route.name !== "404") {
      issue("medium", where, `Failed requests: ${record.failedRequests.length}`, record.failedRequests.slice(0, 4));
    }
  }
}

/* --------------------------- interaction tests -------------------------- */

async function testQuoteForm(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const out = { route: "/quote", steps: [] };

  const requests = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/")) requests.push({ url: r.url(), method: r.method() });
  });

  await page.goto(`${BASE}/quote`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const submit = page.getByRole("button", { name: /request|quote|submit|send/i }).first();
  const hasSubmit = (await submit.count()) > 0;
  out.steps.push({ step: "submit-found", ok: hasSubmit });

  if (hasSubmit) {
    await submit.click();
    await page.waitForTimeout(900);
    const invalidCount = await page.locator("[aria-invalid='true']").count();
    const alerts = await page.getByRole("alert").count();
    out.steps.push({ step: "empty-submit-validation", invalidFields: invalidCount, alerts });
    if (invalidCount === 0 && alerts === 0) {
      issue("blocker", "/quote", "Submitting an empty quote form produced no validation feedback");
    }
    if (requests.length > 0) {
      issue("high", "/quote", "Empty quote form still hit the API", requests);
    }

    // Fill with valid data
    const fill = async (labelRe, value) => {
      const field = page.getByLabel(labelRe).first();
      if ((await field.count()) === 0) return false;
      await field.fill(value);
      return true;
    };

    await fill(/full name/i, "Alex Morgan");
    await fill(/email/i, "alex.morgan@example.com");
    await fill(/phone/i, "07700 900123");
    await fill(/moving from/i, "12 Test Street, Manchester M1 1AA");
    await fill(/moving to/i, "48 Sample Road, Leeds LS1 2AB");

    // date picker
    const dateTrigger = page.getByRole("button", { name: /select a date|date/i }).first();
    if ((await dateTrigger.count()) > 0) {
      await dateTrigger.click();
      await page.waitForTimeout(300);
      const day = page.locator("[role='dialog'] button, [data-radix-popper-content-wrapper] button").filter({ hasText: /^\d{1,2}$/ }).nth(20);
      if ((await day.count()) > 0) {
        await day.click();
      } else {
        await page.keyboard.press("Escape");
      }
    }

    // property type select
    const selectTrigger = page.getByRole("combobox").first();
    if ((await selectTrigger.count()) > 0) {
      await selectTrigger.click();
      await page.waitForTimeout(250);
      const option = page.getByRole("option").nth(1);
      if ((await option.count()) > 0) await option.click();
    }

    // service checkbox
    const serviceBox = page.getByRole("checkbox").first();
    if ((await serviceBox.count()) > 0) await serviceBox.click();

    await page.waitForTimeout(200);
    requests.length = 0;
    await submit.click();
    await page.waitForTimeout(2500);

    const bodyText = await page.locator("body").innerText();
    const successLike = /thank you|request received|we'll be in touch|reference/i.test(bodyText);
    const errorLike = /not connected|could not|couldn't|try again|error|unavailable|being finalised/i.test(bodyText);
    const toastText = await page.locator("[data-sonner-toast]").allInnerTexts().catch(() => []);

    out.steps.push({
      step: "valid-submit",
      apiCalls: requests.length,
      successLike,
      errorLike,
      toast: toastText.join(" | ").slice(0, 200),
    });

    if (successLike && requests.length === 0) {
      issue("blocker", "/quote", "Quote form reported success without calling the API");
    }
    if (requests.length > 0 && successLike && !errorLike) {
      const res = await page.request.post(`${BASE}/api/quote`, { data: {} }).catch(() => null);
      const status = res?.status();
      if (status === 503 && successLike) {
        issue("blocker", "/quote", "Quote form showed success while the API returns 503 (backend not configured)");
      }
    }
  }

  await context.close();
  return out;
}

async function testContactForm(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const out = { route: "/contact", steps: [] };
  const requests = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/")) requests.push({ url: r.url(), method: r.method() });
  });

  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const submit = page.getByRole("button", { name: /send|submit|message/i }).first();
  const hasSubmit = (await submit.count()) > 0;
  out.steps.push({ step: "submit-found", ok: hasSubmit });

  if (hasSubmit) {
    await submit.click();
    await page.waitForTimeout(800);
    const invalidCount = await page.locator("[aria-invalid='true']").count();
    out.steps.push({ step: "empty-submit-validation", invalidFields: invalidCount });
    if (invalidCount === 0) {
      issue("blocker", "/contact", "Submitting an empty contact form produced no validation feedback");
    }
    if (requests.length > 0) {
      issue("high", "/contact", "Empty contact form still hit the API", requests);
    }
  }

  await context.close();
  return out;
}

async function testApiContracts(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const out = {};

  for (const endpoint of ["/api/quote", "/api/contact"]) {
    const res = await page.request.post(`${BASE}${endpoint}`, { data: {} }).catch(() => null);
    out[endpoint] = { status: res?.status() ?? null, body: (await res?.text().catch(() => ""))?.slice(0, 200) };
    if (!res) {
      issue("high", endpoint, "API route unreachable");
      continue;
    }
    if (res.status() < 400) {
      issue("blocker", endpoint, `Empty payload accepted with HTTP ${res.status()} — expected validation failure`);
    }
  }

  await context.close();
  return out;
}

async function testNavigation(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("a[href^='/']")]
      .map((a) => a.getAttribute("href"))
      .filter((href, i, arr) => href && arr.indexOf(href) === i),
  );

  const statuses = [];
  for (const href of hrefs) {
    const res = await page.request.get(BASE + href).catch(() => null);
    statuses.push({ href, status: res?.status() ?? 0 });
  }
  const broken = statuses.filter((s) => s.status >= 400);
  if (broken.length) issue("high", "navigation", "Internal links returning errors", broken);

  // mobile menu
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);
  const menuButton = page.getByRole("button", { name: /menu/i }).first();
  let mobileMenu = { found: (await menuButton.count()) > 0 };
  if (mobileMenu.found) {
    await menuButton.click();
    await page.waitForTimeout(500);
    mobileMenu.opened = (await page.locator("[role='dialog']").count()) > 0;
    if (!mobileMenu.opened) issue("high", "/", "Mobile menu button did not open a dialog");
    await page.keyboard.press("Escape");
  } else {
    issue("high", "/", "No accessible mobile menu button found");
  }

  await context.close();
  return { links: statuses, mobileMenu };
}

/* --------------------------- keyboard access ----------------------------- */

async function testKeyboard(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const out = {};

  /* 1. Skip link is the first tab stop and moves focus to <main>. */
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  out.skipLink = await page.evaluate(() => {
    const el = document.activeElement;
    return { text: (el?.textContent || "").trim(), tag: el?.tagName };
  });
  if (!/skip to content/i.test(out.skipLink.text)) {
    issue("high", "/", "Skip link is not the first keyboard tab stop", out.skipLink);
  }
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  out.skipTarget = await page.evaluate(() => window.location.hash);
  if (out.skipTarget !== "#main") {
    issue("medium", "/", "Skip link did not move to #main", out.skipTarget);
  }

  /* 2. Services panel: Enter opens, Escape closes and restores focus. */
  const trigger = page.locator("header button[aria-expanded]").first();
  out.servicesTrigger = (await trigger.count()) > 0;
  if (out.servicesTrigger) {
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(350);
    out.servicesOpened = (await trigger.getAttribute("aria-expanded")) === "true";
    if (!out.servicesOpened) issue("high", "/", "Services menu did not open with Enter");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);
    out.servicesClosed = (await trigger.getAttribute("aria-expanded")) === "false";
    out.servicesFocusReturned = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-expanded") !== null,
    );
    if (!out.servicesClosed) issue("high", "/", "Services menu did not close with Escape");
    if (!out.servicesFocusReturned) {
      issue("medium", "/", "Focus was not returned to the services trigger");
    }
  }

  /* 3. FAQ accordion opens from the keyboard and exposes its panel. */
  const faqTrigger = page
    .getByRole("button", { name: /what information helps you quote/i })
    .first();
  out.faqTrigger = (await faqTrigger.count()) > 0;
  if (out.faqTrigger) {
    out.faqInitial = await faqTrigger.getAttribute("aria-expanded");
    await faqTrigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(350);
    out.faqExpanded = (await faqTrigger.getAttribute("aria-expanded")) === "true";
    if (!out.faqExpanded) issue("high", "/", "FAQ accordion did not open with Enter");
    out.faqPanelVisible = (await page.locator("[data-state='open']").count()) > 0;
    if (!out.faqPanelVisible) issue("medium", "/", "FAQ panel not visible after opening");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    out.faqCollapsed = (await faqTrigger.getAttribute("aria-expanded")) === "false";
  }

  /* 4. Mobile menu: keyboard opens the sheet and Escape closes it. */
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);
  const menuButton = page.getByRole("button", { name: /menu/i }).first();
  if ((await menuButton.count()) > 0) {
    await menuButton.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(450);
    out.mobileOpened = (await page.locator("[role='dialog']").count()) > 0;
    if (!out.mobileOpened) issue("high", "/", "Mobile menu did not open from the keyboard");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    out.mobileClosed = (await page.locator("[role='dialog']").count()) === 0;
    if (!out.mobileClosed) issue("medium", "/", "Mobile menu did not close with Escape");
  }

  await context.close();
  return out;
}

/* --------------------------- booking bubble ------------------------------ */

async function testBookingBubble(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const out = {};
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 160));
  });
  page.on("pageerror", (error) => consoleErrors.push("pageerror: " + error.message.slice(0, 160)));

  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  /* The accessible name changes between "Book now" and "Close booking
     options", so the stable hook is the aria-controls relationship. */
  const trigger = page.locator('button[aria-controls="booking-options-panel"]');
  out.present = (await trigger.count()) > 0;
  if (!out.present) {
    issue("high", "/", "Floating booking action is missing");
    await context.close();
    return out;
  }

  out.expandedInitial = await trigger.getAttribute("aria-expanded");
  out.controls = await trigger.getAttribute("aria-controls");
  if (out.expandedInitial !== "false") {
    issue("medium", "/", "Booking action should start collapsed");
  }

  /* The header must no longer carry the phone number or a WhatsApp control. */
  out.headerTelLinks = await page.locator("header a[href^='tel:']").count();
  out.headerWhatsApp = await page
    .locator("header a[href*='wa.me'], header a[href*='whatsapp']")
    .count();
  if (out.headerTelLinks > 0 || out.headerWhatsApp > 0) {
    issue("high", "/", "Phone or WhatsApp still rendered in the header navigation", {
      tel: out.headerTelLinks,
      whatsapp: out.headerWhatsApp,
    });
  }

  /* Opens, exposes both channels, stays inside the viewport. */
  await trigger.click();
  await page.waitForTimeout(450);
  const panel = page.locator("#booking-options-panel");
  out.panelVisible = await panel.isVisible();
  out.expandedAfterClick = await trigger.getAttribute("aria-expanded");
  if (!out.panelVisible) issue("high", "/", "Booking action did not open its panel");

  out.links = await panel.locator("a").evaluateAll((els) =>
    els.map((a) => ({ text: (a.textContent || "").replace(/\s+/g, " ").trim(), href: a.getAttribute("href") })),
  );
  const tel = out.links.find((l) => l.href?.startsWith("tel:"));
  const whatsapp = out.links.find((l) => l.href?.includes("wa.me/"));
  out.hasCall = Boolean(tel);
  out.hasWhatsApp = Boolean(whatsapp);
  if (!tel) issue("high", "/", "Booking panel has no call link");
  if (!whatsapp) issue("high", "/", "Booking panel has no WhatsApp link");
  if (whatsapp && !/^https:\/\/wa\.me\/\d{10,15}/.test(whatsapp.href)) {
    issue("high", "/", "WhatsApp link is not a valid wa.me URL", whatsapp.href);
  }
  out.whatsAppGlyph = (await panel.locator("svg path").count()) > 0;
  if (!out.whatsAppGlyph) issue("medium", "/", "WhatsApp row has no icon");

  const box = await panel.boundingBox();
  out.insideViewport = Boolean(
    box && box.x >= 0 && box.y >= 0 && box.x + box.width <= 1440 && box.y + box.height <= 900,
  );
  if (!out.insideViewport) issue("high", "/", "Booking panel overflows the viewport", box);

  /* Escape closes and returns focus to the trigger. */
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  out.closedWithEscape = !(await panel.isVisible().catch(() => false));
  out.focusReturned = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-controls") === "booking-options-panel",
  );
  if (!out.closedWithEscape) issue("high", "/", "Booking panel did not close with Escape");
  if (!out.focusReturned) issue("medium", "/", "Focus did not return to the booking trigger");

  /* Keyboard only: Enter opens, Escape closes. */
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  out.openedWithEnter = (await trigger.getAttribute("aria-expanded")) === "true";
  if (!out.openedWithEnter) issue("high", "/", "Booking panel did not open with Enter");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);

  /* Available on inner pages too. */
  await page.goto(BASE + "/quote", { waitUntil: "networkidle" });
  out.presentOnQuote =
    (await page.locator('button[aria-controls="booking-options-panel"]').count()) > 0;
  if (!out.presentOnQuote) issue("medium", "/quote", "Floating booking action missing on /quote");

  out.consoleErrors = consoleErrors;
  if (consoleErrors.length > 0) {
    issue("high", "/", "Console errors while using the booking action", consoleErrors);
  }

  await context.close();
  return out;
}

/* ------------------------------ run 2 ----------------------------------- */

results.interactions = {
  quoteForm: await testQuoteForm(browser),
  contactForm: await testContactForm(browser),
  api: await testApiContracts(browser),
  navigation: await testNavigation(browser),
  keyboard: await testKeyboard(browser),
  booking: await testBookingBubble(browser),
};

await browser.close();

results.finishedAt = new Date().toISOString();
results.summary = {
  pagesChecked: results.pages.length,
  blockers: results.issues.filter((i) => i.severity === "blocker").length,
  high: results.issues.filter((i) => i.severity === "high").length,
  medium: results.issues.filter((i) => i.severity === "medium").length,
  low: results.issues.filter((i) => i.severity === "low").length,
};

await writeFile(path.join(OUT, "qa-results.json"), JSON.stringify(results, null, 2));

const bySeverity = { blocker: [], high: [], medium: [], low: [] };
for (const item of results.issues) bySeverity[item.severity]?.push(item);

const md = [
  "# QA report — Prime House Removals",
  "",
  `Run: ${results.startedAt} → ${results.finishedAt}`,
  `Base URL: ${BASE}`,
  "",
  "## Summary",
  "",
  `- Pages checked: ${results.summary.pagesChecked}`,
  `- Blockers: ${results.summary.blockers}`,
  `- High: ${results.summary.high}`,
  `- Medium: ${results.summary.medium}`,
  `- Low: ${results.summary.low}`,
  "",
  "## Issues",
  "",
];

for (const severity of ["blocker", "high", "medium", "low"]) {
  const items = bySeverity[severity];
  if (!items.length) continue;
  md.push(`### ${severity.toUpperCase()} (${items.length})`, "");
  for (const item of items) {
    md.push(`- **${item.page}** — ${item.message}`);
    if (item.detail) {
      md.push("  ```json", "  " + JSON.stringify(item.detail).slice(0, 900), "  ```");
    }
  }
  md.push("");
}

md.push("## Interaction results", "", "```json", JSON.stringify(results.interactions, null, 2).slice(0, 6000), "```", "");

await writeFile(path.join(OUT, "qa-report.md"), md.join("\n"));

console.log(JSON.stringify(results.summary, null, 2));
console.log("Report:", path.join(OUT, "qa-report.md"));
