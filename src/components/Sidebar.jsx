// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

// Correct relative imports from components folder
import Dashboard from "../pages/Dashboard";
import ExpenseTracker from "../pages/ExpenseTracker";
import StudyPlanner from "../pages/StudyPlanner";
import JobTracker from "../pages/JobTracker";
import PortfolioBuilder from "../pages/PortfolioBuilder";

function Sidebar({ darkMode, setDarkMode }) {
  const linkStyle = (isActive) => ({
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "5px",
    color: isActive ? "#fff" : darkMode ? "#d1d5db" : "#374151",
    background: isActive ? "#3b82f6" : "transparent",
    textDecoration: "none",
    display: "block"
  });

  return (
    <div style={{
      width: "220px",
      minHeight: "100vh",
      background: darkMode ? "#1f2937" : "#e5e7eb",
      color: darkMode ? "#fff" : "#111827",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <h2 style={{ marginBottom: "30px" }}>Productivity Hub</h2>

      <NavLink to="/" style={({ isActive }) => linkStyle(isActive)}>Dashboard</NavLink>
      <NavLink to="/expenses" style={({ isActive }) => linkStyle(isActive)}>Expense Tracker</NavLink>
      <NavLink to="/study" style={({ isActive }) => linkStyle(isActive)}>Study Planner</NavLink>
      <NavLink to="/jobs" style={({ isActive }) => linkStyle(isActive)}>Job Tracker</NavLink>
      <NavLink to="/portfolio" style={({ isActive }) => linkStyle(isActive)}>Portfolio Builder</NavLink>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginTop: "auto",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          background: darkMode ? "#3b82f6" : "#111827",
          color: "#fff"
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Sidebar;