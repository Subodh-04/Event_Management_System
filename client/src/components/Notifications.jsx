import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications");
      if (res.status === 200 && Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setNotifications([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]); // Fallback to empty array
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case "success":
        return "success";
      case "event":
      case "info":
      default:
        return "primary";
    }
  };

  return (
    <div className="card p-4 my-4">
      <h5>Notifications</h5>
      <ul className="list-group">
        {/* Ensure notifications is an array before mapping */}
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className={`list-group-item list-group-item-${getTypeClass(
                notification.type
              )} d-flex justify-content-between align-items-center`}
            >
              <span>{notification.message}</span>
              {!notification.isRead && (
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">No notifications available</li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
