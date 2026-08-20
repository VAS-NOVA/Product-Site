import os
import cv2
import numpy as np
from PIL import Image

def slice_image(image_path):
    print("Reading image...")
    # Read the image 
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("Error: Could not read image.")
        return
        
    if img.shape[2] == 3:
        # Convert BGR to BGRA
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Use floodFill from the top-left corner to remove background
    h, w = img.shape[:2]
    mask = np.zeros((h + 2, w + 2), np.uint8)
    
    img_bgr = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    img_floodfill = img_bgr.copy()
    
    # Flood fill background with magenta
    cv2.floodFill(img_floodfill, mask, (0, 0), (255, 0, 255), (20, 20, 20), (20, 20, 20), cv2.FLOODFILL_FIXED_RANGE)
    cv2.floodFill(img_floodfill, mask, (w-1, 0), (255, 0, 255), (20, 20, 20), (20, 20, 20), cv2.FLOODFILL_FIXED_RANGE)
    
    # Set alpha to 0 where it is magenta
    is_magenta = (img_floodfill[:, :, 0] == 255) & (img_floodfill[:, :, 1] == 0) & (img_floodfill[:, :, 2] == 255)
    img[is_magenta, 3] = 0
    
    # Find blocks using the left 55% (battery body)
    alpha = img[:, :, 3]
    alpha_left = alpha[:, :int(w * 0.55)]
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
        
        crop_width = int(w * 0.55)
        
        full_height_img = Image.new('RGBA', (crop_width, h), (0, 0, 0, 0))
        slice_img = img_pil.crop((0, y_s, crop_width, y_e))
        full_height_img.paste(slice_img, (0, y_s))
        
        out_path = os.path.join("public", filenames[i])
        full_height_img.save(out_path)
        print(f"Saved {filenames[i]}")

if __name__ == "__main__":
    slice_image("public/battery-exploded-view.png")
