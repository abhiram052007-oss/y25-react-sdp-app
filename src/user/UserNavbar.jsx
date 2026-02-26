import { Link, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Expense Tracker</h2>
      <div className="nav-links">
        <Link to="/user">Calculator</Link>
        <Link to="/user/history">History</Link>
        <Link to="/user/profile">Profile</Link>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}