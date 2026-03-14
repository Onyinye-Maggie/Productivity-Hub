import { useState, useEffect } from "react";

function PortfolioBuilder({ darkMode }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  // Load saved projects from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(saved);
  }, []);

  // Save projects whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (e) => {
    e.preventDefault();
    if (!title || !description || !url) return;

    const newProject = { id: Date.now(), title, description, url };
    setProjects([newProject, ...projects]);

    setTitle("");
    setDescription("");
    setUrl("");
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div style={{ color: darkMode ? "#f3f4f6" : "#111827" }}>
      <h1>Portfolio Builder</h1>

      {/* Add Project Form */}
      <form onSubmit={addProject} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <input
          type="url"
          placeholder="Project URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <div>
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
                <th>Title</th>
                <th>Description</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3b82f6" }}
                    >
                      {project.url}
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteProject(project.id)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PortfolioBuilder;