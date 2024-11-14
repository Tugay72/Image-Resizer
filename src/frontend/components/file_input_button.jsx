import "./file_input_button.css"
import React from "react";
import { useState, useEffect } from "react";




function CustomFileInput({sendImageData}) {


    const handleChange = (e) => {
    console.log('Image Uploaded!');
    const file = e.target.files[0];
    sendImageData(file, URL.createObjectURL(file));
}

    return(
        <div>
            <input className="file-input" id="file-upload" type='file' onChange={handleChange}/>
            <label for="file-upload" class="custom-button-main">Upload Image!</label>
        </div>
    );
}

export default CustomFileInput;

