import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Font.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Event from "./pages/Event";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
import EventForm from "./components/EventForm";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

const App = () => {
  const role = localStorage.getItem("role");

  const shouldShowNavbarFooter =
    role !== "admin" &&
    window.location.pathname !== "/" &&
    window.location.pathname !== "/payment";

  return (
    <Router>
      {/* Show Navbar & Footer only when applicable */}
      {shouldShowNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Event />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/* Admin Protected Route */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/* Show Footer only when applicable */}
      {shouldShowNavbarFooter && <Footer />}
    </Router>
  );
};

export default App;
