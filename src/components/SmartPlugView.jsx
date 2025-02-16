import React, { useState, useEffect } from "react";
import './SmartPlugView.css'; // Import your CSS file

const SmartPlugView = () => {
    const [plugReadings, setPlugReadings] = useState(null);
    const [error, setError] = useState("");

    // States for user input (device details)
    const [deviceVoltage, setDeviceVoltage] = useState("");
    const [devicePower, setDevicePower] = useState("");

    // State for fault detection
    const [isFaulty, setIsFaulty] = useState(false);
    const [faultMessage, setFaultMessage] = useState("");

    // State for relay control (ON/OFF)
    const [isRelayOn, setIsRelayOn] = useState(false);

    // Function to fetch plug readings
    const fetchPlugReadings = async () => {
        try {
            const response = await fetch("http://192.168.124.201/plug-readings", { cache: "no-store" });
            if (!response.ok) {
                throw new Error("Failed to fetch plug readings");
            }
            const data = await response.json();
            setPlugReadings(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to toggle relay (Turn ON or OFF the plug)
    const toggleRelay = async () => {
        try {
            const state = isRelayOn ? "off" : "on"; // Toggle state
            const response = await fetch(`http://192.168.124.201/relay-${state}`, {
                method: "GET",
            });
            if (!response.ok) throw new Error(`Failed to turn relay ${state}`);
            setIsRelayOn(!isRelayOn);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to reset energy counter
    const resetEnergy = async () => {
        try {
            const response = await fetch("http://192.168.124.201/reset-energy", { cache: "no-store" });
            if (!response.ok) throw new Error("Failed to reset energy");
            alert("Energy counter reset successfully!");

            // Update UI state manually to reflect reset energy
            setPlugReadings((prev) => ({ ...prev, energy: 0 }));
        } catch (err) {
            setError(err.message);
        }
    };

    // Calculate current based on device voltage and power
    const calculateCurrent = () => {
        if (deviceVoltage && devicePower) {
            const current = devicePower / deviceVoltage;  // Power = Voltage * Current
            return current.toFixed(2);  // Return current with 2 decimal places
        }
        return 0;
    };

    // Handle form submission to check for device fault
    const handleSubmit = (e) => {
        e.preventDefault();
        if (plugReadings) {
            if (plugReadings.power > devicePower) {
                setIsFaulty(true);
                setFaultMessage("The device seems to be faulty! Power reading exceeds the rated power.");
            } else {
                setIsFaulty(false);
                setFaultMessage("The device is functioning within expected power consumption.");
            }
        }
    };

    // Fetch data on component mount and periodically
    useEffect(() => {
        fetchPlugReadings();
        const interval = setInterval(fetchPlugReadings, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="smart-plug-container">
            <h1>Smart Plug</h1>
            {error && <p className="error-message">Error: {error}</p>}

            {/* Device details form */}
            <form onSubmit={handleSubmit} className="device-details-form">
                <label>
                    Device Voltage (V):
                    <input 
                        type="number" 
                        value={deviceVoltage}
                        onChange={(e) => setDeviceVoltage(e.target.value)}
                        required 
                    />
                </label>
                <label>
                    Device Power (W):
                    <input 
                        type="number" 
                        value={devicePower}
                        onChange={(e) => setDevicePower(e.target.value)}
                        required 
                    />
                </label>
                <button type="submit">Check Device Fault</button>
            </form>

            {/* Display calculated current */}
            {deviceVoltage && devicePower && (
                <div className="calculated-current">
                    <p><strong>Calculated Current:</strong> {calculateCurrent()} A</p>
                </div>
            )}

            {/* Display plug meter readings */}
            {plugReadings ? (
                <div className="readings-card">
                    <p><strong>Voltage:</strong> {plugReadings.voltage} V</p>
                    <p><strong>Current:</strong> {plugReadings.current} A</p>
                    <p><strong>Power:</strong> {plugReadings.power} W</p>
                    <p><strong>Energy:</strong> {plugReadings.energy} kWh</p>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}

            {/* Fault detection message */}
            {isFaulty && <p className="fault-message">{faultMessage}</p>}
            {!isFaulty && faultMessage && <p className="success-message">{faultMessage}</p>}

            {/* Relay control & Energy reset */}
            <div className="relay-controls">
                <button onClick={toggleRelay}>
                    {isRelayOn ? "Turn ON Plug" : "Turn OFF Plug"}
                </button>
                <button onClick={resetEnergy}>Reset Energy</button>
            </div>
        </div>
    );
};

export default SmartPlugView;
