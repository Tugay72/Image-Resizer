import logging
from flask import Flask, request, jsonify, send_file # type: ignore
from PIL import Image
import io
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)  # Enable debug logging

@app.route('/')
def home():
    return 'Home!'

@app.route("/upload", methods=["POST"])
def upload_and_resize_image():
    try:
        # Check if 'image' is in request.files
        if "image" not in request.files:
            logging.error("No file part in the request.")
            return jsonify({"error": "No file part"}), 400

        file = request.files["image"]
        if file.filename == "":
            logging.error("No file selected.")
            return jsonify({"error": "No selected file"}), 400

        # Get width and height from the form with default values
        resized_width = int(request.form.get('width', 1500))
        resized_height = int(request.form.get('height', 1500))
        resized_type = str(request.form.get('fileType', 'JPEG'))
        logging.debug(f"Received width: {resized_width}, height: {resized_height}")

        # Open the image with Pillow and resize it
        image = Image.open(file)
        resized_image = image.resize((resized_width, resized_height))

        # Save the resized image to a BytesIO object
        img_io = io.BytesIO()
        resized_image.save(img_io, format=resized_type)
        img_io.seek(0)

        return send_file(img_io, mimetype=f"image/{resized_type}")
    
    except Exception as e:
        logging.exception("Error in processing the upload request")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
