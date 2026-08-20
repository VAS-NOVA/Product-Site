import numpy as np
from PIL import Image
import os
import glob

src_dir = r"C:\Users\mrsub\.gemini\antigravity\brain\67ecbf31-66e6-485a-8c78-c91dda577c5b"
dest_dir = r"d:\Vas-Nova0v1\public"

patterns = {
    "layer-1-gen.png": "layer_1_top_plate_*.png",
    "layer-2-gen.png": "layer_2_busbars_*.png",
    "layer-3-gen.png": "layer_3_cell_holder_*.png",
    "layer-4-gen.png": "layer_4_cells_*.png",
    "layer-5-gen.png": "layer_5_bms_*.png",
    "layer-6-gen.png": "layer_6_bottom_plate_*.png"
}

def remove_background(img_path, out_path):
    img = Image.open(img_path).convert('RGBA')
    data = np.array(img).astype(float)
    r, g, b = data[..., 0], data[..., 1], data[..., 2]

    mask = (r > 235) & (g > 235) & (b > 235)
    data[..., 3][mask] = 0

    Image.fromarray(data.astype(np.uint8)).save(out_path)
    print(f"Processed and saved to {out_path}")

for out_name, pattern in patterns.items():
    matches = glob.glob(os.path.join(src_dir, pattern))
    if matches:
        latest = sorted(matches, key=os.path.getmtime)[-1]
        out_path = os.path.join(dest_dir, out_name)
        remove_background(latest, out_path)
    else:
        print(f"Could not find match for {pattern}")
