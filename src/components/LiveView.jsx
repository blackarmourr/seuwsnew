import React, { useState, useEffect, useRef } from 'react';
import { fetchReadings, resetEnergy } from '../services/api';
import './LiveView.css';

const LiveView = () => {
    const [readings, setReadings] = useState({
        voltage: 0,
        current: 0,
        power: 0,
        energy: 0,
    });
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);
    const [resetting, setResetting] = useState(false);
    const prevReadings = useRef(readings);

    const fetchWithRetry = async (retries = 5, delay = 1000) => {
        try {
            return await fetchReadings();
        } catch (err) {
            if (retries === 0) throw err;
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(retries - 1, delay * 2);
        }
    };

    useEffect(() => {
        const getReadings = async () => {
            try {
                const data = await fetchWithRetry();
                if (JSON.stringify(data) !== JSON.stringify(prevReadings.current)) {
                    setReadings(data);
                    prevReadings.current = data;
                    setError(null);
                }
            } catch (err) {
                setError('Failed to fetch readings. Please check the ESP32 connection.');
            }
        };

        const interval = setInterval(getReadings, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const totalDailyConsumption = localStorage.getItem("totalDailyConsumption") || 0;
        if (readings.energy > totalDailyConsumption) {
            setWarning("Warning: Smart meter reading exceeds the total daily energy usage!");
        } else {
            setWarning(null);
        }
    }, [readings]);

    // Function to reset energy reading
    const handleResetEnergy = async () => {
        setResetting(true);
        try {
            await resetEnergy();
            setReadings(prev => ({ ...prev, energy: 0 })); // Reset UI
            setWarning(null);
        } catch (err) {
            setError("Reseting Energy Reading.");
        }
        setResetting(false);
    };

    return (
        <div className="live-view-container">
            <h2>Live Energy Readings</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="readings-card">
                    <p><strong>Voltage:</strong> {readings.voltage} V</p>
                    <p><strong>Current:</strong> {readings.current} A</p>
                    <p><strong>Power:</strong> {readings.power} W</p>
                    <p><strong>Energy:</strong> {readings.energy} kWh</p>
                </div>
            )}

            {warning && <div className="warning-message"><strong>{warning}</strong></div>}

            {/* Reset Energy Button */}
            <button onClick={handleResetEnergy} disabled={resetting} className="reset-button">
                {resetting ? "Resetting..." : "Reset Energy"}
            </button>
        </div>
    );
};

export default LiveView;
