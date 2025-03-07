import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Dummy event data
const events = [
  { date: "2025-03-10", name: "Tech Conference" },
  { date: "2025-03-15", name: "Music Festival" },
  { date: "2025-03-18", name: "Startup Meetup" },
  { date: "2025-03-20", name: "Charity Gala" },
];

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]); // Convert date to YYYY-MM-DD format
  };

  return (
    <div className="card p-4 my-4 shadow">
      <h5>Upcoming Events</h5>
      <div className="d-flex">
        {/* Left: Calendar */}
        <div style={{ flex: 1 }}>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
              const formattedDate = date.toISOString().split("T")[0];
              return events.some(event => event.date === formattedDate) ? "bg-warning text-dark" : "";
            }}
          />
        </div>

        {/* Right: Event List */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h6>Events on {selectedDate || "Select a date"}:</h6>
          <ul className="list-group">
            {selectedDate &&
              events
                .filter(event => event.date === selectedDate)
                .map((event, index) => (
                  <li key={index} className="list-group-item">
                    {event.name}
                  </li>
                ))}
            {!selectedDate && <li className="list-group-item">No date selected</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
