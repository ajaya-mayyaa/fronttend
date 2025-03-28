import React from "react";
import "./homepage.css"; // Import the same CSS file for consistent styling

const AboutUs = () => (
  <div className="home-container"> {/* Use the same container class for consistency */}
    <div className="about-container">
      <div className="about-header">
        <button className="back-button" onClick={() => (window.location.href = "/")}>
          ← Back to Home
        </button>
        <h1 className="about-title">About Us</h1>
      </div>
      <p className="about-description">
        This project is a college initiative built by Manvith Shetty. It aims to
        provide an efficient and user-friendly product management system,
        designed with modern web technologies.
      </p>

      <h2 className="about-subtitle">Project Features</h2>
      <ul className="about-list">
        <li>Automated code review for better development practices</li>
        <li>Detailed error detection and debugging assistance</li>
        <li>Seamless integration with modern frameworks</li>
        <li>Real-time collaboration and updates</li>
        <li>Enhanced security measures for data protection</li>
      </ul>

      <h2 className="about-subtitle">Technology Stack</h2>
      <p className="about-description">
        This project is built using React.js for the frontend, Node.js and
        Express for the backend, and MongoDB for database management.
      </p>

      <h2 className="about-subtitle">Code Review Feature</h2>
      <p className="about-description">
        Our system includes an automated code review tool that provides detailed
        feedback:
      </p>
      <ul className="about-list">
        <li>🔍 Detected Language: Identifies the programming language used.</li>
        <li>❌ Bad Code: Highlights incorrect or suboptimal code snippets.</li>
        <li>🔍 Issues: Lists detected problems in the code.</li>
        <li>✅ Recommended Fix: Provides corrected code versions.</li>
        <li>💡 Improvements: Suggests additional optimizations.</li>
        <li>📝 Final Note: Summarizes findings and improvements.</li>
      </ul>

      <h2 className="about-subtitle">Acknowledgments</h2>
      <p className="about-description">
        Special thanks to our mentors, faculty members, and peers who have
        provided guidance and support throughout the development of this
        project.
      </p>
    </div>
  </div>
);

export default AboutUs;
