const Event = require("../models/eventModel");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "Approved" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// Admin: Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, category, ticketPrice, maxAttendees, image } = req.body;
    const newEvent = await Event.create({ title, description, date, venue, category, ticketPrice, maxAttendees, image });
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
};

// Admin: Approve or reject an event
const updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;
    const event = await Event.findByIdAndUpdate(eventId, { status }, { new: true });

    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event status updated", event });
  } catch (error) {
    res.status(500).json({ message: "Error updating event status" });
  }
};

module.exports = { getAllEvents, createEvent, updateEventStatus };
