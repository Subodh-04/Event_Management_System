import React from "react";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Services from "../components/Services";
import StatsCounter from "../components/StatCounter"; // Ensure correct filename
import Gallery from "../components/Gallery";
import ContactCards from "../components/ContactCards";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="box mt-5 container-fluid mb-5 pb-5"></div>
      <Welcome />
      <div className="bg-body-secondary">
        <Services />
      </div>
      <StatsCounter />
      <Gallery />
      <ContactCards />
    </>
  );
};

export default Home;
