import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully!");
    navigate("/");
  };

  return (
    <div className="auth-page">
    <div className="form-container card">
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button className="btn" onClick={handleRegister}>Register</button>
      <p>Already have account? <Link to="/">Login</Link></p>
    </div>
    </div>
  );
}