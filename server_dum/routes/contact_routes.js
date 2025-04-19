const express = require("express");
const Contact = require("../models/contactModel");

const router = express.Router();

// Submit contact form (with location data)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, source, message, location } = req.body;  // Include location field in request body

    // Create new contact document including location data
    const newContact = new Contact({
      name,
      email,
      phone,
      source,
      message,
      location,  // Storing location information
    });

    // Save the new contact message
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!",data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin: Get all contact messages (with location data)
router.get("/", async (req, res) => {
  try {
    // Fetch all messages sorted by date (latest first)
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
