import { useState, useEffect } from "react";

export default function History() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("history")) || [];
    setExpenses(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    sessionStorage.setItem("history", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    const newAmount = prompt("Enter new amount:", expenses[index].amount);
    const newCategory = prompt("Enter new category:", expenses[index].category);
    const newDate = prompt("Enter new date:", expenses[index].date);

    if (newAmount && newCategory && newDate) {
      const updated = [...expenses];
      updated[index] = {
        amount: newAmount,
        category: newCategory,
        date: newDate
      };
      setExpenses(updated);
      sessionStorage.setItem("history", JSON.stringify(updated));
    }
  };

  return (
    <div className="card">
      <h2>Expense History</h2>

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
              <td colSpan="5">No History Available</td>
            </tr>
          ) : (
            expenses.map((item, index) => (
              <tr key={index}>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}