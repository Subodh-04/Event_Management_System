import React from "react";

const eventsData = [
  {
    id: 1,
    title: "CountDown Event",
    date: "September 01, 2019",
    time: "03 AM",
    location: "32-B, Envato St, Themeforest Ave, CA",
    image: "/eve1.jpg",
  },
  {
    id: 2,
    title: "Marketing Concert",
    date: "July 31, 2019",
    time: "08 AM",
    location: "32-B, Envato St, Themeforest Ave, CA",
    image: "/eve2.jpg",
  },
  {
    id: 3,
    title: "SEO Conference",
    date: "October 01, 2019",
    time: "08 AM",
    location: "32-B, Envato St, Themeforest Ave, CA",
    image: "/eve3.jpg",
  },
  {
    id: 4,
    title: "APEC 2017",
    date: "September 02, 2019",
    time: "07 AM",
    location: "32-B, Envato St, Themeforest Ave, CA",
    image: "/eve4.jpg",
  },
];

const Event = () => {
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
        <div className="row">
          {eventsData.map((event) => (
            <div key={event.id} className="col-md-3 mb-4">
              <div className="event-card">
                <img
                  src={event.image}
                  className="card-img-top h-50"
                  alt={event.title}
                />
                <div className="card-body text-center">
                  <p className="text-muted m-0 roboto-font">
                    {event.date} - {event.time}
                  </p>
                  <h5 className="mt-2 poppins-medium pt-3">
                    <a href="/" className="event-link">{event.title}</a>
                  </h5>
                  <p className="small">
                    <i className="roboto-font"></i> {event.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Event;
