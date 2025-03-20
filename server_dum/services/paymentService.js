const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = async (eventDetails, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: eventDetails.price * 100, // Stripe expects the amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true, // Auto-confirm the payment for simplicity
      metadata: {
        eventTitle: eventDetails.title,
        organizerId: eventDetails.organizerId,
      },
    });

    console.log(`Payment successful for: ${eventDetails.title}`);
    return {
      success: true,
      paymentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Payment failed:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { processPayment };
