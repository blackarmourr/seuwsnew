import React, { useState, useEffect } from "react";
import './TipsPage.css'; // Import the CSS for styling

const TipsPage = () => {
  // Array of tips to display
  const tips = [
    "Turn off lights when not in use.",
    "Use energy-efficient LED bulbs.",
    "Unplug devices when not in use.",
    "Run appliances during off-peak hours.",
    "Keep your appliances clean and maintained.",
    "Install smart power strips to reduce phantom loads.",
    "Lower your water heater temperature.",
    "Use natural light during the day.",
    "Air-dry clothes instead of using a dryer.",
    "Seal air leaks in doors and windows to save energy."
  ];

  return (
    <div className="tips-page-container">
      <h1>Energy Saving Tips</h1>

      {/* Smooth Scrolling Tips */}
      <div className="tips-ticker-container">
        <div className="tips-ticker">
          {tips.map((tip, index) => (
            <p key={index} className="tip">
              {tip}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsPage;
