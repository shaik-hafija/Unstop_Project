  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import './About.css'
  const About = () => {
  const [foodType, setFoodType] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [foodType]);

  const fetchData = async () => {
    try {
      if (!foodType) {
        setError('Please enter a food type');
        return;
      }

      const response = await axios.get(`http://localhost:5000/hotels/${foodType}`);
      setRestaurants(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    setFoodType(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter food type"
          value={foodType}
          onChange={handleInputChange}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      
      {error && <p>{error}</p>}

      <div className="gallery-container">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="content">
            <div className="card">
              <img src={`https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} alt="" className="card-img-top" />
              <div className="card-body">
                <h1 className="card-title" style={{color:"#944E63"}}>{restaurant.name}</h1>
                <p className="card-text">{restaurant.address}, {restaurant['address line 2']}</p>
                <a href={restaurant.URL} className="btn btn-primary" style={{backgroundColor:"#944E63"}}>Visit Website</a>
                <ul className="rating">
                  {Array.from({ length: Math.ceil(restaurant.rating) }).map((_, i) => (
                    <li key={i}><i className="fa fa-star checked"></i></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
