import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      sessionStorage.setItem("currentUser", JSON.stringify(validUser));
      navigate("/user");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    
    {/* Header */}
    <header className="bg-blue-600 text-white text-center py-4 shadow-md">
      <h1 className="text-2xl font-bold">
        Expense Tracking App
      </h1>
    </header>

    {/* Centered Login */}
    <div className="flex flex-1 justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          Don’t have account?{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}