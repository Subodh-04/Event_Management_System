const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validate = require("../middlewares/validate_middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");

const signup = async (req, res, next) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if email already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({ userName, email, password, role });

    res.status(201).json({
      message: "Registration successful",
      token: newUser.generateToken(),
      userId: newUser._id.toString(),
    });

  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    res.status(200).json({
      message: "Login successful",
      token: user.generateToken(),
      userId: user._id.toString(),
      role: user.role,
    });

  } catch (error) {
    console.error("Error logging in:", error);
    next(error);
  }
};

module.exports = {
  signup: [validate(signupSchema), signup],
  login: [validate(loginSchema), login],
};
