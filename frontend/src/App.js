import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Note the lowercase folder names matching your screenshot
import Navbar from "./components/navbar/navbar"; 
import Home from "./pages/home/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import StudentDashboard from "./pages/student/studentdashboard";
import RecruiterDashboard from "./pages/recruiter/recruiterdashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;