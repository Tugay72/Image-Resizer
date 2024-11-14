# Image Resizing and Downloading App

This web application allows users to upload an image, resize it based on custom width and height, change its format (JPG, JPEG, PNG, WEBP), and then download the resized image. It uses a Flask backend to handle image processing and React for the frontend.

## Features

- **Image Upload**: Upload images directly from your computer.
- **Resize Image**: Choose the new width and height for the image.
- **Change File Format**: Save the image in multiple formats (JPEG, PNG, WEBP).
- **Download Resized Image**: Once the image is resized, it is available for download.

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Flask (Python), Pillow for image processing
- **Libraries**:
  - React
  - Flask
  - Axios
  - Pillow
  - Flask-CORS

## Setup Instructions

### Prerequisites

- **Node.js** (for frontend)
- **Python 3.6+** (for backend)
- **pip** (for installing Python dependencies)
- **npm** or **yarn** (for managing frontend dependencies)

### Frontend Setup (React)

1. Clone the repository:

   ```bash
   gh repo clone Tugay72/Image-Resizer
   cd image-resizing-app/frontend
2. Install required dependencies:

   ```bash
   npm install

3. Start the frontend development server:

   ```bash
   npm start
This will start the React development server on http://localhost:3000.

Backend Setup (Flask)

1. Navigate to the backend directory:

   ```bash
   cd src/backend

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
3. Start the Flask server:

   ```bash
   cd path/to/your/directory
   python app.py
The backend will be running at http://localhost:5000.


Libraries and Dependencies
Frontend (React):
1. React: A JavaScript library for building user interfaces.
Install with:

   ```bash
   npm install react react-dom

2. Axios: A promise-based HTTP client for making requests to the backend.
Install with:

   ```bash
   npm install axios

3. Backend (Flask):
Flask: A micro web framework for Python, used to build the backend.
Install with:

   ```bash
   pip install flask
   
4. Flask-CORS: A package to handle Cross-Origin Resource Sharing (CORS) for making requests from the frontend to the backend.
Install with:

   ```bash
   pip install flask-cors

5. Pillow: A Python Imaging Library (PIL) fork that allows image processing (resizing, format conversion).

   ```bash
   pip install pillow


File Upload and Resizing API (Backend)
The backend handles image uploads and resizing via the /upload endpoint. The frontend sends the image file, desired width, height, and file type via a POST request. The backend resizes the image and sends the processed image back to the frontend, where it can be downloaded.
1. Example Request (Frontend):

   ```bash
   const formData = new FormData();
   formData.append('image', image);
   formData.append('width', width.toString());
   formData.append('height', height.toString());
   formData.append('fileType', imageType.toString());
  
   const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
     headers: {
         "Content-Type": "multipart/form-data",
     },
     responseType: "blob",
   });

2. Example Response (Backend):
   ```bash
   @app.route("/upload", methods=["POST"])
   def upload_and_resize_image():
    file = request.files["image"]
    resized_width = int(request.form.get('width', 1500))
    resized_height = int(request.form.get('height', 1500))
    resized_type = str(request.form.get('fileType', 'JPEG'))

    image = Image.open(file)
    resized_image = image.resize((resized_width, resized_height))
    img_io = io.BytesIO()
    resized_image.save(img_io, format=resized_type)
    img_io.seek(0)

    return send_file(img_io, mimetype=f"image/{resized_type}")

API Documentation.
POST /upload: Upload an image, resize it, and get the processed image back.
Request Body:

image: The image file.
width: Desired width of the image (default: 1500).
height: Desired height of the image (default: 1500).
fileType: Desired file format for the resized image (JPG, JPEG, PNG, WEBP).
Response: The resized image file in the specified format.

Contributing
Feel free to fork the repository and submit pull requests for any improvements or bug fixes. Contributions are welcome!

License
This project is licensed under the Creative Commons NonCommercial (CC BY-NC).
