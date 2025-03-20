import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FaSpinner } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || {};
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    console.log("Received Amount:", amount);

    useEffect(() => {
        if (!amount) {
            console.error("Amount is missing!");
            setError("Invalid payment details. Please try again.");
            setLoading(false);
            return;
        }

        const createCheckoutSession = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/create-checkout-session`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount })
                    }
                );

                const data = await res.json();

                if (!data.sessionId) {
                    throw new Error("Checkout session creation failed");
                }

                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

                if (result.error) {
                    console.error("Stripe Checkout Error:", result.error.message);
                    setError("Failed to redirect to Stripe Checkout. Please try again.");
                }
            } catch (error) {
                console.error("Checkout Error:", error.message);
                setError("An error occurred during the checkout process. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        createCheckoutSession();
    }, [amount]);

    const handleBack = () => navigate(-1);

    return (
        <div
            className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                background: "linear-gradient(135deg, #1d2671 0%, #c33764 100%)",
                color: "#fff",
                textAlign: "center",
            }}
        >
            {loading ? (
                <div>
                    <FaSpinner className="spinner-icon" />
                    <h2 className="mt-3">Redirecting to Payment...</h2>
                    <p>Please wait while we process your request.</p>
                </div>
            ) : error ? (
                <div>
                    <h2 className="text-warning">⚠️ Payment Error</h2>
                    <p className="text-danger">{error}</p>
                    <button
                        className="btn btn-outline-light mt-3"
                        onClick={handleBack}
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <h2 className="text-success">✅ Payment Successful!</h2>
            )}
        </div>
    );
};

export default PaymentPage;
