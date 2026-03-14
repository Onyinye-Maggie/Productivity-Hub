import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ExpenseTracker from "./pages/ExpenseTracker";
import StudyPlanner from "./pages/StudyPlanner";
import JobTracker from "./pages/JobTracker";
import PortfolioBuilder from "./pages/PortfolioBuilder";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div style={{
          flex: 1,
          padding: "20px",
          backgroundColor: darkMode ? "#111827" : "#f3f4f6",
          color: darkMode ? "#f3f4f6" : "#111827",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}>
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/expenses" element={<ExpenseTracker darkMode={darkMode} />} />
            <Route path="/study" element={<StudyPlanner darkMode={darkMode} />} />
            <Route path="/jobs" element={<JobTracker darkMode={darkMode} />} />
            <Route path="/portfolio" element={<PortfolioBuilder darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;