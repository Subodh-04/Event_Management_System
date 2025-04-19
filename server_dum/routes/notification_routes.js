const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification_controller");

router.post("/", controller.createNotification);
router.get("/", controller.getNotifications);
router.patch("/:id/read", controller.markAsRead);

module.exports = router;
