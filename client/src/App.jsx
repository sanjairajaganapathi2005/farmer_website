import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import DiseasePrediction from "./pages/DiseasePrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/predict-disease" element={<DiseasePrediction />} />
                <Route path="/recommend-crop" element={<CropRecommendation />} />
            </Routes>
        </Router>
    );
}

export default App;
