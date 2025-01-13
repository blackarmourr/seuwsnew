import React, { useState, useEffect } from 'react';

const EnergyTipsTicker = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const tips = [
    "💡 Turn off lights when leaving a room to save up to 10% on electricity",
    "🌡️ Setting your thermostat 1°C lower can reduce energy bills by up to 8%",
    "🔌 Unplug devices on standby to save up to £35 yearly on energy bills",
    "⚡ Use LED bulbs to reduce lighting energy consumption by 75%",
    "🌞 Use natural light when possible to reduce lighting costs",
    "🧺 Run full loads of laundry to maximize energy efficiency",
    "❄️ Keep your refrigerator at 3-4°C for optimal energy efficiency",
    "🚿 Using a water-efficient showerhead can reduce water heating costs",
    "🖥️ Enable power-saving mode on all electronic devices",
    "🌡️ Regular HVAC maintenance can improve efficiency by 20%",
    "🧊 Defrost your freezer regularly to maintain efficiency",
    "📱 Charge devices during off-peak hours for lower rates",
    "🔍 Regular energy audits can identify potential savings",
    "🌊 Wash clothes in cold water to save on water heating",
    "🪟 Use thick curtains to maintain indoor temperature",
    "🔧 Fix leaky faucets to prevent energy waste in water heating",
    "♨️ Use a microwave instead of oven for small meals",
    "🌱 Plant trees for natural cooling and energy savings",
    "🎮 Use power strips to easily turn off multiple devices",
    "🚪 Weather-strip doors and windows to prevent energy loss"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setIsAnimating(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="energy-tips-ticker">
      <div className="ticker-container">
        <div
          className={`transition-all duration-500 ${
            isAnimating 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-8 opacity-0'
          }`}
        >
          <p>{tips[currentTipIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyTipsTicker;