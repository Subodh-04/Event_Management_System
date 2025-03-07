import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 w-100">
      <div className="container">
        {/* Footer Logo & Newsletter */}
        <div className="text-center">
          <img
            src="/footer.png"
            alt=""
            className="me-2 mb-5"
            style={{ height: "40px" }}
          />
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="email"
              className="form-control w-50 me-2 bg-dark text-light border-secondary"
              placeholder="Your email address ..."
            />
            <button className="btn btn-outline-light">Subscribe</button>
          </div>

          <hr className="mt-4 border-secondary w-75 mx-auto" />
        </div>

        <div className="row mt-4">
          {/* About Dvents */}
          <div className="col-md-3">
            <h5 className="text-danger">About Dvents</h5>
            <p className="small">
              The Events Specialists! Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut elit tellus.
            </p>
            <button className="btn btn-outline-light btn-sm">Read More</button>
          </div>

          {/* Contact Information */}
          <div className="col-md-3">
            <h5 className="text-danger">Keep In Touch</h5>
            <ul className="list-unstyled small">
              <li>📍 Ulhasnagar, IN</li>
              <li>📞 (01) 123 456 7890</li>
              <li>✉️ noreply.dvents@gmail.com</li>
              <li>🕒 Mon - Fri 9:00 am - 6:00 pm</li>
            </ul>
          </div>

          {/* Events Gallery */}
          <div className="col-md-3">
            <h5 className="text-danger">Events Gallery</h5>
            <div className="row g-1">
              <div className="col-4">
                <img
                  src="/evegal1.jpg"
                  alt="Event 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-4">
                <img
                  src="/evegal2.jpg"
                  alt="Event 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-4">
                <img
                  src="/evegal3.jpg"
                  alt="Event 3"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-4">
                <img
                  src="/evegal4.jpg"
                  alt="Event 4"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-4">
                <img
                  src="/evegal5.jpg"
                  alt="Event 5"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-4">
                <img
                  src="/evegal6.jpg"
                  alt="Event 6"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-danger">Quick Links</h5>
            <ul className="list-unstyled small">
              <li>▶ Our Services</li>
              <li>▶ About Dvents</li>
              <li>▶ News Blog</li>
              <li>▶ Get In Touch</li>
              <li>▶ Our Team</li>
              <li>▶ Clients List</li>
              <li>▶ Brochure</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 pt-3 border-top border-secondary small">
          <p className="mb-0">
            &copy; 2017 Dvents – The Events Specialists. All Rights Reserved.
          </p>
          <p>
            <a href="/" className="text-light">
              Terms of Use
            </a>{" "}
            |{" "}
            <a href="/" className="text-light">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
