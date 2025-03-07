import React from "react";

const Hero = () => {
  return (
    <header className="w-100 vw-100">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active vh-100 position-relative">
            {/* Background Image */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Foreground Content */}
            <div className="d-flex align-items-center justify-content-center text-center text-white h-100 w-100 position-relative">
              <div>
                <p className="fst-italic fs-5 opacity-75">We are the Event Management Specialists</p>
                <h1 className="fw-bold text-uppercase">WE PERSONALIZE YOUR WEDDING EVENTS</h1>
                <button className="btn btn-primary btn-lg mt-3">Learn More</button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item vh-100 position-relative">
            {/* Background Image */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bgimg1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Foreground Content */}
            <div className="d-flex align-items-center justify-content-center text-center text-white h-100 w-100 position-relative">
              <div>
                <p className="fst-italic fs-5 opacity-75">Make your moments unforgettable</p>
                <h1 className="fw-bold text-uppercase">Celebrate Your Events That Last Longer</h1>
                <a className="btn btn bg-white btn-lg text-dark p-1 me-3 mt-2">Request</a>
                <button className="btn btn-dark btn-lg p-1 mt-2">Explore More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Previous & Next Buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </header>
  );
};

export default Hero;
