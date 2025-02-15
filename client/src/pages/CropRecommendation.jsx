import React, { useState } from "react";
import "../styles/crop.css";

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        temperature: "",
        time: "",
        season: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting crop recommendation:", formData);
        // Send data to backend for prediction
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Crop Recommendation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="temperature"
                    placeholder="Enter Temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Enter Time"
                    value={formData.time}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="season"
                    placeholder="Enter Season"
                    value={formData.season}
                    onChange={handleChange}
                />
                <button type="submit">Get Recommendation</button>
            </form>
        </div>
    );
};

export default CropRecommendation;
