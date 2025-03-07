import React, { useState } from "react";

const dummyEvents = [
  { id: 1, title: "Music Festival", organizer: "John Doe", status: "Pending" },
  { id: 2, title: "Tech Meetup", organizer: "Alice Smith", status: "Pending" },
  { id: 3, title: "Wedding Event", organizer: "Robert Brown", status: "Approved" },
];

const EventTable = () => {
  const [events, setEvents] = useState(dummyEvents);

  const handleApprove = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: "Approved" } : event));
  };

  const handleReject = (id) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: "Rejected" } : event));
  };

  return (
    <div className="card p-4 shadow">
      <h5 className="mb-3">Manage Events</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Event</th>
            <th>Organizer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.organizer}</td>
              <td>
                <span className={`badge px-3 py-2 ${event.status === "Approved" ? "bg-success" : event.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                  {event.status}
                </span>
              </td>
              <td>
                {event.status === "Pending" && (
                  <>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleApprove(event.id)}>Approve</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleReject(event.id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
