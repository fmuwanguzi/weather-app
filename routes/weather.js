const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const methodOverride = require('method-override')
require('dotenv').config()

const isLoggedIn = require('../middleware/isLoggedIn');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

//default city
let city = 'los angeles'
let API_KEY = process.env.API_KEY;

//set API = url
//added units=imperial to get the right units for United states 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`

//setting up to get weather in default city los Angeles at start up of weather page
router.get('/', (req, res) => {
    console.log('---weatherGetRoute---');
    axios.get(url)
    .then((response) => {
        const myWeather = response.data
        console.log(response.data)
        res.render('weather', {myWeather})
    })
    .catch(error => {
        console.log(error);
        res.send(error = "refresh your screen");
    });
});

//Allows user to search through the search bar for weather in different cities 
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
        res.render('./error')
    });


})


//allows user to add city to saved cities if it is not saved
router.post('/save', isLoggedIn, (req, res)=>{
    db.weather.findOrCreate({
        where:{ city: req.body.city},
        defaults:{  country: req.body.country,
                    description: req.body.description,
                    temperature: req.body.temperature,
                    feels_like: req.body.feels_like,
                    min_temp: req.body.min_temp,
                    max_temp: req.body.max_temp,
                    humidity: req.body.humidity

        }
    })
    .then(([weather, created])=>{
        res.redirect('./save')
    })
})


//shows all the places user has saved in saved pages
  router.get('/save', isLoggedIn, (req,res) => {
      console.log('---INSIDE THE GET WEATHER SAVE ROUTE ----');
      db.weather.findAll()
      .then((weather)=> {
          console.log(weather);
          res.render('./profile', {weather: weather});
      })
     
    })

    router.delete('/save', isLoggedIn, (req,res) => {

        console.log('-----INSIDE DELETE ROUTE-----')
        console.log(req.body.city, "THIS IS REQ.BODY.CITY");
        const city = req.body.city;
        db.weather.destroy({
            where: { city : city}
        }).then((weather)=>{
            res.redirect('./save');
            })
        })

    // router.put('/save',isLoggedIn, (req , res)=>{
    //     console.log(req.body.city);
    //     const city = req.body.city;
    //     db.weather.update({
    //         where: {city : city}
    //     }).then(()=>{
    //         res.redirect("./save")
    //     })
    // })

//error page
    router.get('/*', (req, res) => {
        res.render('./error')
    })
    

module.exports = router;