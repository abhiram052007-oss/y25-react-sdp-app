import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Expense Tracker</h2>
      <div className="nav-links">
        <Link to="/user">Home</Link>
        <Link to="/user/calculator">Calculator</Link>
        <Link to="/user/history">History</Link>
        <Link to="/user/profile">Profile</Link>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}