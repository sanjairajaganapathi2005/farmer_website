import React, { useState } from "react";
import axios from "axios";
import "../styles/disease.css";

const backend_url="http://localhost:5000/"
const DiseasePrediction = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post(`${backend_url}disease`, formData);
        setResult(data.disease);
    };

    return (
        <div>
            <h2>Crop Disease Prediction</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Predict</button>
            {result && <p>Predicted Disease: {result}</p>}
        </div>
    );
};

export default DiseasePrediction;
