import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Font.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Event from "./pages/Event";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/events" element={<Event/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
