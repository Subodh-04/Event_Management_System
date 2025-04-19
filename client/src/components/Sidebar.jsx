import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setSelectedSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <div>
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("pending")}
            >
              Events Management
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("images")}
            >
              Event Images Uploader
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("analytics")}
            >
              Event Analytics
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("calendar")}
            >
              Event Calendar
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("usermanage")}
            >
              User Management
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white btn btn-link"
              onClick={() => setSelectedSection("notifications")}
            >
              Notifications
            </button>
          </li>
        </ul>
      </div>
      <div className="text-center mb-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
