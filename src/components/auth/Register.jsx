import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = () => {

    if (!user.name || !user.username || !user.gender || !user.password) {
      alert("Please fill all required fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

   
    const userExists = users.find(u => u.username === user.username);

    if (userExists) {
      alert("Username already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully!");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="form-container card">
        <h2>Register</h2>

        <input
          placeholder="Full Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

       
        <select
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          style={{ width: "100%", padding: "8px", margin: "8px 0" }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
