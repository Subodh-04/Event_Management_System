const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

// Public Routes
router.get("/", eventController.getAllEvents);  // Get all approved events
router.post("/create", protect, authorize("user"), eventController.createEventRequest); // Users create event requests

// Admin Routes
router.post("/", protect, authorize("admin"), eventController.createEvent); // Admin creates event directly
router.put("/update/:eventId", protect, authorize("admin"), eventController.updateEventStatus); // Admin updates event status
router.post("/:eventId/images", upload.array("images", 5),eventController.imageUpload);
router.get("/search", eventController.searchEvent);
module.exports = router;
