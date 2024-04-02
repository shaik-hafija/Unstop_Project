// Import necessary libraries
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define schema for your data
const restaurentSchema = new mongoose.Schema({
    id: String,
    URL: String,
    address: String,
    addressLine2: String,
    name: String,
    outcode: String,
    postcode: String,
    rating: Number,
    typeOfFood: String
});

// Create a model based on the schema
const restaurents = mongoose.model('restaurents', restaurentSchema);
// const placeSchema = new mongoose.Schema({
//     id: String,
//     Zone: String,
//     State: String,
//     City: String,
//     Name: String,
//     Type: String,
//     Establishment_Year: Number,
//     time_needed_to_visit_in_hrs: Number,
//     Google_review_rating: Number,
//     Entrance_Fee_INR: Number,
//     Airport_with_50km_Radius: String,
//     Weekly_Off: String,
//     Significance: String,
//     DSLR_Allowed: String,
//     Number_of_google_review_in_lakhs: Number,
//     Best_Time_to_visit: String,
//   });
const placeSchema = new mongoose.Schema({
    id: String,
    zone: String,
    state: String,
    city: String,
    name: String,
    type: String,
    establishmentYear: Number,
    timeNeededToVisitInHrs: Number,
    googleReviewRating: Number,
    entranceFeeINR: Number,
    airportWith50kmRadius: String,
    weeklyOff: String,
    significance: String,
    dslrAllowed: String,
    numberOfGoogleReviewInLakhs: Number,
    bestTimeToVisit: String
});

  // Create a model based on the schema
  const Place = mongoose.model('Place', placeSchema);
// Connect to your MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/tourism', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.error('Error connecting to database', error);
});

// Define route to fetch restaurants based on food type
// Define route to fetch restaurants based on food type
app.get('/hotels/:foodType', async (req, res) => {
    try {
        const foodType = req.params.foodType;
        const restaurants = await restaurents.find({ type_of_food: foodType }).limit(10);
        console.log('Restaurants:', restaurants);
        
        if (restaurants.length === 0) {
            console.log(`No restaurants found for food type: ${foodType}`);
        }

        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/places/:state', async (req, res) => {
//     try {
//       const state = req.params.state;
//       const places = await Place.find({ State: state });
//       res.json(places);
//       console.log('hello')
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  // Route to fetch places by city name
app.get('/places/:city', async (req, res) => {
    try {
        const city = req.params.city;
        console.log(city)
        const places = await Place.find({ City: city });
        if (places.length === 0) {
            return res.status(404).json({ error: 'No places found for the specified city' });
        }
        res.json(places);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
