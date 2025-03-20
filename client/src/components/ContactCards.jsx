import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ContactCards = () => {
  return (
    <section className="container my-5">
      <div className="row">
        {/* Left Card */}
        <div className="col-md-6 mb-5">
          <div
            className="contact-box bg-success text-white p-5 text-center rounded"
            style={{
              backgroundImage: "url('https://demo.ovatheme.com/dvents/wp-content/uploads/2017/06/texture-1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="poppins-bold mb-3">Get in Touch With Us!</h3>
            <p>Ask questions, schedule a meeting, or request a proposal. Let’s Get Started.</p>
            {/* Replace button with Link */}
            <Link to="/contact" className="btn btn-light mt-3">Contact Us</Link>
          </div>
        </div>

        {/* Right Card */}
        <div className="col-md-6 mb-5">
          <div
            className="contact-box bg-primary text-white p-5 text-center rounded "
            style={{
              backgroundImage: "url('https://demo.ovatheme.com/dvents/wp-content/uploads/2017/06/texture-1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="poppins-bold mb-3">Do You Want to Work With Us?</h3>
            <p>If you are talented enough, you can join our team and have a bright future.</p>
            {/* Replace button with Link */}
            <Link to="/contact" className="btn btn-light mt-3">Join Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCards;
