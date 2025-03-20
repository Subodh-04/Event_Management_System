import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPlan, eventDetails } = location.state || {};

    useEffect(() => {
        const saveEventDetails = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...eventDetails,
                        price: selectedPlan.price,
                        status: "Pending"
                    }),
                });

                if (!res.ok) {
                    throw new Error("Failed to save event details.");
                }

                console.log("Event successfully saved!");
            } catch (error) {
                console.error("Event Save Error:", error.message);
            }
        };

        if (selectedPlan && eventDetails) {
            saveEventDetails();
        } else {
            console.error("Event details missing. Skipping save.");
        }
    }, [selectedPlan, eventDetails]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Your event has been successfully booked and is awaiting admin approval.</p>
            <button onClick={() => navigate("/")}>Go Home</button>
        </div>
    );
};

export default SuccessPage;
