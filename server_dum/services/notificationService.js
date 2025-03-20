// Dummy Notification Service
const sendNotification = async (recipient, message) => {
    console.log(`Notification sent to ${recipient}: ${message}`);
};

module.exports = { sendNotification };
