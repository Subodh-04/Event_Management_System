const User = require("../models/userModel");
const sendEmail = require("../services/email_service");

const updateprof = async (req, res, next) => {
  const { userName, email, phone, address } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        userName,
        email,
        phone,
        address,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", user: updateUser });

    sendEmail(
      req.user.email,
      "Profile Updated Successfully",
      updationemailbody
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const findUserById = async (req, res) => {
  try {
    // Extracting userId from the URL parameters
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

module.exports = {
  updateprof,
  findUserById,
};
