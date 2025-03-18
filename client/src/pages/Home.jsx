import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Whether from "./Whether";

const Home = () => {
    return (
        <div className="container">
            <h1>Welcome to Farmer's Crop System 🌱</h1>
            <p className="subtitle">
                A smart system to help farmers with <b>crop disease prediction</b> and <b>crop recommendations</b> based on weather conditions.
            </p>

            <div className="features">
                <div className="feature-box">
                    <h3>Predict Crop Disease 🦠</h3>
                    <p>
                        Upload an image of your crop, and our AI-powered model will analyze it to detect any diseases, along with
                        recommendations for treatments.
                    </p>
                    <Link to="/predict-disease" className="button">
                        Predict Crop Disease
                    </Link>
                </div>

                <div className="feature-box">
                    <h3>Get 🌾Crop🌱 Recommendation</h3>
                    <p>
                        Enter details such as soil type, temperature, and rainfall, and our system will suggest the best crops to grow
                        based on real-time weather data.
                    </p>
                    <Link to="/recommend-crop" className="button">
                        Get Crop Recommendation
                    </Link>
                </div>

                <div className="whether">
                    <Whether />
                </div>
            </div>

            <hr />

            <h2>🌍 Why Choose Us?</h2>
            <p>
                Our mission is to empower farmers with <b>AI-driven insights</b> to improve their crop health and yield. By leveraging
                modern <b>Machine Learning</b> models and real-time <b>Weather APIs</b>, we provide smart solutions for better
                agricultural decisions.
            </p>

            <div className="info-grid">
                <div className="info-box">
                    <h3>🔍 Advanced AI Analysis</h3>
                    <p>We use deep learning models trained on agricultural datasets to ensure accurate disease detection and crop recommendations.</p>
                </div>

                <div className="info-box">
                    <h3>📡 Real-Time Weather Insights</h3>
                    <p>Get crop suggestions based on the latest weather data to maximize your yield in every season.</p>
                </div>

                <div className="info-box">
                    <h3>🌱 Farmer-Friendly System</h3>
                    <p>Our system is designed to be simple and easy to use, making it accessible for farmers with all levels of expertise.</p>
                </div>
            </div>

            <hr />

            <div className="contact">
                <h2>📩 Contact Us</h2>
                <p>
                    📍 <b>Address:</b> Salem, Tamilnadu <br />
                    📞 <b>Phone:</b> +91 994223XXXX <br />
                    ✉️ <b>Email:</b> farmerfrom2005@mail.com
                </p>
            </div>
        </div>
    );
};

export default Home;
