const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { amount } = req.body;

  const sanitizeAmount = (amount) => {
    if (typeof amount === "string" && amount.includes(",")) {
      // If amount has commas (like "49,999"), remove commas and parse as integer
      return parseInt(amount.replace(/,/g, ""), 10);
    }
    // If it's already a number or a string without commas, just parse it directly
    if (typeof amount === "string" || typeof amount === "number") {
      return parseInt(amount, 10);
    }

    throw new Error("Invalid amount format");
  };

  // Get the sanitized amount
  const sanitizedAmount = sanitizeAmount(amount);

  // Multiply by 100 to convert to paise (smallest unit of INR)
  const finalAmount = sanitizedAmount * 100;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Event Booking" },
            unit_amount: finalAmount,
            // Convert ₹3,49,999 to 34999900
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};

module.exports = { createCheckoutSession };
