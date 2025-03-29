import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './display.css'; // Import the CSS file

interface Values {
  value1: number;
  value2: number;
  value3: number;
}

const DisplayValues: React.FunctionComponent = () => {
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

  return (
    <div className="display-container">
      <div className="button-container">
        <button className="button">TEXT</button>
        <button className="button" onClick={() => navigate('/visual')}>VISUAL</button>
        <button className="button" onClick={() => navigate('/changeValues')}>+</button>
      </div>
      <div className="values-container">
        <div className="value-box">
          <p className="label">Altitud</p>
          <p className="value">{values.value1}</p>
        </div>
        <div className="value-box">
          <p className="label">HIS</p>
          <p className="value">{values.value2}</p>
        </div>
        <div className="value-box">
          <p className="label">ADI</p>
          <p className="value">{values.value3}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayValues;