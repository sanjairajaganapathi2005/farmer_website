import React, { useState } from "react";
import axios from "axios";
import "../styles/crop.css";

const flask_url = "http://localhost:5000/";

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        soil_ph: "",
        rainfall: "",
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResponse(null);

        try {
            const { data } = await axios.post(`${flask_url}recommend-crop`, formData);
            if (data.error) {
                setError(data.error);
            } else {
                setResponse({
                    recommendedCrop: data.recommended_crop,
                    recommendedDate: new Date().toLocaleString()
                });
            }
        } catch (err) {
            setError("Error fetching recommendation. Please try again.");
        }
    };

    return (
        <div className="container">
           <form onSubmit={handleSubmit}>
                <h1>Crop Recommendation System</h1>
                
                <label htmlFor="nitrogen">Nitrogen (kg/ha)</label>
                <input type="number" id="nitrogen" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />
                
                <label htmlFor="phosphorus">Phosphorus (kg/ha)</label>
                <input type="number" id="phosphorus" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required />
                
                <label htmlFor="potassium">Potassium (kg/ha)</label>
                <input type="number" id="potassium" name="potassium" value={formData.potassium} onChange={handleChange} required />
                
                <label htmlFor="temperature">Temperature (°C)</label>
                <input type="number" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} required />
                
                <label htmlFor="humidity">Humidity (%)</label>
                <input type="number" id="humidity" name="humidity" value={formData.humidity} onChange={handleChange} required />
                
                <label htmlFor="soil_ph">Soil pH</label>
                <input type="number" step="0.1" id="soil_ph" name="soil_ph" value={formData.soil_ph} onChange={handleChange} required />
                
                <label htmlFor="rainfall">Rainfall (mm)</label>
                <input type="number" id="rainfall" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
                
                <button type="submit">Get Recommendation</button>
            </form>

            {response && (
                <div className="result">
                    <h2>Recommended Crop: {response.recommendedCrop}</h2>
                    <p><strong>Recommended on:</strong> {response.recommendedDate}</p>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CropRecommendation;
