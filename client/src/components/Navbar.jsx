import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Parse the JSON string
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null); // Reset user state
    navigate("/");
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/home">
          <img src="/logo.png" alt="" className="me-2" style={{ height: "40px" }} />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["Home", "Services", "Events", "About", "Contact"].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className={`nav-link fw-medium mx-2 ${activeTab === item ? "active" : ""}`}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* User Profile / Sign In Button */}
          <ul className="navbar-nav ms-3">
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user.profileImage || "/user-icon.png"} // Use user's profile image if available
                    alt="User"
                    className="rounded-circle me-1"
                    style={{ width: "35px", height: "35px", cursor: "pointer" }}
                    onClick={() => navigate("/profile")} // Navigate to profile page on click
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <a className="dropdown-item" href="/profile">Profile</a>
                  </li>
                  {user.role === "admin" && (
                    <li>
                      <a className="dropdown-item" href="/admin">Admin Dashboard</a>
                    </li>
                  )}
                  {user.role === "organizer" && (
                    <li>
                      <a className="dropdown-item" href="/dashboard">Organizer Dashboard</a>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a className="btn btn-danger fw-bold" href="/signin">Sign In</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
