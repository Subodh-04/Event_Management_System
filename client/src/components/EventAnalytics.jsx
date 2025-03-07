import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    label: "Events Created",
    data: [12, 15, 20, 18, 22, 25],
    backgroundColor: "rgba(54, 162, 235, 0.6)"
  }]
};

const EventAnalytics = () => {
  return (
    <div className="card p-4 my-4">
      <h5>Event Analytics</h5>
      <Bar data={data} />
    </div>
  );
};

export default EventAnalytics;
