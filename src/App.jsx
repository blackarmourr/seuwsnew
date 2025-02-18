import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LiveView from "./components/LiveView";
import SmartPlugView from "./components/SmartPlugView";
import ApplianceManagement from "./components/ApplianceManagement";
import InverterDetails from "./components/InverterDetails";
import Billing from "./components/Billing";
import Report from "./components/Report";
import TipsPage from "./components/TipsPage";
import SplashScreen from "./components/SplashScreen"; // Import splash screen

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashComplete = () => {
    setSplashVisible(false);
  };

  return (
    <Router>
      {isSplashVisible && <SplashScreen onComplete={handleSplashComplete} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live-readings" element={<LiveView />} />
        <Route path="/smart-plug" element={<SmartPlugView />} />
        <Route path="/appliance-management" element={<ApplianceManagement />} />
        <Route path="/inverter-details" element={<InverterDetails />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
