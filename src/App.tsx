import { Navigate, Route, Routes } from "react-router";
import { Box } from "@mui/material";

import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <Box
      sx={{
        width: { xs: "400px", xl: "1488px" },
        m: "auto",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
