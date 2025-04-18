const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Conference",
        "Birthday",
        "Wedding",
        "Concert",
        "Workshop",
        "Festival",
        "Custom",
      ],
      required: true,
    },
    maxAttendees: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    //Custom
    customRequirements: { type: String },
    //Custom
    budget: { type: Number },
    //Custom
    services: {
      type: [
        {
          category: { type: String, required: true }, // E.g., "Decorations"
          serviceName: { type: String, required: true }, // E.g., "Premium Theme"
          price: { type: Number, required: true }, // E.g., 15000
        },
      ],
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    eventImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
