const Notification = require("../models/Notification");

const sendNotification = async (receiver, message, type = "info") => {
  const newNotification = new Notification({
    message,
    type,
    receiver,
  });

  return await newNotification.save();
};

module.exports = { sendNotification };
