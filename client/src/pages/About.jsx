import React from "react";
import { FaUsers, FaMapMarkerAlt, FaFlag, FaCheckSquare } from "react-icons/fa"; // Import icons

const About = () => {
  return (
    <>
      <section>
        {/* Hero Section */}
        <div className="hero-section text-center text-white vw-100 position-relative">
          {/* Black Overlay */}
          <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="position-relative text-white">
            <h1 className="pt-5 pb-3 poppins-bold">Who We Are</h1>
            <p className="roboto-font-400">
              <a href="/home" className="text-danger text-decoration-none">
                Home
              </a>{" "}
              / ABOUT
            </p>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="container text-center my-5 pt-5 mt-5">
          <h2 className="poppins-light-300 gray pt-3">
            We <span className="text-danger poppins-bold">Create Events</span>{" "}
            That Last
          </h2>
          <p
            className="text-muted roboto-font pt-3 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            From Wedding Functions to Birthday Parties or Corporate Events to
            Musical Functions, we offer a full range of Events Management
            Services that scale to your needs & budget.
          </p>
        </div>

        {/* Features Section */}
        <div className="container">
          <div className="row text-center">
            {/* Vision */}
            <div className="col-md-4 mb-4">
              <img
                src="/vis.jpg"
                alt="Our Vision"
                className="img-fluid rounded shadow"
              />
              <h4 className="mt-3 poppins-medium fs-5 pt-3">Our Vision</h4>
              <p className="text-muted small p-3">
                We strive to make every event extraordinary with our creative
                planning and flawless execution.
              </p>
            </div>

            {/* Approach */}
            <div className="col-md-4 mb-4">
              <img
                src="/cake.jpg"
                alt="Our Approach"
                className="img-fluid rounded shadow"
              />
              <h4 className="mt-3 poppins-medium fs-5 pt-3">Our Approach</h4>
              <p className="text-muted small p-3">
                Our approach is client-centered, ensuring that your needs and
                expectations are met with precision.
              </p>
            </div>

            {/* Goals */}
            <div className="col-md-4 mb-4">
              <img
                src="/goal.jpg"
                alt="Our Goals"
                className="img-fluid rounded shadow"
              />
              <h4 className="mt-3 poppins-medium fs-5 pt-3">Our Goals</h4>
              <p className="text-muted small p-3">
                We aim to create memorable experiences that leave a lasting
                impression on you and your guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container my-5 py-5">
        <div className="row align-items-center">
          {/* Left Side Content */}
          <div className="col-lg-6 col-md-12 text-center text-md-start">
            <h2 className="gray poppins-medium fs-1">
              Why Choose{" "}
              <span className="text-danger poppins-bold">Dvents</span>
            </h2>
            <p className="text-muted roboto-font" style={{ maxWidth: "500px" }}>
              We provide world-class event management services tailored to your
              needs.
            </p>

            {/* Features List */}
            <div className="mt-4">
              <div className="d-flex flex-column flex-md-row align-items-start mb-4">
                <FaUsers className="gray big-icon me-md-3 me-0 pb-3" />
                <div>
                  <h5 className="poppins-light gray pb-2">
                    The Events Specialists
                  </h5>
                  <p className="text-muted small">
                    Our expert team ensures a seamless event experience from
                    start to finish.
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-start mb-4">
                <FaMapMarkerAlt className="gray big-icon me-md-3 me-0 pb-3" />
                <div>
                  <h5 className="poppins-light gray pb-2">
                    Dedicated Venues & Arrangements
                  </h5>
                  <p className="text-muted small">
                    We offer premium venues with custom arrangements to match
                    your vision.
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-start">
                <FaFlag className="gray big-icon me-md-3 me-0 pb-3" />
                <div>
                  <h5 className="poppins-light gray pb-2">
                    All Types of Events
                  </h5>
                  <p className="text-muted small">
                    From corporate gatherings to private parties, we cater to
                    all events.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
            <img
              src="/wedding.jpg"
              alt="Wedding Event"
              className="img-fluid rounded shadow w-100"
            />
          </div>
        </div>
      </section>

      <section className=" w-100 bg-body-secondary my-5 py-5">
        <div className="container">
          <div className="row">
            {/* Left Side (Text & List) */}
            <div className="col-lg-6">
              <h2 className="gray poppins-medium fs-1 pb-3">
                <span className="text-danger poppins-light">Dvents</span> Skills
              </h2>
              <p className="text-muted fs-5 mt-2 mb-5">
                Consectetur elit sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua enim ad minim veniam quis nostrud
                exercitation ullamco laboris nisi ut aliquip.
              </p>

              {/* List with Icons */}
              <ul className="list-unstyled roboto-font gray">
                <li className="d-flex align-items-center mb-3">
                  <FaCheckSquare className="text-danger me-2" />
                  Excepteur sint occaecat cupidatat non proident sunt
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaCheckSquare className="text-danger me-2" />
                  Qui officia deserunt anim labor tempore laboris voluptate
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaCheckSquare className="text-danger me-2" />
                  Tempor incididunt ut labore dolore magna aliqua
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaCheckSquare className="text-danger me-2" />
                  Enim labim veniam quis nostrud exercitation ullamco
                </li>
              </ul>
            </div>

            {/* Right Side (Progress Bars) */}
            <div className="col-lg-6 poppins-regular">
              <div className="mb-5">
                <span>Birthday Parties</span>
                <div className="progress mt-2" style={{ height: "3px", backgroundColor: "#cdc5c5"  }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="mb-5">
                <span>Wedding Events</span>
                <div className="progress mt-2" style={{ height: "3px", backgroundColor: "#cdc5c5"  }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="mb-5">
                <span>Corporate Events</span>
                <div className="progress mt-2" style={{ height: "3px", backgroundColor: "#cdc5c5"  }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className="mb-5">
                <span>Proposal Arrange</span>
                <div className="progress mt-2" style={{ height: "3px", backgroundColor: "#cdc5c5"  }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div className="mb-5">
                <span>Social Seminars</span>
                <div className="progress mt-2" style={{ height: "3px", backgroundColor: "#cdc5c5"  }}>
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
