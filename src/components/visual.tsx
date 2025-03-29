import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './visual.css';

interface Values {
  value1: number;
  value2: number;
  value3: number;
}

const Visual: React.FunctionComponent = () => {
  const [values, setValues] = useState<Values>({ value1: 0, value2: 0, value3: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/values'); // Updated to call the Node.js server
        setValues(response.data);
      } catch (error) {
        console.error('Error fetching values:', error);
      }
    };

    fetchValues();
    const interval = setInterval(fetchValues, 1000);
    return () => clearInterval(interval);
  }, []);

  const [displayMode, setDisplayMode] = useState('visual'); // 'visual' or 'text'
  const [showAddComponent, setShowAddComponent] = useState(false);

  const getCompassRotation = () => `rotate(${values.value2 - 90}deg)`;

  // Calculate the position of the altitude line
  const getAltitudePosition = () => {
    const maxAltitude = 3000; // Maximum altitude value
    const minAltitude = 0; // Minimum altitude value
    const altitudeRange = maxAltitude - minAltitude; // Total altitude range

    // Ensure value1 is within the valid range
    const clampedValue = Math.max(minAltitude, Math.min(values.value1, maxAltitude));

    // Calculate the relative position as a percentage
    const relativePosition = ((clampedValue - minAltitude) / altitudeRange) * 100;

    // Return the percentage position from the top
    return 12 + (100 - relativePosition)/2 ; // Invert to position from the top
  };

  return (
    <div className="app-container">
      <div className="button-container">
        <button className="button" onClick={() => navigate('/display')}>TEXT</button>
        <button className="button" >VISUAL</button>
        <button className="button" onClick={() => navigate('/changeValues')}>+</button>
      </div>
      <div className="top-section">
        <div className="altitude-column">
          <div className="altitude-box">
            <br />
            <br />
            <br />
            <div className="altitude-value">3000</div>
            <br />
            <br />
            <br />
            <div className="altitude-value">2000</div>
            <br />
            <br />
            <br />
            <div className="altitude-value">1000</div>
            <br />
            <br />
            <br />
            <div className="altitude-value">0</div>
            <br />
            <br />
            <br />
            {/* Altitude Line */}
            <div
              className="altitude-line"
              style={{ top: `${getAltitudePosition()}%` }}
            ></div>
          </div>
        </div>
        <div className="compass-column">
          <div className="circle compass-circle">
            <div className="compass-labels">
              <div className="compass-label top">0</div>
              <div className="compass-label right">90</div>
              <div className="compass-label bottom">180</div>
              <div className="compass-label left">270</div>
            </div>
            <div
              className="compass-arrow"
              style={{ transform: getCompassRotation() }}
            ></div>
            {/* Center line always pointing up */}
            <div className="compass-center-line"></div>
          </div>
        </div>
        <div className="horizon-column">
          <div
            className="circle horizon-circle"
            style={{
              background: `linear-gradient(to bottom, blue ${100 - values.value3}%, green ${values.value3}%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Visual;