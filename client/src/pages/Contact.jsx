import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// A function to get address using Nominatim API (Reverse Geocoding)
const getAddressFromLatLng = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    console.log("Reverse geocoding response:", data); // Debugging: log API response
    return data?.display_name || "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error); // Debugging: log errors
    return "Address not found";
  }
};

const containerStyle = {
  width: "100%",
  height: "350px",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    message: "",
    location: {
      address: "",
      lat: "",
      lng: "",
    },
  });

  const [address, setAddress] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle location change
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  // Function to handle map click
  const handleMapClick = async (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    console.log("Clicked at:", lat, lng); // Debugging: log lat-lng

    // Update the state with lat-lng
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        lat,
        lng,
      },
    }));

    // Fetch the address from the clicked coordinates
    const address = await getAddressFromLatLng(lat, lng);
    console.log("Fetched address:", address); // Debugging: log fetched address

    // Update the address in formData
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        address,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Log formData changes to ensure location state updates
  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]); // This will log the updated formData when it's changed

  return (
    <>
      <section>
        {/* Hero Section */}
        <div className="hero-section text-center text-white vw-100 position-relative">
          {/* Black Overlay */}
          <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          <div className="position-relative text-white">
            <h1 className="pt-5 pb-3 poppins-bold">Contact US</h1>
            <p className="roboto-font-400">
              <a href="/home" className="text-danger text-decoration-none">
                Home
              </a>{" "}
              / Get In Touch
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="container text-center my-5 py-5">
        <h3 className="poppins-medium fs-5">
          Contact us if you need our services. We will be happy to make your
          events memorable!
        </h3>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="contact-card bg-success text-white shadow p-4 custom-rounded">
              <div className="d-flex justify-content-end">
                <FaMapMarkerAlt size={32} />
              </div>
              <h5 className="mt-3 text-start">Address</h5>
              <p className="fw-bold text-start">Ulhasnagar, India</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card bg-primary text-white shadow p-4 custom-rounded">
              <div className="d-flex justify-content-end">
                <FaPhone size={32} />
              </div>
              <h5 className="mt-3 text-start">Phone</h5>
              <p className="fw-bold text-start">(+01) 123 456 7890</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card bg-dark text-white shadow p-4 custom-rounded">
              <div className="d-flex justify-content-end">
                <FaEnvelope size={32} />
              </div>
              <h5 className="mt-3 text-start">Email</h5>
              <p className="fw-bold text-start">noreply.dvents@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container my-5 pt-3 mb-5">
        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6">
            <h4 className="gray poppins-bold mb-4">MESSAGE FORM</h4>

            <form onSubmit={handleSubmit} className="mt-4 roboto-font pt-3">
              <div className="row pb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row pb-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Your Tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="source"
                    className="form-control"
                    placeholder="Where did you hear about us?"
                    value={formData.source}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3 pb-4">
                <textarea
                  className="form-control"
                  name="message"
                  rows="4"
                  placeholder="Your Message ..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Location Input Fields */}
              <h5 className="mt-3 text-start">Location Information</h5>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Your Address"
                value={formData.location.address}
                onChange={handleLocationChange}
                disabled
              />
              <div className="row pb-3 mt-3">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="lat"
                    className="form-control"
                    placeholder="Latitude"
                    value={formData.location.lat}
                    onChange={handleLocationChange}
                    disabled
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="lng"
                    className="form-control"
                    placeholder="Longitude"
                    value={formData.location.lng}
                    onChange={handleLocationChange}
                    disabled
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-danger w-100 mb-5">
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="col-md-6 mt-4 mt-md-0">
            <MapContainer
              center={[19.220251, 73.162874]} // Default center coordinates
              zoom={15}
              style={containerStyle}
              onClick={handleMapClick}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {formData.location.lat && formData.location.lng && (
                <Marker
                  position={[formData.location.lat, formData.location.lng]}
                >
                  <Popup>{formData.location.address}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
