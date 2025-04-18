import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import axios from "axios";
import 'chart.js/auto';

const EventAnalytics = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events/").then(res => {
      console.log("API Response:", res.data); // Add this
      setEvents(res.data);
    });
  }, []);
  

  // Grouping helpers
  const countByMonth = () => {
    const monthMap = Array(12).fill(0);
    events.forEach(event => {
      const month = new Date(event.createdAt).getMonth(); // 0 - Jan
      monthMap[month]++;
    });
    return monthMap.slice(0, 6); // Jan-Jun (for example)
  };

  const countByCategory = () => {
    const map = {};
    events.forEach(event => {
      const category = event.category || "Uncategorized";
      map[category] = (map[category] || 0) + 1;
    });
    return map;
  };

  const approvalTrends = () => {
    const approved = Array(12).fill(0);
    const rejected = Array(12).fill(0);
    events.forEach(event => {
      const month = new Date(event.createdAt).getMonth();
      if (event.status === "approved") approved[month]++;
      if (event.status === "rejected") rejected[month]++;
    });
    return {
      approved: approved.slice(0, 6),
      rejected: rejected.slice(0, 6)
    };
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const categoryDataMap = countByCategory();
  const trends = approvalTrends();

  const eventTrendData = {
    labels: months,
    datasets: [{
      label: "Events Created",
      data: countByMonth(),
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2
    }]
  };

  const categoryData = {
    labels: Object.keys(categoryDataMap),
    datasets: [{
      data: Object.values(categoryDataMap),
      backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8"]
    }]
  };

  const approvalRateData = {
    labels: months,
    datasets: [
      {
        label: "Approved Events",
        data: trends.approved,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        borderWidth: 2
      },
      {
        label: "Rejected Events",
        data: trends.rejected,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { font: { size: 14 } } }
    }
  };

  return (
    <div className="card p-4 my-4 shadow">
      <h5 className="mb-3">📊 Event Analytics Overview</h5>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">📅 Events Created Over Time</h6>
            <div style={{ height: "250px" }}>
              <Bar data={eventTrendData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">🎭 Event Categories Breakdown</h6>
            <div style={{ height: "250px" }}>
              <Pie data={categoryData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">✅ Approval vs Rejection Trends</h6>
            <div style={{ height: "250px" }}>
              <Line data={approvalRateData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
