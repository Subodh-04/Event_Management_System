import React, { useState } from "react";
import axios from "axios";

const AdminImageUpload = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [canUploadImages, setCanUploadImages] = useState(true); // Track upload permission

  // Handle image selection
  const handleImageChange = (e) => {
    // Convert FileList to an array and update the state
    setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!eventId || images.length === 0) {
      return alert("Please select an event and choose images.");
    }
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      setMessage("Images uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Search for event by title or ID
  const handleSearch = async () => {
    if (!searchQuery) {
      return alert("Please enter an event title or ID to search.");
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/events/search?query=${searchQuery}`
      );

      if (res.data && res.data.event) {
        const matchedEvent = Array.isArray(res.data.event)
          ? res.data.event[0]
          : res.data.event; // If it's an array, get the first event, else use the single event
        setEventDetails(matchedEvent);
        setEventId(matchedEvent._id);
        setCanUploadImages(res.data.canUploadImages); // Set the upload permission
        setMessage(res.data.message); // Show message from the API
      } else {
        setEventDetails(null);
        setEventId("");
        setMessage("Event not found.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Search failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>📤 Upload Event Images</h4>

      <form onSubmit={handleUpload} className="card p-3">
        {/* Search Input */}
        <div className="mb-3">
          <label className="form-label">Search Event (Title or ID)</label>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter event title or ID"
          />
          <button
            type="button"
            className="btn btn-info mt-2"
            onClick={handleSearch}
          >
            Search Event
          </button>
        </div>

        {/* Event Details */}
        {eventDetails && (
          <div className="mb-3">
            <h5>Event Found</h5>
            <p>
              <strong>Title:</strong> {eventDetails.title}
            </p>
            <p>
              <strong>Description:</strong> {eventDetails.description}
            </p>
            <p>
              <strong>Event ID:</strong> {eventDetails._id}
            </p>
          </div>
        )}

        {/* Upload Permission Message */}
        {!canUploadImages && (
          <div className="alert alert-warning">
            {message || "You cannot upload images because this event is either not approved or not completed yet."}
          </div>
        )}

        {/* Image Input */}
        {canUploadImages && (
          <div className="mb-3">
            <label className="form-label">Select Images</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Preview Selected Images:</label>
            <div className="d-flex flex-wrap gap-2">
              {images.map((file, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    style={{
                      height: "100px",
                      width: "auto",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {canUploadImages && (
          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        )}

        {/* Message */}
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default AdminImageUpload;
