import React from "react";

const notifications = [
  { id: 1, message: "New event submission by Alice Smith", type: "info" },
  { id: 2, message: "Music Festival approved", type: "success" },
];

const Notifications = () => {
  return (
    <div className="card p-4 my-4">
      <h5>Notifications</h5>
      <ul className="list-group">
        {notifications.map(notification => (
          <li key={notification.id} className={`list-group-item list-group-item-${notification.type === "info" ? "primary" : "success"}`}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
