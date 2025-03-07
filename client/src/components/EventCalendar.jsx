import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const EventCalendar = () => {
  return (
    <div className="card p-4 my-4">
      <h5>Upcoming Events</h5>
      <Calendar />
    </div>
  );
};

export default EventCalendar;
