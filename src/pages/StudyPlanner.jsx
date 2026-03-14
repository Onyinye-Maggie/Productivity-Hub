import { useState, useEffect } from "react";

function StudyPlanner({ darkMode }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (!stored) {
      const demoTasks = [
        { title: "Read React Docs", completed: false },
        { title: "Complete Assignment", completed: true }
      ];
      localStorage.setItem("tasks", JSON.stringify(demoTasks));
      setTasks(demoTasks);
    } else setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title) return;
    setTasks([...tasks, { title, completed: false }]);
    setTitle("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ color: darkMode ? "#f3f4f6" : "#111827" }}>
      <h1>Study Planner</h1>
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Add Task"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            marginRight: "5px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: darkMode ? "#374151" : "#d1d5db",
            backgroundColor: darkMode ? "#111827" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <button onClick={addTask} style={{ padding: "5px 10px", borderRadius: "5px" }}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, i) => (
          <li key={i} style={{
            backgroundColor: i % 2 === 0 ? (darkMode ? "#1f2937" : "#fff") : (darkMode ? "#111827" : "#f9fafb"),
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
            <div>
              <button onClick={() => toggleTask(i)} style={{ marginRight: "5px" }}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button onClick={() => removeTask(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyPlanner;