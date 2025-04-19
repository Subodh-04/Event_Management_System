const User = require("../models/userModel");
const sendEmail = require("../services/email_service");

const updateprof = async (req, res, next) => {
  const { userName, email, phone } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        userName,
        email,
        phone,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // sendEmail(
    //   updateUser.email,
    //   "Profile Updated Successfully",
    //   "Your profile has been updated successfully."
    // );

    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", user: updateUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const findUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "UserId doesn't exist. Kindly check it!" });
    } else {
      return res.status(200).json({ message: "User found:", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateprof,
  findUserById,
  changePassword,
};
