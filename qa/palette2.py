from PIL import Image
from collections import Counter
import colorsys

im = Image.open("public/brand/logo.png").convert("RGB")
W, H = im.size

def hexof(c):
    return f"#{c[0]:02x}{c[1]:02x}{c[2]:02x}"

def classify(c):
    r, g, b = [v / 255 for v in c]
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    hd = h * 360
    if l > 0.90 and s < 0.25:
        return "white"
    if l < 0.25:
        return "navy"
    if s < 0.18:
        return "grey"
    if 190 <= hd <= 235:
        return "blue"
    if 130 <= hd <= 175:
        return "green"
    return f"h{hd:.0f}"

# --- whole-image composition by class -------------------------------------
counts = Counter()
for y in range(0, H, 4):
    for x in range(0, W, 4):
        counts[classify(im.getpixel((x, y)))] += 1
total = sum(counts.values())
print("composition by class:")
for k, n in counts.most_common():
    print(f"  {k:<8}{100*n/total:5.1f}%")

# --- dominant colour per class --------------------------------------------
print("\nrepresentative colour per class:")
for cls in ["blue", "green", "navy", "grey"]:
    px = [im.getpixel((x, y)) for y in range(0, H, 3) for x in range(0, W, 3)
          if classify(im.getpixel((x, y))) == cls]
    if not px:
        continue
    avg = tuple(sum(p[i] for p in px) // len(px) for i in range(3))
    # most saturated representative too
    best = max(px, key=lambda p: colorsys.rgb_to_hls(*(v / 255 for v in p))[1])
    print(f"  {cls:<7} avg={hexof(avg)}  most-saturated={hexof(best)}  n={len(px)}")

# --- coarse grid to understand layout -------------------------------------
print("\ncoarse grid (12 x 12), dominant class per cell:")
grid = []
for gy in range(12):
    row = []
    for gx in range(12):
        cell = Counter()
        for y in range(gy * H // 12, (gy + 1) * H // 12, 6):
            for x in range(gx * W // 12, (gx + 1) * W // 12, 6):
                cell[classify(im.getpixel((x, y)))] += 1
        row.append(cell.most_common(1)[0][0][:2] if cell else "..")
    grid.append(row)
for r in grid:
    print("  " + " ".join(f"{c:<2}" for c in r))
