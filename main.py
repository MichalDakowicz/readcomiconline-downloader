import os
from PIL import Image

def convert_jpg_to_pdf_and_delete_images(folder_path):
    images = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".jpg"):
            image_path = os.path.join(folder_path, filename)
            image = Image.open(image_path)
            images.append(image.convert("RGB"))
    
    if images:
        output_path = os.path.join(folder_path, "output.pdf")
        images[0].save(output_path, save_all=True, append_images=images[1:])
        print(f"Saved PDF to {output_path}")

        # Delete the images
        for filename in os.listdir(folder_path):
            if filename.endswith(".jpg"):
                os.remove(os.path.join(folder_path, filename))
        print("Deleted the images")

# Usage example
convert_jpg_to_pdf_and_delete_images("downloads")