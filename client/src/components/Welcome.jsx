import React from "react";
import { FaUsers, FaLightbulb, FaPuzzlePiece } from "react-icons/fa"; // For icons

const Welcome = () => {
  return (
    <section className="container text-center my-5">
      <h2 className="fs-1 poppins-light gray pb-3">
        Welcome to <span className="text-danger poppins-light">Dvents</span>
      </h2>
      <p className="text-muted fs-5 text-dark roboto-font">
        From Wedding Functions to Birthday Parties or Corporate Events to
        Musical Functions,
        <br /> We offer a full range of Event Management Services that scale to
        your needs & budget.
      </p>

      <div className="row mt-5 pt-4 pb-4">
        {/* Card 1 */}
        <div className="col-md-4 mb-2">
          <div className="d-flex align-items-center justify-content-center pb-2">
            <FaPuzzlePiece className="text-danger display-6 me-2" />
            <h4 className="ps-3 poppins-medium gray fs-5 mb-0">
              Great Services
            </h4>
          </div>
          <p className="text-muted fs-7 mt-2 pb-5 pe-3">
            Lorem ipsum dolor sit amet, consectetur elit sed do eiusmod tempor.
          </p>
          <button className="btn btn-outline-secondary">Read More</button>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-2">
          <div className="d-flex align-items-center justify-content-center pb-2">
            <FaUsers className="text-danger display-6 me-2" />
            <h4 className="ps-3 poppins-medium gray fs-5 mb-0">Great People</h4>
          </div>
          <p className="text-muted fs-7 mt-2 pb-5 pe-3">
            Lorem ipsum dolor sit amet, consectetur elit sed do eiusmod tempor.
          </p>
          <button className="btn btn-outline-secondary">Read More</button>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-2">
          <div className="d-flex align-items-center justify-content-center pb-2">
            <FaLightbulb className="text-danger display-6 me-2" />
            <h4 className="ps-3 poppins-medium gray fs-5 mb-0">Great Ideas</h4>
          </div>
          <p className="text-muted fs-7 mt-2 pb-5 pe-3">
            Lorem ipsum dolor sit amet, consectetur elit sed do eiusmod tempor.
          </p>
          <button className="btn btn-outline-secondary">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
