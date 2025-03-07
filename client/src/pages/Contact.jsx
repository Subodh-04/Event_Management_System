import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons

const Contact = () => {
  return (
    <>
      <section>
        {/* Hero Section */}
        <div className="hero-section text-center text-white vw-100 position-relative">
          {/* Black Overlay */}
          <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="position-relative text-white">
            <h1 className="pt-5 pb-3 poppins-bold">Contact US</h1>
            <p className="roboto-font-400">
              <a href="/home" className="text-danger text-decoration-none">
                Home
              </a>{" "}
              / Get In Touch
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="container text-center my-5 py-5">
        <h3 className="poppins-medium fs-5">
          Contact us if you need our services. We will be happy to make your
          events memorable!
        </h3>

        <div className="row mt-5">
          <div className="col-md-4">
            <div
              className="contact-card bg-success text-white shadow p-4 custom-rounded
"
            >
              <div className="d-flex justify-content-end">
                <FaMapMarkerAlt size={32} />
              </div>
              <h5 className="mt-3 text-start">Address</h5>
              <p className="fw-bold text-start">Ulhasnagar, India</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="contact-card bg-primary text-white shadow p-4 custom-rounded
"
            >
              <div className="d-flex justify-content-end">
                <FaPhone size={32} />
              </div>
              <h5 className="mt-3 text-start">Phone</h5>
              <p className="fw-bold text-start">(+01) 123 456 7890</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="contact-card bg-dark text-white shadow p-4 custom-rounded
"
            >
              <div className="d-flex justify-content-end">
                <FaEnvelope size={32} />
              </div>
              <h5 className="mt-3 text-start">Email</h5>
              <p className="fw-bold text-start">noreply.dvents@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container my-5 pt-3 mb-5">
        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6">
            <h4 className="gray poppins-bold mb-4">MESSAGE FORM</h4>

            <form className="mt-4 roboto-font pt-3">
              <div className="row pb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="row pb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Tel"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Where did you hear about us?"
                  />
                </div>
              </div>

              <div className="mb-3 pb-4">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Your Message ..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-danger w-100 mb-5">
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="col-md-6 mt-4 mt-md-0">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d73.162874!3d19.220251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795b5c6e5a1e9%3A0x4b7c7c0c28f748bf!2sUlhasnagar%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1709642356789!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
