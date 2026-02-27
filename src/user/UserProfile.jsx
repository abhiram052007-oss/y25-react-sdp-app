import { useEffect, useState } from "react";

export default function UserProfile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="card">
        <h2>User Profile</h2>
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>User Profile</h2>

      <div style={{ lineHeight: "2" }}>
        <p><strong>Full Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Password:</strong> {user.password}</p>
      </div>
    </div>
  );
}