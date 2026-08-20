import os
import cv2
import numpy as np
from PIL import Image

def slice_image(image_path):
    print("Reading image...")
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    
    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    h, w = img.shape[:2]
    
    # We only care about the left 55% of the image where the battery is.
    # The right 45% is text and lines which block floodfill and cause ghosts!
    crop_w = int(w * 0.55)
    
    # Create a working copy for floodfill that is ONLY the left 55%
    img_bgr = cv2.cvtColor(img[:, :crop_w], cv2.COLOR_BGRA2BGR)
    img_floodfill = img_bgr.copy()
    
    mask = np.zeros((h + 2, crop_w + 2), np.uint8)
    
    # Flood fill from all 4 corners of the cropped area
    corners = [(0, 0), (crop_w-1, 0), (0, h-1), (crop_w-1, h-1)]
    for pt in corners:
        cv2.floodFill(img_floodfill, mask, pt, (255, 0, 255), (15, 15, 15), (15, 15, 15), cv2.FLOODFILL_FIXED_RANGE)
    
    # Identify magenta pixels in the cropped area
    is_magenta = (img_floodfill[:, :, 0] == 255) & (img_floodfill[:, :, 1] == 0) & (img_floodfill[:, :, 2] == 255)
    
    # Apply the transparency mask to the original image's cropped area
    img[:, :crop_w, 3][is_magenta] = 0
    
    # NOW we have flawless transparency around the battery!
    alpha_left = img[:, :crop_w, 3]
    
    # Filter out very faint noise
    row_sums = np.sum(alpha_left > 50, axis=1) 
    
    non_empty = row_sums > 5
    edges = np.diff(non_empty.astype(int))
    starts = np.where(edges == 1)[0] + 1
    ends = np.where(edges == -1)[0] + 1
    
    if non_empty[0]:
        starts = np.insert(starts, 0, 0)
    if non_empty[-1]:
        ends = np.append(ends, h)
        
    blocks = list(zip(starts, ends))
    blocks.sort(key=lambda x: x[1]-x[0], reverse=True)
    top_6_blocks = sorted(blocks[:6], key=lambda x: x[0])
    
    print(f"Top 6 blocks: {top_6_blocks}")
    
    filenames = [
        'layer-1-top-plate.png',
        'layer-2-busbars.png',
        'layer-3-cell-holder.png',
        'layer-4-cells.png',
        'layer-5-bms.png',
        'layer-6-bottom-plate.png'
    ]
    
    # Convert back to RGBA for PIL
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGRA2RGBA)
    img_pil = Image.fromarray(img_rgba)
    
    for i, (y_start, y_end) in enumerate(top_6_blocks):
        y_s = max(0, y_start - 5)
        y_e = min(h, y_end + 5)
        
        full_height_img = Image.new('RGBA', (crop_w, h), (0, 0, 0, 0))
        slice_img = img_pil.crop((0, y_s, crop_w, y_e))
        full_height_img.paste(slice_img, (0, y_s))
        
        out_path = os.path.join("public", filenames[i])
        full_height_img.save(out_path)
        print(f"Saved {filenames[i]}")

if __name__ == "__main__":
    slice_image("public/battery-exploded-view.png")
