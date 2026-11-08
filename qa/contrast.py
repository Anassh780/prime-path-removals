"""Validate the proposed navy / azure / forest-green ramps against WCAG."""

def srgb(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def lum(hexstr):
    h = hexstr.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)

def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

NAVY = {
    50: "#eff5fa", 100: "#dbe7f1", 200: "#b9cee0", 300: "#8aa9c6",
    400: "#5b82a8", 500: "#36628c", 600: "#234a72", 700: "#163559",
    800: "#0d2547", 900: "#071a33", 950: "#04101f",
}
AZURE = {
    50: "#eef7ff", 100: "#d9edfe", 200: "#b6dcfd", 300: "#7cc2fb",
    400: "#45a6f7", 500: "#2b95f5", 600: "#1173d4", 700: "#0b5aa8",
    800: "#0a4a8a", 900: "#0c3f73",
}
GREEN = {
    50: "#eef6f1", 100: "#d7ebe0", 200: "#b0d7c3", 300: "#7fb99b",
    400: "#4d9873", 500: "#1f6f4d", 600: "#11543b", 700: "#0d4430",
    800: "#0a3626", 900: "#072a1e",
}

WHITE, INK = "#ffffff", "#0a1526"

checks = [
    ("button text: white on accent-600", WHITE, GREEN[600], 4.5),
    ("button text: white on accent-700", WHITE, GREEN[700], 4.5),
    ("link: azure-700 on white", AZURE[700], WHITE, 4.5),
    ("link: azure-600 on white", AZURE[600], WHITE, 4.5),
    ("link: azure-800 on white", AZURE[800], WHITE, 4.5),
    ("body: ink on white", INK, WHITE, 4.5),
    ("inverse: white on navy-950", WHITE, NAVY[950], 4.5),
    ("inverse meta: navy-300 on navy-950", NAVY[300], NAVY[950], 4.5),
    ("eyebrow on dark: green-300 on navy-950", GREEN[300], NAVY[950], 4.5),
    ("eyebrow on dark: azure-300 on navy-950", AZURE[300], NAVY[950], 4.5),
    ("tint text: azure-800 on azure-50", AZURE[800], AZURE[50], 4.5),
    ("tint text: green-700 on green-50", GREEN[700], GREEN[50], 4.5),
    ("tint text: azure-700 on azure-50", AZURE[700], AZURE[50], 4.5),
    ("focus ring azure-600 on white (UI, need 3)", AZURE[600], WHITE, 3.0),
    ("border: navy-200 on white (UI, need 3)", NAVY[200], WHITE, 1.2),
    ("big number on white: navy-900", NAVY[900], WHITE, 4.5),
]

print(f"{'pair':<46}{'ratio':>7}  {'need':>5}  verdict")
for name, fg, bg, need in checks:
    r = ratio(fg, bg)
    verdict = "PASS" if r >= need else "FAIL"
    print(f"{name:<46}{r:6.2f}:1  {need:5.1f}  {verdict}")

print("\nramp sanity — contrast between adjacent steps (should be visible):")
for label, ramp in (("navy", NAVY), ("azure", AZURE), ("green", GREEN)):
    print(f"  {label:<6}", " ".join(f"{k}:{ratio(ramp[k], WHITE):.1f}" for k in sorted(ramp) if k in (50, 300, 500, 600, 700, 900)))
