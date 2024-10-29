const express = require('express');

const bodyParser = require('body-parser');
const axios = require('axios');


var activity=1
var consider=2
var budget=3
var day_activity=4
var accomodation=5
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();
var API_KEY="AIzaSyAG41KsWjo5Tjmrik4AMWcWLTPdu3uJRk4";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Get the specific model you want to use

const path = require('path');
// Use ejs-mate for layout support
const ejsMate = require('ejs-mate');

// Ensure the view engine is set correctly
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")))
// Function to save itinerary to the database

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});




// app.use(methodOverride('_method'));

// Connect to MongoDB


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('listings/home'); // 'boilerplate' will include 'content.ejs'
    
});
app.get('/make-trip', (req, res) => {
    res.render('listings/form'); // Render your content.ejs file
});

// const Itinerary = require('./models/Itinerary');

// Format the itinerary



// Example usage:



// Example usage:
app.get("/result_load",(req,res)=>{
  res.render("layouts/boilerplate")
})

app.get("/form",(req,res)=>{
  res.render("listings/form")
})
app.get("/home",(req,res)=>{
  res.render("listings/home")
})
app.get("/Activity",async (req,res)=>{
 const text=activity
  res.render("layouts/result",{text})
})
app.get("/Day_Activity",async (req,res)=>{
 const text=day_activity
  res.render("layouts/result",{text})
})
app.get("/Considerations",async (req,res)=>{
 const text=consider
  res.render("layouts/result",{text})
})
app.get("/Budget",async (req,res)=>{
 const text=budget
  res.render("layouts/result",{text})
})
app.get("/Accommodation",async (req,res)=>{
 const text=accomodation
  res.render("layouts/result",{text})
});app.post('/generate-itinerary', async (req, res) => {
    const { destination, people, preferences, check_in, check_out } = req.body;

    // Validate input
    if (!destination || !people || !preferences || !check_in || !check_out) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const prompt = `Plan a trip to ${destination} for ${people} people. 
        Check-in date: ${check_in}, Check-out date: ${check_out} and their preferences: ${preferences}. 
        Please include details on accommodation, activities, food, budget, and transportation. 
        For each visit, include morning, afternoon, and evening activities. 
        Provide data in a structured format.`;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        const accommodation = await model.generateContent(`Extract accommodation information from: ${text}`);
        const activity = await model.generateContent(`Extract activities from: ${text}`);
        const budget = await model.generateContent(`Extract budget from: ${text}`);
        const consideration = await model.generateContent(`Extract important considerations from: ${text}`);
        const day_activity = await model.generateContent(`Extract day-by-day activities from: ${text}`);

        res.redirect("/result_load");
    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).send('Error generating itinerary');
    }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
