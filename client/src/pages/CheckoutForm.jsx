import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: "John Doe",
                    email: "john.doe@example.com"
                }
            }
        });

        if (error) {
            console.error("Payment Error:", error.message);
        } else if (paymentIntent.status === "succeeded") {
            console.log("Payment successful!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;
