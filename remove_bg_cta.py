import sys
import subprocess
import os

os.environ["U2NET_HOME"] = "d:/Vas-Nova0v1/models"

try:
    from rembg import remove, new_session
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "Pillow"])
    from rembg import remove, new_session
    from PIL import Image

# Use the EV CHARGE image from the previous session!
input_path = 'public/images/cta_image.png'
output_path = 'public/images/cta_image_transparent.png'

print("Processing EV CHARGE image...")
session = new_session("u2net")
with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data, session=session)
        o.write(output_data)

print("Background removed successfully.")
