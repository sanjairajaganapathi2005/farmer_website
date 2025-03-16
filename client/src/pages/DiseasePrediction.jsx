import React, { useState } from "react";
import axios from "axios";
import "../styles/disease.css";

const flask_url = "http://localhost:5000/";

const DiseasePrediction = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Generate image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            alert("Please upload an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const { data } = await axios.post(`${flask_url}disease-prediction`, formData);
            setResult(data.disease);
        } catch (error) {
            console.error("Error predicting disease:", error);
            setResult("Error predicting disease.");
        }
    };

    return (
        <div className="disease-container">
            <h2>Crop Disease Prediction</h2>

            {/* Styled Upload Button */}
            <label htmlFor="file-upload" className="upload-button">
                Upload Image
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />

            {/* Image Preview */}
            {preview && (
                <div className="preview-container">
                    <img src={preview} alt="Uploaded Preview" className="preview-image" />
                </div>
            )}

            <button onClick={handleSubmit}>Predict</button>

            {result && <h3>Predicted Disease: {result}</h3>}
        </div>
    );
};

export default DiseasePrediction;
