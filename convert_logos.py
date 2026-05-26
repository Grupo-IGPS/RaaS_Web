#!/usr/bin/env python3
"""
Converts every PNG in public/empresas/ to lossless WebP.
Run from the WEB v2.0 root directory:

    pip install Pillow
    python convert_logos.py
"""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Pillow not found. Install it with:  pip install Pillow")

src_dir = Path("public/empresas")
if not src_dir.is_dir():
    raise SystemExit(f"Directory not found: {src_dir.resolve()}")

converted = 0
for png in sorted(src_dir.glob("*.png")):
    webp = png.with_suffix(".webp")
    with Image.open(png) as im:
        im.save(webp, format="webp", lossless=True)
    print(f"  {png.name}  ->  {webp.name}")
    converted += 1

if converted == 0:
    print("No PNG files found.")
else:
    print(f"\nDone: {converted} file(s) converted in {src_dir.resolve()}")
