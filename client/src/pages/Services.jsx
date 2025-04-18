import React from "react";
import {
  FaBirthdayCake,
  FaBriefcase,
  FaMusic,
  FaTshirt,
  FaUsers,
  FaColumns,
  FaUserFriends,
  FaMicrophoneAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const pricingPlans = [
    {
      title: "STANDARD",
      price: "49,999",
      description: "Ideal for Proposals, Birthdays",
      details: [
        "2 Days Event",
        "Full Services Consultation",
        "Breakfast & Lunch for Everyone",
        "FREE Gifts for Kids",
      ],
      featured: false,
    },
    {
      title: "PREMIUM",
      price: "3,49,999",
      description: "Ideal for Weddings & Seminars",
      details: [
        "2 Days Event",
        "Full Services Consultation",
        "Breakfast & Lunch for Everyone",
        "FREE Gifts for Kids",
      ],
      featured: true, // Wedding plan should be highlighted
    },
    {
      title: "CORPORATE",
      price: "1,49,999",
      description: "Ideal for Large Business Events",
      details: [
        "2 Days Event",
        "Full Services Consultation",
        "Breakfast & Lunch for Everyone",
        "FREE Gifts for Kids",
      ],
      featured: false,
    },
  ];
  const handleOrderNow = (plan) => {
    const selectedPlan =
      plan === "Custom"
        ? {
            title: "Custom",
            price: "65,000",
            description: "Tailored to your needs",
            details: [],
          }
        : plan;
    navigate(`/event-form`, { state: { selectedPlan } });
    console.log(selectedPlan);
    
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section position-relative vw-100">
        {/* Black Overlay */}
        <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="hero-content text-center position-relative text-white">
          <div className="text-danger fs-2 mb-2">|</div>
          <h1 className="fw-bold">What We Do</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="container text-center my-5">
        <h2 className="text-secondary pb-3">
          The <span className="text-danger fw-bold">Event Management</span>{" "}
          Specialists
        </h2>
        <p className="text-muted w-75 mx-auto pb-4">
          From Wedding Functions to Birthday Parties or Corporate Events to
          Musical Functions, we offer a full range of Event Management Services
          that scale to your needs & budget.
        </p>

        {/* Service Items */}
        <div className="row text-center mt-4">
          {[
            { icon: <FaBirthdayCake />, title: "Anniversaries" },
            { icon: <FaBriefcase />, title: "Corporate Functions" },
            { icon: <FaMusic />, title: "Holiday Parties" },
            { icon: <FaTshirt />, title: "Fashion Concerts" },
            { icon: <FaUsers />, title: "Conference Planning" },
            { icon: <FaColumns />, title: "Stage Decorations" },
          ].map((service, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="service-item p-4 rounded shadow-sm">
                <div className="service-icon text-danger fs-1">
                  {service.icon}
                </div>
                <h5 className="fw-semibold text-dark mt-3">{service.title}</h5>
                <p className="text-muted mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempor incididunt ut labore.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-featured-section text-white py-5">
        <div className="overlay"></div>
        <div className="container position-relative pt-5 mt-5">
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-danger poppins-medium fs-2 mb-4">
                Services <span className="text-white">Featured</span>
              </h2>
              <p className="text-white roboto-font fs-5">
                We make your events smart & impactful by personalised event
                management services.
              </p>
              <p className="text-white roboto-font-300 fs-6">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua enim ad minim veniam quis nostrud exercitation ex ea
                consequat duis aute irure dolor in reprehenderit in voluptate.
              </p>
            </div>

            <div className="col-md-6">
              {[
                { icon: <FaUserFriends />, title: "Wedding Events" },
                { icon: <FaBirthdayCake />, title: "Birthday Parties" },
                { icon: <FaMicrophoneAlt />, title: "Corporate Seminars" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-3 pb-3"
                >
                  <div className="icon-box  fs-1 me-3 pb-5 mb-4">
                    {service.icon}
                  </div>
                  <div>
                    <h5 className="poppins-medium fs-5 text-white  pb-3">
                      {service.title}
                    </h5>
                    <p className="text-white small">
                      Sit amet consectetur elit sed lusm tempor incidant temdore
                      ut labore dolore.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section py-5 pt-5">
        <div className="container pt-5">
          <h2 className="text-danger poppins-medium">
            Dvents <span className="gray">Pricing Plans</span>
          </h2>
          <p className="text-muted roboto-font pb-5">
            We make your events smart & impactful by personalized event
            management services.
          </p>

          {/* Pricing Cards */}
          <div className="row mt-5 justify-content-center text-center">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="col-md-4 mb-5 ">
                <div className="pricing-card">
                  <div
                    className={`price-badge ${plan.featured ? "premium" : ""}`}
                  >
                    <small className="pt-serif-regular-italic">
                      Starts from
                    </small>
                    <span>
                      ₹ <span className="pt-serif-bold fs-6">{plan.price}</span>
                    </span>
                  </div>

                  <h5 className="poppins-medium gray mt-5">{plan.title}</h5>
                  <p className="gray fs-6 pt-serif-regular-italic pb-4">
                    {plan.description}
                  </p>

                  <ul className="list-unstyled mt-3 mb-5">
                    {plan.details.map((detail, idx) => (
                      <li key={idx} className="roboto-font gray m-3 fs-7">
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Order Button */}
                  <button
                    className={`btn mt-3 ${
                      plan.featured
                        ? "btn-danger text-white"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => handleOrderNow(plan)} // Added here
                  >
                    Order Now
                  </button>

                  {plan.featured && <div className="heart-icon">❤️</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="custom-event-section py-5 bg-light">
        <div className="container text-center">
          {/* Section Title */}
          <h2 className="text-danger fw-bold">
            Create Your <span className="text-dark">Dream Event</span>
          </h2>
          <p className="text-muted w-75 mx-auto">
            No matter the occasion, we tailor every detail to make your event
            truly one-of-a-kind. From theme selection to exclusive
            entertainment, you dream it—we make it happen!
          </p>

          {/* Customization Features */}
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">🎭</span>
                <h5 className="fw-bold mt-3">Theme Customization</h5>
                <p className="text-muted small">
                  Choose a unique theme that fits your vision, from classic
                  elegance to modern chic.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">🎶</span>
                <h5 className="fw-bold mt-3">Live Entertainment</h5>
                <p className="text-muted small">
                  From DJs to live bands, we bring the best entertainment to
                  your event.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">🍽️</span>
                <h5 className="fw-bold mt-3">Gourmet Catering</h5>
                <p className="text-muted small">
                  Enjoy a personalized menu with world-class chefs crafting
                  delicious cuisine.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Custom Features */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">💡</span>
                <h5 className="fw-bold mt-3">Lighting & Ambiance</h5>
                <p className="text-muted small">
                  Transform your venue with stunning lights and creative stage
                  setups.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">🎥</span>
                <h5 className="fw-bold mt-3">Professional Photography</h5>
                <p className="text-muted small">
                  Capture unforgettable moments with our expert photography &
                  videography.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <span className="text-danger fs-1">📍</span>
                <h5 className="fw-bold mt-3">Venue Selection</h5>
                <p className="text-muted small">
                  We help you find the perfect venue, whether indoor, outdoor,
                  or exotic locations.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-5">
            <h4 className="text-dark fw-bold">Have a unique event in mind?</h4>
            <p className="text-muted">
              Get in touch with us to make your dream event a reality.
            </p>
            <button
              className="btn btn-danger px-4 py-2"
              onClick={() => handleOrderNow("Custom")}
            >
              Let's Plan Together
            </button>
          </div>
        </div>
      </section>

      <section className="why-choose-us-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side: Image */}
            <div className="col-md-6">
              <img
                src="/eventmange.jpg"
                alt="Elegant Event Setup"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Right Side: Text + Features */}
            <div className="col-md-6">
              <h2 className="text-danger fw-bold">
                Why Choose <span className="text-dark">Dvents?</span>
              </h2>
              <p className="text-muted mb-4">
                We make your events seamless and memorable with expert planning
                and flawless execution.
              </p>

              {/* Features List */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-danger fs-3 me-3">🎉</span>
                    <h6 className="m-0">Exclusive Event Planning</h6>
                  </div>
                  <p className="text-muted small mt-1">
                    Tailor-made experiences for weddings, parties, and corporate
                    events.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-danger fs-3 me-3">💼</span>
                    <h6 className="m-0">Corporate Expertise</h6>
                  </div>
                  <p className="text-muted small mt-1">
                    Professional event management for business conferences &
                    seminars.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-danger fs-3 me-3">🌟</span>
                    <h6 className="m-0">Luxury Decor & Catering</h6>
                  </div>
                  <p className="text-muted small mt-1">
                    Premium decorations, gourmet catering, and top-tier
                    arrangements.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-danger fs-3 me-3">✅</span>
                    <h6 className="m-0">Hassle-Free Execution</h6>
                  </div>
                  <p className="text-muted small mt-1">
                    Sit back and relax while we handle everything seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
