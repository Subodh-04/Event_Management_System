import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const visitCount = localStorage.getItem("visits") || 1;

    if (userData) {
      setUser(userData);
      setUpdatedUser(userData);
      setVisits(visitCount);
      if (userData.role === "organizer") {
        setEvents(userData.events || []);
      }
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`/api/users/update/${user._id}`, updatedUser);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile!");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.put(`/api/users/change-password/${user._id}`, { password: newPassword });
      alert("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Error changing password!");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`/api/users/delete/${user._id}`);
        localStorage.clear();
        alert("Account deleted successfully!");
        window.location.href = "/signup";
      } catch (error) {
        alert("Error deleting account!");
      }
    }
  };

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date) {
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setNewEvent({ name: "", date: "" });
      alert("Event added successfully!");
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    alert("Event deleted!");
  };

  return (
    <section className="vw-100">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 p-4 rounded-4">
              {user ? (
                <>
                  <div className="text-center">
                    <img
                      src={user.profilePic || "/default-user.png"}
                      alt="Profile"
                      className="rounded-circle mb-3 border"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <h3 className="fw-bold">{user.userName}</h3>
                    <p className="text-muted">{user.email}</p>
                    <span className="badge bg-primary px-3 py-2">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>

                  <hr className="my-4" />

                  <div className="row text-center">
                    <div className="col-md-4">
                      <h5 className="fw-bold">{visits}</h5>
                      <p className="text-muted small">Website Visits</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="fw-bold">{user.joinedAt || "N/A"}</h5>
                      <p className="text-muted small">Joined On</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="fw-bold">{events.length}</h5>
                      <p className="text-muted small">Events Organized</p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Edit Profile */}
                  <h5>Edit Profile</h5>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedUser.userName}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, userName: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-success w-100" onClick={handleUpdateProfile}>
                    Update Profile
                  </button>

                  <hr />

                  {/* Change Password */}
                  <h5>Change Password</h5>
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button className="btn btn-warning w-100" onClick={handleChangePassword}>
                    Change Password
                  </button>

                  <hr />

                  {/* Delete Account */}
                  <button className="btn btn-danger w-100" onClick={handleDeleteAccount}>
                    Delete Account
                  </button>

                  {user.role === "organizer" && (
                    <>
                      <hr />
                      <h5>Manage Events</h5>
                      <ul className="list-group mt-3">
                        {events.length > 0 ? (
                          events.map((event, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              {event.name} - {event.date}
                              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(index)}>
                                Delete
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item text-center text-muted">No events organized yet.</li>
                        )}
                      </ul>

                      {/* Add Event */}
                      <div className="mt-3">
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Event Name"
                          value={newEvent.name}
                          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        />
                        <input
                          type="date"
                          className="form-control mb-2"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />
                        <button className="btn btn-primary w-100" onClick={handleAddEvent}>
                          Add Event
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p className="text-center">Loading user details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
