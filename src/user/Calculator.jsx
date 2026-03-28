import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Calculator() {
  const [expenses, setExpenses] = useState(() => {
    const stored = sessionStorage.getItem("history");
    return stored ? JSON.parse(stored) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    sessionStorage.setItem("history", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddOrUpdate = () => {
    if (!amount || !category || !date) {
      alert("Fill all fields");
      return;
    }

    const newExpense = { amount, category, date };

    if (editIndex === -1) {
      setExpenses([...expenses, newExpense]);
    } else {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditIndex(-1);
    }

    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setAmount(expenses[index].amount);
    setCategory(expenses[index].category);
    setDate(expenses[index].date);
    setEditIndex(index);
  };

  const totalAmount = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  // 📊 Prepare category-wise data
  const categoryData = Object.values(
    expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, value: 0 };
      }
      acc[item.category].value += Number(item.amount);
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="card">
      <h2>Add Expense</h2>

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

        <button className="btn" onClick={handleAddOrUpdate}>
          {editIndex === -1 ? "Add" : "Update"}
        </button>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5">No Expenses Added</td>
            </tr>
          ) : (
            expenses.map((item, index) => (
              <tr key={index}>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
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

      <h3 style={{ marginTop: "20px", textAlign: "right" }}>
        Total Expense: ₹{totalAmount}
      </h3>

      <h3 style={{ marginTop: "30px" }}>Expense Distribution</h3>

      {expenses.length > 0 && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}