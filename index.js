const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const ejsMate = require('ejs-mate');
require('dotenv').config();

const app = express();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample Itinerary Values
var activity = 1;
var consider = 2;
var budget = 3;
var day_activity = 4;
var accomodation = 5;

// Routes
app.get('/', (req, res) => {
    res.render('listings/home');
});

app.get('/make-trip', (req, res) => {
    res.render('listings/form');
});

// Route for handling form submission
app.post('/generate-itinerary', async (req, res) => {
    const { destination, people, preferences, check_in, check_out } = req.body;

    // Validate input
    if (!destination || !people || !preferences || !check_in || !check_out) {
        return res.status(400).send('Missing required fields');
    }

    try {
        // Construct the prompt for Google Generative AI
        const prompt = `Plan a trip to ${destination} for ${people} people.
        Check-in date: ${check_in}, Check-out date: ${check_out} and their preferences: ${preferences}.
        Please include details on accommodation, activities, food, budget, and transportation. 
        For each day, include morning, afternoon, and evening activities. Provide data in a structured format.`;

        // Call Google Generative AI API
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText',
            {
                prompt: prompt
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extract the AI-generated response
        const text = response.data.candidates[0].output;

        // Further API calls to extract specific details (optional)
        const accommodation = "Extracted accommodation data"; // Extract accommodation from `text`
        const activities = "Extracted activities data";       // Extract activities from `text`
        const budget = "Extracted budget data";               // Extract budget from `text`
        const considerations = "Extracted considerations data"; // Extract considerations from `text`
        const dayActivities = "Extracted day activities data"; // Extract day activities from `text`

        // Render the result page or redirect
        res.render('layouts/result', { accommodation, activities, budget, considerations, dayActivities });
    } catch (error) {
        console.error('Error generating itinerary:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating itinerary');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
