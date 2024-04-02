import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Museums.css';

function Museums() {
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [city]);

  const fetchData = async () => {
    try {
      if (!city) {
        setError('Please enter a city');
        return;
      }

      const response = await axios.get(`http://localhost:5000/places/${city}`);
      setPlaces(response.data);
      console.log(response)
      setError('');
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      
      {error && <p>{error}</p>}

      <div className="places-container">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <img src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D" alt="Place" className="place-image" />
            <div className="place-details">
              <h2 style={{color:"#944E63", fontFamily:"monospace",fontWeight:"bolder",fontSize:"20px"}}>{place.Name}</h2>
              <p>Type: {place.Type}</p>
              <p>Zone:
 {place.Zone
}</p>
              <p>Significance: {place.Significance}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Museums;
