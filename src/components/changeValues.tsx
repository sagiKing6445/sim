import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './changeValues.css'; // Import the CSS file

interface Values {
  value1: number;
  value2: number;
  value3: number;
}

interface OldValues {
  value1: number;
  value2: number;
  value3: number;
}

const ChangeValues: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>({
    value1: 0,
    value2: 0,
    value3: 0,
  }); // Initialize with default values
  const [oldValues, setOldValues] = useState<OldValues | null>(null);

  useEffect(() => {
    // Fetch initial values when the component is initialized
    const fetchValues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/values');
        setValues(response.data); // Set the current values
        setOldValues(response.data); // Set the old values
      } catch (error) {
        console.error('Error fetching initial values:', error);
      }
    };

    fetchValues();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value);

    if (name === 'value1' && (numericValue < 0 || numericValue > 3000)) {
      alert('Altitud must be between 0 and 3000');
      return;
    }
    if (name === 'value2' && (numericValue < 0 || numericValue > 360)) {
      alert('HIS must be between 0 and 360');
      return;
    }
    if (name === 'value3' && (numericValue < -100 || numericValue > 100)) {
      alert('ADI must be between -100 and 100');
      return;
    }

    setValues({ ...values, [name]: numericValue });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/values', values); // Send the latest values
      console.log('Submitted values:', values);
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

  if (!oldValues) {
    // Render a loading state until the data is fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/display')}>TEXT</button>
        <button className="button" onClick={() => navigate('/visual')}>VISUAL</button>
        <button className="button">+</button>
      </div>
       <div className="form-container">
        <div className="input-group">
          <div className="input-label">Altitud</div>
          <input type="number" className="input-field" name="value1" value={values.value1} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className="input-label">HIS</div>
          <input type="number" className="input-field" name="value2" value={values.value2} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className="input-label">ADI</div>
          <input type="number" className="input-field" name="value3" value={values.value3} onChange={handleChange} />
        </div>
        <button className="send-button" onClick={handleSubmit}>Send</button>
      </div>
      <button onClick={() => navigate('/display')}>Go to Display</button>
      <button onClick={() => navigate('/visual')}>Go to Visual</button>
    </div>
  );
};

export default ChangeValues;