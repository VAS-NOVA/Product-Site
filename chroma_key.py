from PIL import Image
import numpy as np

def remove_bg():
    input_path = 'public/images/coming_soon.png'
    output_path = 'public/images/coming_soon_chromakey.png'
    
    print(f"Loading {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # The image has a slight gradient. We can take samples from corners to build a color profile
    bg_color_tl = data[0, 0, :3].astype(np.float32)
    bg_color_tr = data[0, -1, :3].astype(np.float32)
    bg_color_bl = data[-1, 0, :3].astype(np.float32)
    bg_color_br = data[-1, -1, :3].astype(np.float32)
    
    # Mean background color
    bg_color = (bg_color_tl + bg_color_tr + bg_color_bl + bg_color_br) / 4.0
    
    # Calculate Euclidean distance of all pixels to the average background color
    diff = np.sqrt(np.sum((data[:, :, :3].astype(np.float32) - bg_color) ** 2, axis=-1))
    
    # Set thresholds for what is considered background
    # Since the charger is mostly dark/silver and background is beige, we can use a wide threshold
    threshold = 25  # Pixels closer than this are fully transparent
    fade = 35       # Pixels between threshold and threshold+fade are semi-transparent (anti-aliasing/blur preservation)
    
    # Create new alpha channel
    alpha = np.ones_like(diff) * 255
    alpha[diff < threshold] = 0
    
    # Apply smooth fade for edges and blurred wire
    mask = (diff >= threshold) & (diff < threshold + fade)
    alpha[mask] = ((diff[mask] - threshold) / fade) * 255
    
    # Assign the new alpha channel
    data[:, :, 3] = alpha.astype(np.uint8)
    
    print(f"Saving to {output_path}...")
    Image.fromarray(data).save(output_path)
    print("Background removed using Chroma Keying!")

if __name__ == "__main__":
    remove_bg()
