import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="vw-100 d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center p-5">
          <h1 className="fw-bold">
            <img src="/logo.png" alt="Logo" className="me-2 ms-2" style={{ height: "60px" }} />
          </h1>
          <p className="text-muted roboto-font small pt-3">
            Bringing Your Events to Life: Simplified Registration, Seamless Management, and Instant Updates.
          </p>
          <div className="mt-5 g-3">
            <button className="btn btn-danger me-3 px-4 py-2" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="btn btn-dark px-4 py-2" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5 text-center">
        <h2 className="poppins-bold pb-3">About Our Event Management System</h2>
        <p className="text-secondary roboto-font">
          Our platform helps you create, manage, and organize events effortlessly. Whether you're planning a concert, 
          workshop, or corporate event, we've got you covered.
        </p>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row">
          {/* Feature 1 */}
          <div className="col-md-4 text-center">
            <img src="/eve1.jpg" alt="Event" className="mb-3" style={{ height: "150px" }} />
            <h4 className="poppins-medium">Event Creation</h4>
            <p className="text-secondary roboto-font gray">Easily create events with customizable details and categories.</p>
          </div>
          {/* Feature 2 (Updated Feature) */}
          <div className="col-md-4 text-center">
            <img src="/eve4.jpg" alt="Updates" className="mb-3" style={{ height: "150px" }} />
            <h4 className="poppins-medium">Real-time Event Updates</h4>
            <p className="text-secondary roboto-font gray">Stay informed with instant notifications and live event changes.</p>
          </div>
          {/* Feature 3 */}
          <div className="col-md-4 text-center">
            <img src="/admin.png" alt="Dashboard" className="mb-3" style={{ height: "150px" }} />
            <h4 className="poppins-medium">Admin Dashboard</h4>
            <p className="text-secondary roboto-font gray">Monitor event analytics, manage users, and approve events easily.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container my-5 text-center mt-3">
        <h2 className="poppins-bold pb-3">What Our Users Say</h2>
        <div className="row mt-4">
          {/* Testimonial 1 */}
          <div className="col-md-6 mb-3">
            <div className="p-4 border rounded shadow-sm">
              <p className="text-secondary">
                "This platform made event management so much easier."
              </p>
              <h6 className="fw-bold">- Alex Johnson</h6>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="col-md-6 mb-3">
            <div className="p-4 border rounded shadow-sm">
              <p className="text-secondary">
                "I love the admin dashboard! It provides great insights and smooth workflows."
              </p>
              <h6 className="fw-bold">- Sarah Williams</h6>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-danger text-white text-center py-5">
        <h2 className="fw-bold">Ready to Plan Your Next Event?</h2>
        <p>Join our platform and start creating amazing events today.</p>
        <button className="btn btn-light px-4 py-2 mt-3" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </section>
    </>
  );
};

export default HomePage;
