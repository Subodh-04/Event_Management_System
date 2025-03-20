const Event = require("../models/eventModel");
const { sendNotification } = require("../services/notificationService");

// Get all approved events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: "Approved" });
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ message: "Failed to retrieve events. Please try again." });
    }
};

// User: Request to create an event (payment redirection)
const createEventRequest = async (req, res) => {
    try {
        const { title, description, date, venue, category, maxAttendees, image } = req.body;

        const newEvent = await Event.create({
            title,
            description,
            date,
            venue,
            category,
            maxAttendees,
            userId: req.user._id,
            image,
            status: "Pending"
        });

        // Improved Payment Link for Scalability
        const paymentLink = `${process.env.CLIENT_URL}/payment?eventId=${newEvent._id}`;

        await sendNotification("admin", `New event request: ${title}`);

        res.status(201).json({
            message: "Event request created successfully. Redirecting to payment...",
            event: newEvent,
            paymentLink
        });

    } catch (error) {
        console.error("Error creating event request:", error.message);
        res.status(500).json({ message: "Failed to create event request. Please try again." });
    }
};

// Admin: Create event directly
const createEvent = async (req, res) => {
    try {
        const { title, description, date, venue, category, ticketPrice, maxAttendees, image } = req.body;

        const newEvent = await Event.create({
            title,
            description,
            date,
            venue,
            category,
            ticketPrice,
            maxAttendees,
            image,
            status: "Approved"
        });

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error.message);
        res.status(500).json({ message: "Failed to create event. Please try again." });
    }
};

// Admin: Approve/Reject Event
const updateEventStatus = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { status } = req.body;

        const event = await Event.findByIdAndUpdate(eventId, { status }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await sendNotification(event.userId, `Your event "${event.title}" has been ${status}.`);

        res.status(200).json({ message: `Event status updated to ${status}`, event });
    } catch (error) {
        console.error("Error updating event status:", error.message);
        res.status(500).json({ message: "Failed to update event status. Please try again." });
    }
};

module.exports = {
    getAllEvents,
    createEventRequest,
    createEvent,
    updateEventStatus
};
