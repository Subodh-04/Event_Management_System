const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");

router.get("/", eventController.getAllEvents);
router.post("/", protect, authorize("admin"), eventController.createEvent);
router.put("/:eventId", protect, authorize("admin"), eventController.updateEventStatus);

module.exports = router;
