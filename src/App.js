import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

// App
const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
      {/* Navbar */}
      <Navbar />
      {/* Routes */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Exercise Detail Route */}
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        {/* Incorrect Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
