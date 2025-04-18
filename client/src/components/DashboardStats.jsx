import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/"); // Update the URL as needed
        const events = res.data;

        const pending = events.filter((e) => e.status === "Pending").length;
        const approved = events.filter((e) => e.status === "Approved").length;
        const rejected = events.filter((e) => e.status === "Rejected").length;

        setStats({
          total: events.length,
          pending,
          approved,
          rejected,
        });
      } catch (err) {
        console.error("Failed to fetch event stats:", err);
      }
    };

    fetchEventStats();
  }, []);

  const statCards = [
    { label: "Total Events", count: stats.total, color: "bg-primary" },
    { label: "Pending Events", count: stats.pending, color: "bg-warning" },
    { label: "Approved Events", count: stats.approved, color: "bg-success" },
    { label: "Rejected Events", count: stats.rejected, color: "bg-danger" },
  ];

  return (
    <div className="row mb-4">
      {statCards.map((stat, index) => (
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
