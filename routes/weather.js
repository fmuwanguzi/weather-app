const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
require('dotenv').config()

const isLoggedIn = require('../middleware/isLoggedIn');


const app = express();
app.use(express.urlencoded({ extended: false }));

let city = 'los angeles'
//let city = 'req.body.city'
let API_KEY = process.env.API_KEY;
//console.log(API_KEY); to test thats its printing out correctly

//added units=imperial to get the right units for United states 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`

//setting up to get weather in default city los Angeles at start up of page
router.get('/', (req, res) => {
    console.log('---weatherGetRoute---');
    axios.get(url)
    .then((response) => {
        const myWeather = response.data
        //let city = req.body.city
        //testing to see data
        console.log(response.data)
        //showing weather for one city as a test
        res.render('weather', {myWeather})
    })
    .catch(error => {
        console.log(error);
        res.send(error = "refresh your screen");
    });
});

//Allows to search through the search bar for weather in different cities 
router.post('/', (req, res) => {
    console.log('----weatherRoute----');
    let newCity = req.body.city;
    console.log('----the new city starts here ----' + newCity )
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=imperial&appid=${API_KEY}`;

        axios.get(newUrl)
        .then((response) => {
            const myWeather = response.data
            console.log(myWeather);

            res.render('weather', {myWeather});

    })
    .catch(error => {
        console.log(error);
        res.send(error = "please input city and state(or country) correctly");
        res.redirect('/')
    });


})

//prepping post route for weather to be added using add to profile button
router.post('/save', isLoggedIn, (req, res) => { 
    console.log('-----inside of post route for weather-----');
    //Gets form data and add a new record to DB then redirect to my profile page
    console.log('---THE OBJECT MY WEATHER---', req.body);
    //const obj = JSON.parse(JSON.stringify(req.body));
    //console.log('----GETTING RID OF NULL------',obj);
    console.log(req.user.id, '----USER ID---')
    db.weather.create({city: req.body.city,
                    country: req.body.country,
                    description: req.body.description,
                    //main: req.body.main,
                    temperature: req.body.temperature,
                    feels_like: req.body.feels_like,
                    min_temp: req.body.min_temp,
                    max_temp: req.body.max_temp,
                    humidity: req.body.humidity
        }) 
        .then((weather)=>{
            console.log(weather.get());//results are comming back as null
            res.redirect('/profile');
        });
  })


//prepping get route for weather added to profile
// router.get('/profile', async (req, res) => {
    
//     try {
//       const addedWeather = await db.weather.findAll();
//       res.render('profile', {weather: addedWeather});
  
//     } catch(error){
//       res.render('error')
//     }
//   });


//  router.post('/' , (req, res) => {
    
//      db.weather.findOrCreate({ //so you can't create the same city value
//        where:{city: req.body.city}
//     }).then((weather) => {
//         res.redirect('weather',{weather});
//     })
//     .catch(error => {
//         console.log(error);
//         res.send(error = "refresh your screen and input city and state(or country)");
//     });

// })

    // router.post('/', async (req,res) => {
    //     let newCity = req.body.city;
    //     let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}=imperial&appid=${API_KEY}`; 
        
    //     try{
    //         await db.weather.find({ 
    //                 where: {city: req.body.city}
    //              }).then((weather) => {
    //                  res.redirect('weather',{weather});
    //              }).catch(error => {
    //                     res.send(error = "error")}
    //                  if(!newUrl === newUrl) {
    //                      return;
    //                     }
    //             })
    //         })
        

module.exports = router;