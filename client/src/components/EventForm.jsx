import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineEventNote } from "react-icons/md";

const EventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan || {};
  const [selectedServices, setSelectedServices] = useState([]);
  console.log(selectedPlan);

  // Define the default services array directly in the frontend
  const defaultServices = [
    { category: "Decorations", serviceName: "Simple Theme", price: 25000 },
    { category: "Decorations", serviceName: "Premium Theme", price: 50000 },
    {
      category: "Decorations",
      serviceName: "Custom Premium Theme",
      price: 100000,
    },
    { category: "Catering", serviceName: "Buffet (Vegetarian)", price: 600 },
    {
      category: "Catering",
      serviceName: "Buffet (Non-Vegetarian)",
      price: 800,
    },
    { category: "Photography", serviceName: "Photography Only", price: 20000 },
    { category: "Photography", serviceName: "Videography Only", price: 35000 },
    { category: "Photography", serviceName: "Both ", price: 50000 },
    { category: "Add-Ons", serviceName: "DJ/Live Music", price: 30000 },
    { category: "Add-Ons", serviceName: "Magician", price: 10000 },
    {
      category: "Add-Ons",
      serviceName: "Custom Invitations (Digital)",
      price: 2000,
    },
    {
      category: "Add-Ons",
      serviceName: "Celebrity Performance",
      price: 200000,
    },
    { category: "Add-Ons", serviceName: "Live Orchestra", price: 50000 },
  ];

  const handleServiceSelect = (selected, category) => {
    setSelectedServices((prev) => {
      // Remove previous selection of the same category
      const filtered = prev.filter((s) => s.category !== category);
      return [...filtered, selected];
    });
  };

  const handleAddOnToggle = (addon, checked) => {
    setSelectedServices((prev) => {
      if (checked) {
        return [...prev, addon];
      } else {
        return prev.filter((s) => s.serviceName !== addon.serviceName);
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxAttendees = parseInt(e.target.maxAttendees.value) || 0;
    const basePrice = parseInt(selectedPlan.price.toString().replace(/,/g, ""));
    let totalCost = selectedPlan.price;
    let cateringCost = 0;
    const cateringService = selectedServices.find(
      (service) => service.category === "Catering"
    );
    if (cateringService) {
      cateringCost = cateringService.price * maxAttendees;
    }

    const otherServicesCost = selectedServices.reduce((acc, service) => {
      if (service.category !== "Catering") {
        return acc + service.price;
      }
      return acc;
    }, 0);

    totalCost = cateringCost + otherServicesCost + basePrice;

    const eventDetails = {
      title: e.target.eventTitle.value,
      description: e.target.eventDescription.value,
      date: e.target.eventDate.value,
      venue: e.target.eventVenue.value,
      category: e.target.eventCategory.value,
      maxAttendees: e.target.maxAttendees.value,
      isCustom: selectedPlan.title === "Custom",
      customRequirements: e.target.customRequirements?.value || null,
      budget: e.target.budget?.value || null,
      services: selectedPlan.title === "Custom" ? selectedServices : [],
      totalPrice: totalCost,
    };
    if (!eventDetails.isCustom) {
      delete eventDetails.budget;
      delete eventDetails.customRequirements;
      delete eventDetails.services;
    }

    localStorage.setItem(
      "eventDetails",
      JSON.stringify({
        ...eventDetails,
        planDetails: selectedPlan,
      })
    );

    console.log(eventDetails);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(eventDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event request created successfully!");
        navigate("/payment", {
          state: {
            amount:
              selectedPlan.title === "Custom" ? totalCost : selectedPlan.price,
            eventId: data.event._id,
          }, // Redirect with calculated total cost
        });
      } else {
        alert(data.message || "Failed to create event. Please try again.");
      }
    } catch (error) {
      console.error("Error creating event request:", error);
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  return (
    <section className="vw-100 p-3 mt-5">
      <div className="container my-5">
        <div className="card shadow-lg border-0 rounded-4 p-5 bg-light">
          {/* Title Section */}
          <div className="text-center mb-4">
            <h2 className="text-primary fw-bold">
              <MdOutlineEventNote className="me-2" />
              {selectedPlan.title === "Custom"
                ? "Custom Event Form"
                : "Event Booking Form"}
            </h2>
            <p className="text-muted">
              Fill in the details below to create your event.
            </p>
          </div>

          {/* Selected Plan Title & Price */}
          <div className="mb-4 text-center">
            <h5 className="fw-bold text-secondary">
              Selected Plan: {selectedPlan.title || "Not Specified"}
            </h5>
            <p className="text-muted">
              Price: ₹
              {selectedPlan.price ? selectedPlan.price.toLocaleString() : "0"}
              <span
                style={{ fontSize: "14px", display: "block", marginTop: "5px" }}
              >
                (Includes: Venue Rental, Event Team, Basic Setup, Refreshments)
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Event Title */}
            <div className="mb-4">
              <label htmlFor="eventTitle" className="form-label fw-semibold">
                Event Title
              </label>
              <input
                type="text"
                id="eventTitle"
                name="eventTitle"
                className="form-control shadow-sm"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Event Description */}
            <div className="mb-4">
              <label
                htmlFor="eventDescription"
                className="form-label fw-semibold"
              >
                Event Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                className="form-control shadow-sm"
                placeholder="Describe your event"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Event Date */}
            <div className="mb-4">
              <label htmlFor="eventDate" className="form-label fw-semibold">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="form-control shadow-sm"
                required
              />
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label htmlFor="eventVenue" className="form-label fw-semibold">
                Venue
              </label>
              <input
                type="text"
                id="eventVenue"
                name="eventVenue"
                className="form-control shadow-sm"
                placeholder="Enter event venue"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="eventCategory" className="form-label fw-semibold">
                Event Category
              </label>
              <select
                id="eventCategory"
                name="eventCategory"
                className="form-select shadow-sm"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Conference">Conference</option>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Concert">Concert</option>
                <option value="Workshop">Workshop</option>
                <option value="Festival">Festival</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            {/* Max Attendees */}
            <div className="mb-4">
              <label htmlFor="maxAttendees" className="form-label fw-semibold">
                Maximum Attendees
              </label>
              <input
                type="number"
                id="maxAttendees"
                name="maxAttendees"
                className="form-control shadow-sm"
                placeholder="Enter the maximum attendees"
                required
              />
            </div>

            {/* Custom Requirements (Optional for Custom Plan) */}
            {selectedPlan.title === "Custom" && (
              <>
                {/* Custom Requirements */}
                <div className="mb-4">
                  <label
                    htmlFor="customRequirements"
                    className="form-label fw-semibold"
                  >
                    Custom Requirements
                  </label>
                  <textarea
                    id="customRequirements"
                    name="customRequirements"
                    className="form-control shadow-sm"
                    placeholder="Mention any specific requirements"
                    rows="3"
                  ></textarea>
                </div>

                {/* Budget */}
                <div className="mb-4">
                  <label htmlFor="budget" className="form-label fw-semibold">
                    Your Estimated Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    className="form-control shadow-sm"
                    placeholder="Enter your budget (optional)"
                  />
                </div>

                {/* Decorations Section */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Choose Decorations
                  </label>
                  {defaultServices
                    .filter((service) => service.category === "Decorations")
                    .map((service, idx) => (
                      <div key={idx} className="form-check">
                        <input
                          type="radio"
                          name="decorations"
                          className="form-check-input"
                          id={`decor-${idx}`}
                          onChange={() =>
                            handleServiceSelect(service, "Decorations")
                          }
                          checked={
                            selectedServices.find(
                              (s) =>
                                s.category === "Decorations" &&
                                s.serviceName === service.serviceName
                            ) !== undefined
                          }
                        />
                        <label
                          htmlFor={`decor-${idx}`}
                          className="form-check-label"
                        >
                          {service.serviceName} (₹
                          {service.price.toLocaleString()})
                        </label>
                      </div>
                    ))}
                </div>

                {/* Catering Section */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Choose Catering
                  </label>
                  {defaultServices
                    .filter((service) => service.category === "Catering")
                    .map((service, idx) => (
                      <div key={idx} className="form-check">
                        <input
                          type="radio"
                          name="catering"
                          className="form-check-input"
                          id={`cater-${idx}`}
                          onChange={() =>
                            handleServiceSelect(service, "Catering")
                          }
                          checked={
                            selectedServices.find(
                              (s) =>
                                s.category === "Catering" &&
                                s.serviceName === service.serviceName
                            ) !== undefined
                          }
                        />
                        <label
                          htmlFor={`cater-${idx}`}
                          className="form-check-label"
                        >
                          {service.serviceName} (₹
                          {service.price.toLocaleString()}/person)
                        </label>
                      </div>
                    ))}
                </div>

                {/* Photography Section */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Choose Photograpy
                  </label>
                  {defaultServices
                    .filter((service) => service.category === "Photography")
                    .map((service, idx) => (
                      <div key={idx} className="form-check">
                        <input
                          type="radio"
                          name="Photography"
                          className="form-check-input"
                          id={`decor-${idx}`}
                          onChange={() =>
                            handleServiceSelect(service, "Photography")
                          }
                          checked={
                            selectedServices.find(
                              (s) =>
                                s.category === "Photography" &&
                                s.serviceName === service.serviceName
                            ) !== undefined
                          }
                        />
                        <label
                          htmlFor={`decor-${idx}`}
                          className="form-check-label"
                        >
                          {service.serviceName} (₹
                          {service.price.toLocaleString()})
                        </label>
                      </div>
                    ))}
                </div>

                {/* Add-Ons Section */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Add-Ons</label>
                  {defaultServices
                    .filter((service) => service.category === "Add-Ons")
                    .map((service, idx) => {
                      const isChecked = selectedServices.some(
                        (s) => s.serviceName === service.serviceName
                      );
                      return (
                        <div key={idx} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`addon-${idx}`}
                            onChange={(e) =>
                              handleAddOnToggle(service, e.target.checked)
                            }
                            checked={isChecked}
                          />
                          <label
                            htmlFor={`addon-${idx}`}
                            className="form-check-label"
                          >
                            {service.serviceName} (₹
                            {service.price.toLocaleString()})
                          </label>
                        </div>
                      );
                    })}
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fw-bold shadow-lg"
              >
                🚀 Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventForm;
