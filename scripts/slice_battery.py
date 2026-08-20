import numpy as np
from PIL import Image
import os

def slice_image():
    # Open the uploaded image
    img = Image.open('public/battery-exploded.png').convert('RGBA')
    width, height = img.size

    # Crop out the text on the right side. The battery is roughly in the left 60%.
    battery_img = img.crop((0, 0, int(width * 0.60), height))
    data = np.array(battery_img)

    # Make the white/off-white background transparent
    r, g, b, a = data[..., 0], data[..., 1], data[..., 2], data[..., 3]
    # The background is very light grey/beige in the new image
    mask = (r > 230) & (g > 230) & (b > 230)
    data[..., 3][mask] = 0

    battery_rgba = Image.fromarray(data)

    # Define the 6 layers based on approximate vertical percentages
    # We use slight overlaps to ensure no pixels are lost
    slices = [
        (0.00, 0.18, 'layer-1-top-plate.png'),
        (0.14, 0.28, 'layer-2-busbars.png'),
        (0.24, 0.40, 'layer-3-cell-holder.png'),
        (0.35, 0.65, 'layer-4-cells.png'),
        (0.58, 0.83, 'layer-5-bms.png'),
        (0.78, 1.00, 'layer-6-bottom-plate.png')
    ]

    for start_pct, end_pct, filename in slices:
        y_start = int(height * start_pct)
        y_end = int(height * end_pct)
        slice_img = battery_rgba.crop((0, y_start, battery_rgba.width, y_end))
        
        # We need to add transparent padding so all images are the same height 
        # as the original, meaning we can stack them easily in CSS without 
        # worrying about absolute positioning offsets.
        full_height_img = Image.new('RGBA', (battery_rgba.width, height), (0, 0, 0, 0))
        full_height_img.paste(slice_img, (0, y_start))
        
        full_height_img.save(f'public/{filename}')
        print(f"Saved {filename}")

if __name__ == "__main__":
    slice_image()
