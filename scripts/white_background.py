#!/usr/bin/env python3
"""Replace light neutral background with pure white."""
import sys
from pathlib import Path

import numpy as np
from PIL import Image


def to_white_bg(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    rgb = data[:, :, :3].astype(np.float32)
    brightness = rgb.mean(axis=2)
    spread = rgb.max(axis=2) - rgb.min(axis=2)

    # Light gray studio background + floor gradient
    bg = (brightness >= 175) & (spread <= 35)
    # Soften edges: include near-background pixels
    bg |= (brightness >= 165) & (spread <= 22)

    data[bg, 0] = 255
    data[bg, 1] = 255
    data[bg, 2] = 255
    data[bg, 3] = 255

    Image.fromarray(data, "RGBA").convert("RGB").save(dst, format="PNG", optimize=True)


if __name__ == "__main__":
    to_white_bg(Path(sys.argv[1]), Path(sys.argv[2]))
