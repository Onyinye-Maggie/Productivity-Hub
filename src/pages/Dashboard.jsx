import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard({ darkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setExpenses(JSON.parse(localStorage.getItem("expenses")) || []);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, []);

  const taskStats = [
    { name: "Completed", count: tasks.filter(t => t.completed).length },
    { name: "Pending", count: tasks.filter(t => !t.completed).length }
  ];

  return (
    <div style={{ color: darkMode ? "#f3f4f6" : "#111827" }}>
      <h1>Dashboard</h1>

      {/* Expenses Chart */}
      <div style={{
        backgroundColor: darkMode ? "#1f2937" : "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h2>Spending Chart</h2>
        {expenses.length > 0 ? (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenses}>
                <XAxis dataKey="name" stroke={darkMode ? "#f3f4f6" : "#111827"} />
                <YAxis stroke={darkMode ? "#f3f4f6" : "#111827"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "#fff", color: darkMode ? "#f3f4f6" : "#111827" }} />
                <Bar dataKey="amount" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p>No expenses yet</p>}
      </div>

      {/* Tasks Chart */}
      <div style={{
        backgroundColor: darkMode ? "#1f2937" : "#fff",
        padding: "20px",
        borderRadius: "10px"
      }}>
        <h2>Task Completion</h2>
        {tasks.length > 0 ? (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskStats}>
                <XAxis dataKey="name" stroke={darkMode ? "#f3f4f6" : "#111827"} />
                <YAxis stroke={darkMode ? "#f3f4f6" : "#111827"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#374151" : "#fff", color: darkMode ? "#f3f4f6" : "#111827" }} />
                <Bar dataKey="count" fill={darkMode ? "#fbbf24" : "#f59e0b"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : <p>No tasks yet</p>}
      </div>
    </div>
  );
}

export default Dashboard;