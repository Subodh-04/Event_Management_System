import React from "react";

const DashboardStats = () => {
  const stats = [
    { label: "Total Events", count: 12, color: "bg-primary" },
    { label: "Pending Events", count: 5, color: "bg-warning" },
    { label: "Approved Events", count: 6, color: "bg-success" },
    { label: "Rejected Events", count: 1, color: "bg-danger" },
  ];

  return (
    <div className="row mb-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3">
          <div className={`card text-white p-4 shadow ${stat.color}`}>
            <h5 className="mb-1">{stat.label}</h5>
            <h3>{stat.count}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
