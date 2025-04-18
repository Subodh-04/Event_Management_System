import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Helper function to format date to YYYY-MM-DD
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // Return formatted date
};

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/");
        const eventData = response.data;

        // Format the dates correctly
        const formattedEvents = eventData.map((event) => ({
          ...event,
          date: formatDate(event.date),
        }));

        // Optional: Filter only approved events
        const filteredEvents = formattedEvents.filter(
          (event) => event.status === "Approved"
        );

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle calendar day click
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };

  return (
    <div className="card p-4 my-4 shadow-lg rounded-lg  ">
      <h5 className="mb-4 text-primary">Upcoming Events</h5>
      <div className="d-flex flex-wrap justify-content-between">
        {/* Calendar section */}
        <div style={{ flex: 1, minWidth: "300px", marginRight: "20px" }}>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
              const formattedDate = date.toISOString().split("T")[0];
              return events.some((event) => event.date === formattedDate)
                ? "bg-warning text-dark rounded-circle"
                : "";
            }}
            className="shadow-sm rounded-lg"
          />
        </div>

        {/* Event list section */}
        <div
          style={{ flex: 1, minWidth: "300px", marginLeft: "20px", marginTop: "10px" }}
        >
          <h6>Events on {selectedDate || "Select a date"}:</h6>
          <ul className="list-group">
            {selectedDate && events.filter((event) => event.date === selectedDate).length > 0 ? (
              events
                .filter((event) => event.date === selectedDate)
                .map((event, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded-lg"
                  >
                    <div>
                      <h5 className="mb-1">{event.title}</h5>
                      <p className="small text-muted">{event.venue}</p>
                    </div>
                    <span className="badge bg-success text-white rounded-pill">
                      {event.time} {/* Assuming there's a 'time' field in event */}
                    </span>
                  </li>
                ))
            ) : (
              <li className="list-group-item text-center">
                {selectedDate ? "No events on this date" : "No date selected"}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
