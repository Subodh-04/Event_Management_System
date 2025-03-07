import React from "react";

const Features = () => {
  return (
    <section className="container text-center my-5" id="features">
      <h2>Our Features</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Feature 1</h5>
            <p>Short description of feature 1.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Feature 2</h5>
            <p>Short description of feature 2.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Feature 3</h5>
            <p>Short description of feature 3.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
