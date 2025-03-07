import React, { useState } from "react";

const EventTable = () => {
  const [filterStatus, setFilterStatus] = useState("all"); // Default: Show all events

  const allEvents = [
    { id: 1, name: "Tech Conference", status: "approved" },
    { id: 2, name: "Music Festival", status: "pending" },
    { id: 3, name: "Health Webinar", status: "rejected" },
    { id: 4, name: "Business Summit", status: "approved" },
    { id: 5, name: "Sports Meetup", status: "pending" },
  ];

  // Filter events based on selected status
  const filteredEvents = filterStatus === "all" ? allEvents : allEvents.filter(event => event.status === filterStatus);

  return (
    <div className="card p-3">
      <h5>📋 Event Management</h5>

      {/* Filter Buttons */}
      <div className="btn-group mb-3">
        <button 
          className={`btn ${filterStatus === "all" ? "btn-primary" : "btn-outline-primary"}`} 
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
        <button 
          className={`btn ${filterStatus === "pending" ? "btn-warning" : "btn-outline-warning"}`} 
          onClick={() => setFilterStatus("pending")}
        >
          Pending
        </button>
        <button 
          className={`btn ${filterStatus === "approved" ? "btn-success" : "btn-outline-success"}`} 
          onClick={() => setFilterStatus("approved")}
        >
          Approved
        </button>
        <button 
          className={`btn ${filterStatus === "rejected" ? "btn-danger" : "btn-outline-danger"}`} 
          onClick={() => setFilterStatus("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* Event Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>
                  <span className={`badge bg-${event.status === "approved" ? "success" : event.status === "pending" ? "warning" : "danger"}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
