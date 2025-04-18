import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const SuccessPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const receiptRef = useRef(null);

  const userbkl = JSON.parse(localStorage.getItem("user"));
  const userId = userbkl.userId;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/find/${userId}`
        );
        setUserDetails(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user details", err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("eventDetails");
    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails);
        setEventDetails(parsedDetails);
      } catch (error) {
        console.error("Failed to parse eventDetails from localStorage", error);
      }
    }
  }, []);

  const handlePrint = () => {
    // Save the current page content
    const bodyContent = document.body.innerHTML;

    // Hide everything except the receipt container
    document.body.innerHTML = "";
    document.body.appendChild(receiptRef.current);

    // Trigger the print dialog
    window.print();

    // Restore the original page content after printing
    document.body.innerHTML = bodyContent;
  };

  return (
    <div
      className="vw-100 text-center"
      style={{
        padding: "3rem 1.5rem",
        background: "#f7fafc",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="pt-5">
        <h1
          style={{
            color: "#2b6cb0",
            fontSize: "3rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          🎉 Payment Successful!
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#4a5568",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          Your event has been successfully booked and is awaiting admin
          approval. We will notify you once it's approved.
        </p>
      </div>

      {eventDetails && (
        <div
          ref={receiptRef}
          className="receipt-container"
          style={{
            marginTop: "3rem",
            padding: "2rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            background: "#fafafa",
            textAlign: "left",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{ marginBottom: 0, fontSize: "2rem", color: "#2c5282" }}
              >
                <img src="/logo.png" alt="Logo" style={{ width: "130px" }} />
              </h2>
              <p style={{ marginTop: 6, fontSize: "14px", color: "#4a5568" }}>
                noreply.dvents@gmail.com
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Booking Date:{" "}
                <strong style={{ fontSize: "16px" }}>
                  {new Date(eventDetails.date).toLocaleDateString()}
                </strong>
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                color: "#2b6cb0",
                fontSize: "1.9rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Event: {eventDetails.title}
            </h3>
            <p style={{ fontSize: "1.1rem", color: "#4a5568" }}>
              <strong>Type:</strong> {eventDetails.category}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#4a5568" }}>
              <strong>Date:</strong> {eventDetails.date}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#4a5568" }}>
              <strong>Venue:</strong> {eventDetails.venue}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                color: "#2d3748",
                fontWeight: "500",
                marginBottom: "0.8rem",
              }}
            >
              Customer Details
            </h4>
            <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
              <strong>Name:</strong> {userDetails?.userName}
            </p>
            <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
              <strong>Email:</strong> {userDetails?.email}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                color: "#2d3748",
                fontWeight: "500",
                marginBottom: "0.8rem",
              }}
            >
              Package
            </h4>
            <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
              {eventDetails.planDetails.title} - ₹
              {eventDetails.planDetails.price}
            </p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                color: "#2d3748",
                fontWeight: "500",
                marginBottom: "0.8rem",
              }}
            >
              Package Includes
            </h4>
            <ul
              style={{
                marginLeft: "20px",
                listStyleType: "disc",
                fontSize: "1.1rem",
                color: "#4a5568",
              }}
            >
              {eventDetails.planDetails.details?.length > 0 ? (
                eventDetails.planDetails.details.map((item, index) => (
                  <li key={index} style={{ marginBottom: "6px" }}>
                    {item}
                  </li>
                ))
              ) : (
                <li>No package details available</li>
              )}
            </ul>
          </div>

          {eventDetails.services?.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h4
                style={{
                  fontSize: "1.5rem",
                  color: "#2d3748",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Selected Services
              </h4>
              <ul style={{ fontSize: "1.2rem", color: "#4a5568" }}>
                {eventDetails.services.map((service, index) => (
                  <li key={index}>
                    {service.serviceName} - {service.category} - ₹
                    {service.price}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "1.2rem", color: "#48bb78" }}>
                Status: ✅ Paid
              </p>
            </div>
          )}

          {/* Display Total Price */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
              fontSize: "1.4rem",
              color: "#2c5282",
              fontWeight: "600",
            }}
          >
            Total: ₹{eventDetails.totalPrice}
          </div>
        </div>
      )}

      <div style={{ marginTop: "3rem" }}>
        <button
          onClick={handlePrint}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2b6cb0",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "500",
            transition: "background-color 0.3s, box-shadow 0.3s",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
