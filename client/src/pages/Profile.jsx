import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null); // Reset user state
    navigate("/");
    window.location.reload(); // Refresh to update UI
  };
  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/find/${userId}`
      );
      setUser(res.data.user);
      setUpdatedUser(res.data);
      if (res.data.role === "organizer") {
        setEvents(res.data.events || []);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.userId) {
      fetchUserDetails(localUser.userId);
    }
    setLoaderStatus(false);
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/user/update-profile`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile!");
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/user/change-password`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password changed successfully!");
      setNewPassword("");
      setCurrentPassword("");
      alert("Logging out.....");
      handleLogout();
    } catch (err) {
      console.error(err);
      alert("Error changing password!");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`/api/users/delete/${user._id}`);
        localStorage.clear();
        alert("Account deleted successfully!");
        navigate("/signup");
      } catch (err) {
        console.error(err);
        alert("Error deleting account!");
      }
    }
  };


  return (
    <div>
      <section className="bg-light vw-100 pt-5 mt-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 col-12 mb-4">
              <div className="card shadow-sm rounded-4 p-3">
                <h5 className="card-title text-center mb-4">
                  Account Settings
                </h5>
                <ul className="nav flex-column">
                  {user && (
                    <>
                      <li
                        className="nav-item mb-2 d-flex"
                        style={{ gap: "8px" }}
                      >
                        <strong style={{ minWidth: "80px" }}>Username:</strong>
                        <span style={{ wordBreak: "break-word", flex: 1 }}>
                          {user.userName}
                        </span>
                      </li>
                      <li
                        className="nav-item mb-2 d-flex"
                        style={{ gap: "8px" }}
                      >
                        <strong style={{ minWidth: "80px" }}>Email:</strong>
                        <span
                          className=""
                          style={{ wordBreak: "break-word", flex: 1 }}
                        >
                          {user.email}
                        </span>
                      </li>
                      <li
                        className="nav-item mb-2 d-flex"
                        style={{ gap: "8px" }}
                      >
                        <strong style={{ minWidth: "80px" }}>Phone:</strong>
                        <span style={{ wordBreak: "break-word", flex: 1 }}>
                          {user.phone}
                        </span>
                      </li>
                    </>
                  )}
                  <li className="nav-item mb-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main content */}
            <div className="col-lg-9 col-md-8 col-12">
              {loaderStatus ? (
                <div className="d-flex justify-content-center align-items-center">
                  {/* Optionally, replace this loader with another component or text */}
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="row">
                  {/* Profile Details Card */}
                  <div className="col-12 mb-4">
                    <div className="card shadow-sm rounded-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Account Details</h5>
                        <form>
                          <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              value={updatedUser.userName}
                              onChange={(e) =>
                                setUpdatedUser({
                                  ...updatedUser,
                                  userName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={updatedUser.email}
                              onChange={(e) =>
                                setUpdatedUser({
                                  ...updatedUser,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              value={updatedUser.phone}
                              onChange={(e) =>
                                setUpdatedUser({
                                  ...updatedUser,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleUpdateProfile}
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Change Password Card */}
                  <div className="col-12 mb-4">
                    <div className="card shadow-sm rounded-4">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Change Password</h5>
                        <input
                          type="password"
                          className="form-control mb-3"
                          placeholder="Current Password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                          type="password"
                          className="form-control mb-3"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-warning w-100"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Account Card */}
                  <div className="col-12 mb-4">
                    <div className="card shadow-sm rounded-4">
                      <div className="card-body text-center">
                        <h5 className="card-title text-danger mb-3">
                          Delete Account
                        </h5>
                        <p className="text-muted mb-4">
                          This action is irreversible. Once your account is
                          deleted, all your data will be lost.
                        </p>
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
