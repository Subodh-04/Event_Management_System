const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { protect, authorize } = require("../middlewares/auth_middleware");

router.put("/update-profile", protect, userController.updateprof);
router.get("/find/:userId", userController.findUserById);
router.post("/change-password", protect,authorize("user"), userController.changePassword);

module.exports = router;
