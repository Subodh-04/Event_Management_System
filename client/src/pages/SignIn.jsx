import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful!");

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <section className="vw-100 d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="text-center">
          <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
          <h4 className="poppins-bold mt-4">Welcome Back</h4>
          <p className="text-secondary roboto-font gray small">
            Sign in to continue managing your events
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger small">{error}</p>}

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
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 poppins-medium">
            Sign In
          </button>

          <p className="text-center text-secondary mt-3 small">
            Don't have an account?{" "}
            <span
              className="text-danger fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
