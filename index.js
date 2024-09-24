
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
require('dotenv').config();
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
})
app.post('/generate-itinerary',  (req, res) => {
//     const { destination='indore', preferences="lake" } = req.body;
const { destination, people, preferences, check_in, check_out } = req.body;

    // Ensure preferences is an array even if only one checkbox is checked
   

  
 
    try {
     

async function run(){
  
   const prompt = `Plan a trip to ${destination} for ${people} people. }. 
    Check-in date: ${check_in}, Check-out date: ${check_out} and their prefrences ${preferences} . Please include details on accommodation, activities,food,budget and transportation also give important consideration and for each visit daya give morning afternoon and evening what to do and where do. please all important heading are append in
give me data in this format 
    `;
  
// console.log(prompt)
  const result = await model.generateContent(prompt);


  const text = await result.response.text();
  
   
     const newt=await model.generateContent(` the raw data is ${text} give me accomodation information from data and and arrange in html format and css and also apply some css and no data after colsing ob html tag not show me accomodation in heading return me only body of html and css is inline in it `);
       const text1 = await newt.response.text();
       accomodation=text1;

       const newt2=await model.generateContent(` the raw data is ${text} give me activity  from data and in medium  and arrange in html format and css and also apply some css and no data after colsing ob html tag not show me activity in heading return me only body of html and css is inline in it  `);
       const textt2 = await newt2.response.text();
    activity=textt2
        const newt3=await model.generateContent(` the raw data is ${text} give me budget  from data and in medium  and arrange in html format and css and also apply some css and no data after colsing ob html tag not show me budget in heading return me only body of html and css is inline in it `);
       const textt3 = await newt3.response.text();
       budget=textt3
          const newt4=await model.generateContent(` the raw data is ${text} give me important consideration from data and in medium  and arrange in html format and cssin inline  and also apply some css and no data after colsing ob html tag not show me consideration in heading return me only body of html and css is inline in it`);
       const textt4 = await newt4.response.text();
       consider=textt4
           const newt5=await model.generateContent(` the raw data is ${text} give me daya by day activity and along mornining eveming afternoon all which  will do  in medium eords and arrange in html format and cssin inline and please make more attractive and main heading and day period shoud in separte line and class of it use other in place of container  `);
       const textt5 = await newt5.response.text();
       day_activity=textt5
//         const newt7=await model.generateContent(` the raw data is ${text} give me important tips and consideration from data  and arrange in html format and css  and also apply some css and no data after colsing ob html tag not show me tips and consideration in heading return me only body of html and css is inline in it `);
//        const texttt7 = await newt7.response.text();
// //  // Assuming you have this rawData already
// y=texttt7
    // res.render('listings/itineraries', { texttt7 });
    res.redirect("/result_load")
// // const final=structureItinerary(textt)
// res.render({})
// console.log({text})

// res.send(structuredItinerary)


//   res.render('res', { itinerary: formattedItinerary });


///array creatiojn

// const { days, notes, tips } = parseItinerary(itineraryItems);
// console.log('Days:', days);
// console.log('Notes:', notes);
// console.log('Tips:', tips);
//     // Render the EJS template
//     res.render('res', { days,destination,notes,tips });

//   res.render('res', {destination,preferences,text});
}

run();
        // Save the generated itinerary to the database
        // const newItinerary = new Itinerary({
        //     destination,
        //     preferences,
        //     plans: text
        // });

        // await newItinerary.save();

        // // Render the itinerary page with the newly generated itinerary
        // res.render('itinerary', { itinerary: newItinerary.plans });
    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).send('Error generating itinerary');
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
