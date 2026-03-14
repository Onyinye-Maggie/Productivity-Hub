import { useState, useEffect } from "react";

function ExpenseTracker({ darkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Load saved expenses from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  // Save expenses whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newExpense = { id: Date.now(), name, amount: parseFloat(amount) };
    setExpenses([newExpense, ...expenses]);
    setName("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div style={{ color: darkMode ? "#f3f4f6" : "#111827" }}>
      <h1>Expense Tracker</h1>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#374151" : "#fff",
            color: darkMode ? "#f3f4f6" : "#111827",
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
            cursor: "pointer",
          }}
        >
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <div>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
                <th>Name</th>
                <th>Amount (₦)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{exp.name}</td>
                  <td>₦{exp.amount.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
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

export default ExpenseTracker;