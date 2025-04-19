import React, { useEffect, useState } from "react";
import axios from "axios";

const Event = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/");
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize today

        const past = res.data
          .filter((event) => new Date(event.date) < today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        const future = res.data
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setPastEvents(past);
        setUpcomingEvents(future);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderEventCard = (event, isPast) => (
    <div key={event._id} className="col-md-3 mb-4">
      <div className="event-card position-relative">
        <img
          src={event.eventImage[0]}
          alt={event.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        {/* Badge */}
        <span
          className={`badge position-absolute top-0 end-0 m-2 ${
            isPast ? "bg-secondary" : "bg-success"
          }`}
        >
          {isPast ? "Completed" : "Upcoming"}
        </span>

        <div className="card-body text-center pt-3">
          <p className="text-muted m-0 roboto-font">
            {formatDate(event.date)}
          </p>
          <h5 className="mt-2 poppins-medium">
            <a href="/" className="event-link">
              {event.title}
            </a>
          </h5>
          <p className="small">
            <i className="roboto-font"></i> {event.venue}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="hero-section text-center text-white vw-100 position-relative">
          <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="position-relative text-white">
            <h1 className="pt-5 pb-3 poppins-bold">EVENTS</h1>
            <p className="roboto-font-400">
              <a href="/home" className="text-danger text-decoration-none">
                Home
              </a>{" "}
              / Events
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container my-5">
        {pastEvents.length > 0 && (
          <>
            <h3 className="mb-4 text-muted">📆 Past Events</h3>
            <div className="row">
              {pastEvents.map((event) => renderEventCard(event, true))}
            </div>
          </>
        )}

        {upcomingEvents.length > 0 && (
          <>
            <h3 className="mt-5 mb-4 text-dark">⏳ Upcoming Events</h3>
            <div className="row">
              {upcomingEvents.map((event) => renderEventCard(event, false))}
            </div>
          </>
        )}

        {pastEvents.length === 0 && upcomingEvents.length === 0 && (
          <div className="text-center mt-5">
            <h5 className="text-muted">No events available.</h5>
          </div>
        )}
      </section>
    </>
  );
};

export default Event;
