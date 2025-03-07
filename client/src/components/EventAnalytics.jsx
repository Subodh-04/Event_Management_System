import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import 'chart.js/auto';

// 📊 Events Created Over Time
const eventTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    label: "Events Created",
    data: [12, 15, 20, 18, 22, 25],
    backgroundColor: "rgba(54, 162, 235, 0.6)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 2
  }]
};

// 📊 Event Category Breakdown
const categoryData = {
  labels: ["Music", "Tech", "Sports", "Business", "Health"],
  datasets: [{
    data: [25, 30, 20, 15, 10],
    backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8"]
  }]
};

// 📊 Approval Rate Over Months
const approvalRateData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Approved Events",
      data: [5, 10, 12, 15, 18, 22],
      borderColor: "green",
      backgroundColor: "rgba(0, 128, 0, 0.2)",
      borderWidth: 2
    },
    {
      label: "Rejected Events",
      data: [2, 3, 4, 6, 5, 7],
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderWidth: 2
    }
  ]
};

// Chart Options for Better Layout
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allows flexible sizing
  plugins: {
    legend: { labels: { font: { size: 14 } } }
  }
};

const EventAnalytics = () => {
  return (
    <div className="card p-4 my-4 shadow">
      <h5 className="mb-3">📊 Event Analytics Overview</h5>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {/* Events Created Over Time */}
        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">📅 Events Created Over Time</h6>
            <div style={{ height: "250px" }}>
              <Bar data={eventTrendData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Event Category Breakdown */}
        <div className="col">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">🎭 Event Categories Breakdown</h6>
            <div style={{ height: "250px" }}>
              <Pie data={categoryData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Approval & Rejection Trends */}
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
