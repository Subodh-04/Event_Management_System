import React, { useEffect, useState } from "react";
import axios from "axios";

const EventTable = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleStatusChange = async (eventId, status) => {
    const token = localStorage.getItem("token"); // assuming token is stored as 'token'
    const role = localStorage.getItem("role"); // assuming role is stored as 'role'

    if (role !== "admin") {
      return alert("Only admins can update event status.");
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/events/update/${eventId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev._id === eventId ? { ...ev, status: res.data.event.status } : ev
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  const filteredEvents =
    filterStatus === "all"
      ? events
      : events.filter(
          (event) => event.status.toLowerCase() === filterStatus.toLowerCase()
        );

  return (
    <div className="card p-3">
      <h5>📋 Event Management</h5>

      <div className="btn-group mb-3">
        {["all", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            className={`btn ${
              filterStatus.toLowerCase() === status.toLowerCase()
                ? status === "all"
                  ? "btn-primary"
                  : `btn-${
                      status === "Approved"
                        ? "success"
                        : status === "Pending"
                        ? "warning"
                        : "danger"
                    }`
                : `btn-outline-${
                    status === "all"
                      ? "primary"
                      : status === "Approved"
                      ? "success"
                      : status === "Pending"
                      ? "warning"
                      : "danger"
                  }`
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>LOCATION</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>
                    {event.venue ? event.venue.split(",")[1].trim() : "N/A"}
                  </td>
                  <td>
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-GB")
                      : "No date"}
                  </td>

                  <td>
                    <span
                      className={`badge bg-${
                        event.status.toLowerCase() === "approved"
                          ? "success"
                          : event.status.toLowerCase() === "pending"
                          ? "warning"
                          : "danger"
                      }`}
                    >
                      {event.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {event.status.toLowerCase() === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleStatusChange(event._id, "Approved")
                          }
                        >
                          APPROVE
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleStatusChange(event._id, "Rejected")
                          }
                        >
                          REJECT
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  NO EVENTS FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventTable;
