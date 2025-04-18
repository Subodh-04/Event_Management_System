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
    await sendNotification("admin", `New event request: ${title}`);

    res.status(201).json({
      message: "Event request created successfully. Redirecting to payment...",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event request:", error.message);
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
      event.userId,
      `Your event "${event.title}" has been ${status}.`
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

module.exports = {
  getAllEvents,
  createEventRequest,
  createEvent,
  updateEventStatus,
};
