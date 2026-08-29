import sys
import subprocess
import os

try:
    from rembg import remove, new_session
    from PIL import Image
except ImportError:
    print("Installing rembg and Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "Pillow"])
    from rembg import remove, new_session
    from PIL import Image

input_path = 'public/images/coming_soon.png'
output_path = 'public/images/coming_soon_transparent.png'

print("Processing image with lightweight model...")
session = new_session("u2netp")
with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data, session=session)
        o.write(output_data)

print("Background removed successfully.")
