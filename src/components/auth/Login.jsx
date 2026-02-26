import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/user");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
    <div className="form-container card">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" onClick={handleLogin}>Login</button>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
    </div>
  );
}