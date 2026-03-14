import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ExpenseTracker from "./pages/ExpenseTracker";
import JobTracker from "./pages/JobTracker";
import StudyPlanner from "./pages/StudyPlanner";
import PortfolioBuilder from "./pages/PortfolioBuilder";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app-layout ${darkMode ? "dark" : ""}`} style={{ display: "flex" }}>
        <Sidebar />

        <div className="main-content" style={{ padding: "30px", width: "100%" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              marginBottom: "20px",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/jobs" element={<JobTracker />} />
            <Route path="/study" element={<StudyPlanner />} />
            <Route path="/portfolio" element={<PortfolioBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;