const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/find/:userId", userController.findUserById);

module.exports = router;
