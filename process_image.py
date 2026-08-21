from PIL import Image
import sys

def process_image():
    try:
        # Open image
        img = Image.open('public/car-exploded.png')
        img = img.convert('RGBA')
        
        # 1. Crop out the labels (right 35%)
        width, height = img.size
        # The user's screenshot showed that 35% crop left a little bit of the labels ('1. W...').
        # So we should crop the right 40% (keep 60%).
        cropped = img.crop((0, 0, int(width * 0.60), height))
        
        # 2. Make white background transparent
        datas = cropped.getdata()
        new_data = []
        for item in datas:
            # Check if the pixel is near white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        cropped.putdata(new_data)
        
        # Save processed image
        cropped.save('public/car-exploded-transparent.png', 'PNG')
        print("Successfully processed image to public/car-exploded-transparent.png")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    process_image()
