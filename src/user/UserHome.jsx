import { Routes, Route } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import Calculator from "./Calculator";
import History from "./History";
import UserProfile from "./UserProfile";
import Home from "./Home";

export default function UserHome() {
  return (
    <>
      <UserNavbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}