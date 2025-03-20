import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaGift,
  FaRegClipboard,
} from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";

const EventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlan = location.state?.selectedPlan || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDetails = {
      title: e.target.eventTitle.value,
      description: e.target.eventDescription.value,
      date: e.target.eventDate.value,
      venue: e.target.eventVenue.value,
      category: e.target.eventCategory.value,
      maxAttendees: e.target.maxAttendees.value,
    };

    if (!selectedPlan.price) {
      alert("Invalid event details. Please try again.");
      return;
    }

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
          state: { amount: selectedPlan.price, eventId: data.event._id },
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
        <div className="card shadow-lg border-0 rounded-4 p-5 bg-white">
          <div className="text-center">
            <h2 className="text-danger fw-bold mb-3">
              <MdOutlineEventNote className="me-2" />
              Event Booking Form
            </h2>
            <p className="text-muted">
              Fill out the details below to book your memorable event 🎉
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                <FaRegClipboard className="me-2 text-danger" /> Event Name
              </label>
              <input
                type="text"
                name="eventTitle"
                className="form-control border-primary shadow-sm"
                placeholder="Enter your event name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold">📝 Event Description</label>
              <textarea
                name="eventDescription"
                className="form-control border-primary shadow-sm"
                rows="3"
                placeholder="Provide a brief description of the event"
                required
              ></textarea>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                <FaCalendarAlt className="me-2 text-danger" /> Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                className="form-control border-primary shadow-sm"
                required
              />
            </div>

            {/* Venue */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                <FaMapMarkerAlt className="me-2 text-danger" /> Event Venue
              </label>
              <input
                type="text"
                name="eventVenue"
                className="form-control border-primary shadow-sm"
                placeholder="Enter the venue"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="form-label fw-bold">Event Category</label>
              <select
                name="eventCategory"
                className="form-select border-primary shadow-sm"
                required
              >
                <option value="">-- Select Category --</option>
                <option value="Conference">Conference</option>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Concert">Concert</option>
                <option value="Workshop">Workshop</option>
                <option value="Festival">Festival</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Max Attendees */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                <FaUserFriends className="me-2 text-danger" /> Maximum Attendees
              </label>
              <input
                type="number"
                name="maxAttendees"
                className="form-control border-primary shadow-sm"
                placeholder="Enter max attendees"
                min="1"
                required
              />
            </div>

            {/* Selected Plan */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                <FaGift className="me-2 text-success" /> Selected Plan
              </label>
              <input
                type="text"
                className="form-control border-success shadow-sm"
                value={selectedPlan.title || "Custom"}
                readOnly
              />
            </div>

            {/* Total Price */}
            <div className="mb-4">
              <label className="form-label fw-bold">💰 Total Price (₹)</label>
              <input
                type="text"
                className="form-control border-success shadow-sm"
                value={selectedPlan.price || "TBD"}
                readOnly
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
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
