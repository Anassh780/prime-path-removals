from PIL import Image
from collections import Counter
import colorsys, os

def analyse(path, top=14):
    im = Image.open(path)
    print(f"\n=== {os.path.basename(path)} | {im.size[0]}x{im.size[1]} | {im.mode} ===")
    rgb = im.convert("RGB")
    # Downscale for stable colour statistics
    small = rgb.resize((160, 160))
    px = list(small.getdata())

    # Quantise to reduce noise
    q = rgb.quantize(colors=16, method=Image.Quantize.MEDIANCUT).convert("RGB")
    qpx = list(q.resize((160, 160)).getdata())
    counts = Counter(qpx)
    total = sum(counts.values())

    print(f"{'hex':<9}{'share':>7}   {'HSL (h,s,l)':<22} role guess")
    for color, n in counts.most_common(top):
        r, g, b = color
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        share = 100 * n / total
        if l > 0.92 and s < 0.15:
            role = "near-white / surface"
        elif l < 0.12:
            role = "near-black / ink"
        elif s < 0.12:
            role = "neutral grey"
        elif h < 0.05 or h > 0.92:
            role = "red/orange accent"
        elif h < 0.14:
            role = "amber accent"
        elif h < 0.45:
            role = "green"
        elif h < 0.58:
            role = "cyan/teal"
        elif h < 0.72:
            role = "blue"
        elif h < 0.83:
            role = "violet"
        else:
            role = "magenta/pink"
        print(f"#{r:02x}{g:02x}{b:02x}   {share:5.1f}%   h={h*360:5.1f} s={s*100:4.1f}% l={l*100:5.1f}%  {role}")

    # Saturated pixels only (ignores white/black backgrounds)
    sat = [(c, n) for c, n in counts.items()
           if colorsys.rgb_to_hls(c[0]/255, c[1]/255, c[2]/255)[2] > 0.35
           and colorsys.rgb_to_hls(c[0]/255, c[1]/255, c[2]/255)[1] > 0.2]
    sat.sort(key=lambda x: -x[1])
    print("  saturated / brand colours:", ", ".join(f"#{c[0]:02x}{c[1]:02x}{c[2]:02x} ({100*n/total:.1f}%)" for c, n in sat[:8]) or "none")

    # Corner + centre samples (background detection)
    w, h = rgb.size
    pts = {
        "top-left": (2, 2), "top-right": (w - 3, 2),
        "bottom-left": (2, h - 3), "bottom-right": (w - 3, h - 3),
        "centre": (w // 2, h // 2),
    }
    print("  samples:", ", ".join(f"{k}=#{rgb.getpixel(v)[0]:02x}{rgb.getpixel(v)[1]:02x}{rgb.getpixel(v)[2]:02x}" for k, v in pts.items()))

for p in ["public/brand/logo.png", "public/brand/logo.jpg", "src/app/icon.png"]:
    if os.path.exists(p):
        analyse(p)
