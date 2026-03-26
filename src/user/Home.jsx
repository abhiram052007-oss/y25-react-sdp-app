import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2>Welcome, {user?.name}</h2>
      <p>From here you can access all your expenses daily </p>

      <button
        className="btn"
        onClick={() => navigate("/user/calculator")}
        style={{ marginTop: "20px" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}