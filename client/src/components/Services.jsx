import React from "react";

const Services = () => {
  return (
    <section className="container my-5 text-center pt-4 mb-0 pb-5">
      {/* Section Title */}
      <h2 className="fs-1 poppins-light-500 mb-3 gray">
        <span className="text-danger">Dvents</span> Services
      </h2>
      <p className="text-muted w-75 mx-auto">
        We make your events smart & impactful by personalized event management services.
      </p>

      {/* Events Layout */}
      <div className="row mt-5 align-items-center">
        {/* Left Side - Two Events */}
        <div className="col-md-4">
          <div className="service-box">
            <img src="/social.jpg" alt="Social Events" className="img-fluid rounded" />
            <h5 className="mt-3 text-center poppins-light-300 mb-3">Social Events</h5>
            <p className="text-muted text-center">
              Sit amet consectetur elit sed lusm tempor incidant temdore ut labore etua dolore.
            </p>
          </div>

          <div className="service-box mt-4">
            <img src="/corporate.jpg" alt="Corporate Seminars" className="img-fluid rounded" />
            <h5 className="mt-3 text-center poppins-light-300 mb-3">Corporate Seminars</h5>
            <p className="text-muted text-center">
              Sit amet consectetur elit sed lusm tempor incidant temdore ut labore etua dolore.
            </p>
          </div>
        </div>

        {/* Center Large Image */}
        <div className="col-md-4">
          <img src="/glass.jpg" alt="Main Event" className="img-fluid rounded main-event-img" />
        </div>

        {/* Right Side - Two Events */}
        <div className="col-md-4">
          <div className="service-box">
            <img src="/wed.jpg" alt="Wedding Events" className="img-fluid rounded" />
            <h5 className="mt-3 text-center poppins-light-300 mb-3">Wedding Events</h5>
            <p className="text-muted text-center">
              Sit amet consectetur elit sed lusm tempor incidant temdore ut labore etua dolore.
            </p>
          </div>

          <div className="service-box mt-4">
            <img src="/birth.jpg" alt="Birthday Parties" className="img-fluid rounded" />
            <h5 className="mt-3 text-center poppins-light-300 mb-3">Birthday Parties</h5>
            <p className="text-muted text-center">
              Sit amet consectetur elit sed lusm tempor incidant temdore ut labore etua dolore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
