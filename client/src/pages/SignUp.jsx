import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        userName,
        email,
        password,
        role,
      });

      alert("Signup successful! You can now log in.");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Error during signup");
    }
  };

  return (
    <section className="vw-100 d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "450px" }}>
        <div className="text-center">
          <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
          <h4 className="poppins-bold mt-3">Create an Account</h4>
          <p className="text-secondary small">
            Sign up to start managing your events
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger small">{error}</p>}

          <div className="mb-3 text-start">
            <label className="form-label poppins-medium">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label poppins-medium">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label poppins-medium">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label poppins-medium">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div className="mb-3 text-start">
            <label className="form-label poppins-medium">Select Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-dark w-100 poppins-medium">
            Sign Up
          </button>

          <p className="text-center text-secondary mt-3 small">
            Already have an account?{" "}
            <span
              className="text-danger fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
