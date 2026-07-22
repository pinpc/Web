#!/usr/bin/env python3
"""Extract product images from Punu catalog PDF."""
import json
import os
import sys

import fitz

PDF = r"c:\Users\pinpc\Downloads\2026  table tennis catalog.pdf"
OUT = r"c:\temp_web\robot\images\_extracted"
MANIFEST = r"c:\temp_web\robot\images\_extracted\manifest.json"


def main():
    os.makedirs(OUT, exist_ok=True)
    doc = fitz.open(PDF)
    manifest = []
    for i, page in enumerate(doc):
        imgs = page.get_images(full=True)
        text = page.get_text("text")[:800]
        page_entry = {"page": i + 1, "image_count": len(imgs), "text_preview": text, "files": []}
        for j, img in enumerate(imgs):
            xref = img[0]
            base = doc.extract_image(xref)
            ext = base["ext"]
            w, h = base.get("width"), base.get("height")
            fn = f"page{i + 1:02d}_img{j + 1:02d}_{w}x{h}.{ext}"
            path = os.path.join(OUT, fn)
            with open(path, "wb") as f:
                f.write(base["image"])
            page_entry["files"].append({"file": fn, "width": w, "height": h, "ext": ext})
        manifest.append(page_entry)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"Extracted images from {len(doc)} pages -> {OUT}")


if __name__ == "__main__":
    main()
