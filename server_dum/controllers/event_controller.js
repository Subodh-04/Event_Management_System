const { default: mongoose } = require("mongoose");
const Event = require("../models/eventModel");
const { sendNotification } = require("../services/notificationService");

// Get all approved events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve events. Please try again." });
  }
};

// User: Request to create an event (custom or non-custom)
const createEventRequest = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
      maxAttendees,
      isCustom,
      customRequirements,
      budget,
      services,
      totalPrice,
    } = req.body;

    // Validation for custom events
    if (isCustom) {
      if (!customRequirements || !budget) {
        return res.status(400).json({
          message:
            "For custom events, 'customRequirements' and 'budget' are required.",
        });
      }
    } else {
      // Ensure no custom fields are passed for non-custom events
      if (
        typeof customRequirements !== "undefined" ||
        typeof budget !== "undefined" ||
        typeof services !== "undefined"
      ) {
        return res.status(400).json({
          message:
            "Non-custom events should not include custom-related fields.",
        });
      }
    }
    console.log(req.body.services);

    const newEvent = await Event.create({
      title,
      description,
      date,
      venue,
      category,
      maxAttendees,
      userId: req.user._id,
      isCustom,
      customRequirements: isCustom ? customRequirements : undefined,
      budget: isCustom ? budget : undefined,
      services: isCustom ? services : undefined,
      totalPrice,
      status: "Pending",
      paymentStatus: "Pending",
    });
    console.log(newEvent);

    // Generate payment link

    // Notify admin

    await sendNotification(
      "admin",
      `New event request: ${newEvent.title}`,
      "info"
    );

    res.status(201).json({
      message: "Event request created successfully. Redirecting to payment...",
      event: newEvent,
    });
    await sendNotification(
      "admin",
      `Payment received for event: ${newEvent.title}`,
      "success"
    );
  } catch (error) {
    console.error("Error creating event request:", error);
    res
      .status(500)
      .json({ message: "Failed to create event request. Please try again." });
  }
};

// Admin: Create event directly (custom or non-custom)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
      maxAttendees,
      isCustom,
      customRequirements,
      budget,
      services,
      duration,
      attachments,
      decorations,
      eventImage,
    } = req.body;

    // Validation for custom events
    if (isCustom) {
      if (!customRequirements || !budget || !theme) {
        return res.status(400).json({
          message:
            "For custom events, 'customRequirements' and 'budget' are required.",
        });
      }
    } else {
      // Ensure no custom fields are passed for non-custom events
      if (
        customRequirements ||
        budget ||
        services ||
        duration ||
        attachments ||
        decorations
      ) {
        return res.status(400).json({
          message:
            "Non-custom events should not include custom-related fields.",
        });
      }
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      venue,
      category,
      maxAttendees,
      isCustom,
      customRequirements: isCustom ? customRequirements : undefined,
      budget: isCustom ? budget : undefined,
      services: isCustom ? services : undefined,
      duration: isCustom ? duration : undefined,
      attachments: isCustom ? attachments : undefined,
      decorations: isCustom ? decorations : undefined,
      eventImage,
      status: "Approved",
      paymentStatus: "Completed",
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create event. Please try again." });
  }
};

// Admin: Approve/Reject Event
const updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update payment status to "Completed" if event is approved
    if (status === "Approved") {
      event.paymentStatus = "Completed";
      await event.save();
    }
    await sendNotification(
      "admin",
      `Event \"${event.title}\" has been ${status}`,
      status === "Approved" ? "success" : "warning"
    );

    res.status(200).json({
      message: `Event status updated to ${status}`,
      event,
    });
  } catch (error) {
    console.error("Error updating event status:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update event status. Please try again." });
  }
};

const addEventFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const userId = req.user._id;

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator can add feedback
    if (event.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Event must be approved and completed
    const isPast = new Date(event.date) < new Date();
    if (event.status !== 'Approved' || !isPast) {
      return res.status(400).json({ message: "Event must be approved and completed" });
    }

    // Feedback should not already exist
    if (event.feedback && event.feedback.description) {
      return res.status(400).json({ message: "Feedback already submitted" });
    }

    event.feedback = {
      userId,
      description,
      createdAt: new Date(),
    };

    await event.save();

    res.status(200).json({ message: "Feedback submitted successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchEvent = async (req, res) => {
  let { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  query = String(query); // ✅ force it to a string

  const conditions = [];

  // ✅ add title search with regex
  conditions.push({ title: { $regex: query, $options: "i" } });

  // ✅ if it's a valid ObjectId, also search by _id
  if (mongoose.Types.ObjectId.isValid(query)) {
    conditions.push({ _id: query });
  }

  try {
    const events = await Event.find({ $or: conditions });

    if (events && events.length > 0) {
      const event = events[0]; // Assuming only one match, as per your existing logic
      let canUploadImages = true;
      let message = "Event found";

      // Check if the event is approved
      if (event.status !== "Approved") {
        canUploadImages = false;
        message = "Event is not approved. Image upload is not allowed.";
      }

      // Check if the event is completed (date before today)
      const eventDate = new Date(event.date);
      if (eventDate > new Date()) {
        canUploadImages = false;
        message = "Event is not completed yet. Image upload is not allowed.";
      }

      // Return the event details and the upload permission status
      return res.json({
        event,
        message,
        canUploadImages,
      });
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//images uploaded by admin for events
const imageUpload = async (req, res) => {
  try {
    const { eventId } = req.params;
    const imageLinks = req.files.map((file) => file.path);
    console.log(imageLinks);

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $push: { eventImage: { $each: imageLinks } } },
      { new: true }
    );

    res.json({ success: true, images: updatedEvent.eventImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Image upload failed." });
  }
};

module.exports = {
  getAllEvents,
  createEventRequest,
  createEvent,
  updateEventStatus,
  searchEvent,
  imageUpload,
};
