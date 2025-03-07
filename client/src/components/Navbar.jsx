import React, { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img
            src="/logo.png"
            alt=""
            className="me-2"
            style={{ height: "40px" }}
          />{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["Home", "Services", "Events", "About", "Contact"].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className={`nav-link fw-medium mx-2 ${
                    activeTab === item ? "active" : ""
                  }`}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
