import React from "react";

const Sidebar = ({ setSelectedSection }) => {
  return (
    <div>
      <h4 className="text-center mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("dashboard")}>Dashboard</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("pending")}>Pending Events</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("approved")}>Approved Events</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("rejected")}>Rejected Events</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("analytics")}>Event Analytics</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("calendar")}>Event Calendar</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("sponsorships")}>Sponsorships</button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedSection("notifications")}>Notifications</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
