import { Routes, Route } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import Calculator from "./Calculator";
import History from "./History";
import UserProfile from "./UserProfile";

export default function UserHome() {
  return (
    <>
      <UserNavbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}