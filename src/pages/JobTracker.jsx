import { useState, useEffect } from "react";

function JobTracker({ darkMode }) {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(saved);
  }, []);

  // Save jobs whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (e) => {
    e.preventDefault();
    if (!title || !company) return;

    const newJob = { id: Date.now(), title, company, status };
    setJobs([newJob, ...jobs]);
    setTitle("");
    setCompany("");
    setStatus("Applied");
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div style={{ color: darkMode ? "#f3f4f6" : "#111827" }}>
      <h1>Job Tracker</h1>

      {/* Add Job Form */}
      <form onSubmit={addJob} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Job Title"
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
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
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
          Add Job
        </button>
      </form>

      {/* Jobs List */}
      <div>
        {jobs.length === 0 ? (
          <p>No jobs tracked yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.status}</td>
                  <td>
                    <button
                      onClick={() => deleteJob(job.id)}
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

export default JobTracker;