import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
            localStorage.setItem("token", data.token);
            navigate("/predict-disease");
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
