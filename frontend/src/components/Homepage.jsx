import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/character.json"; // Character Animation
import backgroundAnimation from "../assets/background.json"; // Background Animation
import "./homepage.css";

const Homepage = ({ setShowLogin, showAboutUs }) => {
  return (
    <div className="home-container">
      {/* Background Animation */}
      <div className="background-animation">
        <Lottie animationData={backgroundAnimation} loop={true} />
      </div>

      {/* About Us Button in Top Right */}
      <div className="top-right-button">
        <button className="about-button small-button" onClick={showAboutUs}>
          About Us
        </button>
      </div>

      {/* Title & Description */}
      <h1 className="animated-text">Welcome to Our Project</h1>
      <p className="description">
        This project is designed to provide a seamless experience for managing
        products efficiently. Explore the features and functionality tailored
        for you.
      </p>

      {/* Lottie Animated Character */}
      <div className="animated-character">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="explore-button" onClick={() => setShowLogin(true)}>
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Homepage;