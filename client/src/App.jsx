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
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/predict-disease" element={<ProtectedRoute><DiseasePrediction /></ProtectedRoute>} />
                <Route path="/recommend-crop" element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
