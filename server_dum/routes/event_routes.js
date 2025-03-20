const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");

// Public Routes
router.get("/", eventController.getAllEvents);  // Get all approved events
router.post("/create", protect, authorize("user"), eventController.createEventRequest); // Users create event requests

// Admin Routes
router.post("/", protect, authorize("admin"), eventController.createEvent); // Admin creates event directly
router.put("/:eventId", protect, authorize("admin"), eventController.updateEventStatus); // Admin updates event status

module.exports = router;
