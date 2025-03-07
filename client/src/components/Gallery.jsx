import React, { useState } from "react";

const Gallery = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("all");

  // Event images categorized
  const images = {
    all: ["/birth.jpg", "/wed.jpg", "/social.jpg"],
    birthday: ["/birth.jpg"],
    wedding: ["/wed.jpg"],
    social: ["/social.jpg"],
    corporate: ["/corporate.jpg"],
    product: ["/product.jpg"],
    proposal: ["/proposal.jpg"],
  };

  return (
    <section className="container my-5">
      {/* Title */}
      <h2 className="fs-1 poppins-bold gray text-center">
        <span className="text-danger poppins-light">Dvents</span> Gallery
      </h2>
      <p className="text-muted text-center w-75 mx-auto">
        We make your events smart & impactful by personalized event management services.
      </p>

      {/* Navigation Pills */}
      <div className="text-center my-4">
        <ul className="nav nav-pills justify-content-center">
          {[
            { id: "all", label: "All Events" },
            { id: "birthday", label: "Birthday Parties" },
            { id: "corporate", label: "Corporate Events" },
            { id: "product", label: "Product Launches" },
            { id: "proposal", label: "Proposal Events" },
            { id: "social", label: "Social Meetings" },
            { id: "wedding", label: "Wedding Events" },
          ].map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Grid */}
      <div className="row g-3 pb-5">
        {images[activeTab].map((img, index) => (
          <div className="col-md-4" key={index}>
            <img src={img} alt="" className="img-fluid rounded" />
          </div>
        ))}
      </div>

      <div className="text-center roboto-font fs-4">
        See Our Full Gallery of Events!  <span className="ps-3"><a className="btn btn-dark ps-3 pe-3 pt-0 pb-0 m-0">visit full gallery</a></span>
      </div>
    </section>
  );
};

export default Gallery;
