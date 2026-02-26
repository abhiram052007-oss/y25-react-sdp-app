import { useState, useEffect } from "react";

export default function Calculator() {

  const [expenses, setExpenses] = useState(() => {
    const stored = sessionStorage.getItem("history");
    return stored ? JSON.parse(stored) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    sessionStorage.setItem("history", JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = () => {
    if (!amount || !category || !date) {
      alert("Fill all fields");
      return;
    }

    const newExpense = { amount, category, date };
    setExpenses([...expenses, newExpense]);

    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // ✅ Calculate Total Amount
  const totalAmount = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  return (
    <div className="card">
      <h2>ADD Expense</h2>

      <div className="expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn" onClick={handleAdd}>Add</button>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4">No Expenses Added</td>
            </tr>
          ) : (
            expenses.map((item, index) => (
              <tr key={index}>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ TOTAL DISPLAY */}
      <h3 style={{ marginTop: "20px", textAlign: "right" }}>
        Total Expense: ₹{totalAmount}
      </h3>
    </div>
  );
}