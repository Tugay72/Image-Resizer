import React, { useState, useEffect } from "react";
import "./homepage.css";
import axios from 'axios';
import CustomFileInput from "../components/file_input_button";

function Homepage() {

  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState("JPEG");
  const [imageURL, setImageURL] = useState(null)
  const [resizedImage, setResizedImage] = useState(null);
  const [resizedImageURL, setResizedImageURL] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  //const [imageDimensions, setImageDimensions] = useState({ width: 480, height: 480 });

  // Get image file from child
  const handleImageData = (file, fileURL) => {
    setImage(file);
    setImageURL(fileURL)
  }

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    requestResizing()
  };

  // Download file
  const handleDownload = () => {
    if (resizedImageURL) {
      const link = document.createElement("a");
      link.href = resizedImageURL;
      link.download = `resized-image.${imageType.toLowerCase()}`; // You can change the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean link
    } else {
      alert("No image to download.");
    }
  };
  
  const requestResizing = async () => {
    if (!image) return;
    try {
        const formData = new FormData();
        formData.append('image', image);  // Append the actual file
        formData.append('width', width.toString());
        formData.append('height', height.toString());
        formData.append('fileType', imageType.toString());

        // Log FormData entries
        console.log("FormData entries:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
        });

        setResizedImage(response.data);
        setResizedImageURL(URL.createObjectURL(response.data))
    } catch (error) {
        console.error("Error uploading and resizing image:", error);
        if (error.response && error.response.status === 400) {
            console.log('Bad Request: ', error.message);
        }
      }
  };

  useEffect(() => {
    if (resizedImageURL) {
        handleDownload();
    }
}, [resizedImageURL]);

  // useEffect(() => {
  //   if (resizedImage || image) {
  //     const img = new Image();
  //     img.src = resizedImage || image;
  //     img.onload = () => {
  //       setImageDimensions({ width: img.width, height: img.height });
  //     };
  //   }
  // }, [resizedImage, image]);
  
  
  return (
    <div className="homepage-main">
      <>
        {image ? (
          <div className="content-container">
            <div className="image-container">
              <img
                src={resizedImageURL || imageURL}
                alt="Uploaded or resized"
                style={{
                  width: 480,//imageDimensions.width,
                  height: 480,//imageDimensions.height,
                  display: image ? 'flex' : 'none',
                  marginBottom: '4rem',
                }}
              />
            </div>
            <form onSubmit={handleSubmit} className="resize-container">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                <label htmlFor="width">Width</label>
                <input
                  id="width"
                  type="number"
                  min={0}
                  max={4160}
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                <label htmlFor="height">Height</label>
                <input
                  id="height"
                  type="number"
                  min={0}
                  max={4160}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor="imageType">Save Image as</label>
                <select
                  id="imageType"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                  style={{ marginTop: '1rem' }}
                >
                  <option value="JPEG">JPEG</option>
                  <option value="PNG">PNG</option>
                  <option value="WEBP">WEBP</option>
                </select>
              </div>
              <button type="submit" style={{ marginTop: 'auto', marginBottom: '2rem' }}>Resize</button>
            </form>
          </div>
        ) : (
          <div className="homepage-button">
            <CustomFileInput sendImageData={handleImageData} />
          </div>
        )}
      </>
    </div>
  );
}

export default Homepage;
