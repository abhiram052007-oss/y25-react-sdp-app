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
    <>
      <div className="bg-blue-700 w-full p-3 text-white text-lg font-bold " style={{textAlign:"center"}}>
        Expenses Tracking App
      </div>
      <div className="flex justify-center items-center h-[90vh] bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Register
          </h2>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Full Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })} />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}/>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}/>
          <select
            className="w-full border p-2 mb-3 rounded"
            onChange={(e) => setUser({ ...user, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            className="w-full border p-2 mb-3 rounded"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}/>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={handleRegister} >
            Register
          </button>
          <p className="mt-3 text-sm text-center">
            Already have account?{" "}
            <Link className="text-blue-500 hover:underline" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}