const Notification = require("../models/Notification");
const { sendNotification } = require("../services/notificationService");

// @desc    Get all notifications (latest first)
// @route   GET /api/notifications
// @access  Admin
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Failed to retrieve notifications" });
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Admin
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// @desc    Create a notification manually (e.g., for test or external trigger)
// @route   POST /api/notifications
// @access  Admin
exports.createNotification = async (req, res) => {
  try {
    const { receiver, message, type = "info" } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({ message: "'receiver' and 'message' are required" });
    }

    const validTypes = ["info", "success", "event", "warning", "error"];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        message: `Invalid type. Valid types: ${validTypes.join(", ")}`
      });
    }

    const notification = await sendNotification(receiver, message, type);
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ message: "Failed to create notification" });
  }
};
