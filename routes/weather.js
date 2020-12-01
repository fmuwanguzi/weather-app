const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
require('dotenv').config()

let city = 'miami'
//let city = 'req.body.city'
let API_KEY = process.env.API_KEY;
//console.log(API_KEY); to test thats its printing out correctly

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

//setting up to get weather in Boston
router.get('/weather', (req, res) => {
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

// router.post('/moreWeather', (req, res) => {
// let city = req.body.city
// let url


//     db.weather.create({
//         name: req.body.name
//     }).then((_weather)=>{
//         res.redirect('/weather')
//     })
// })

module.exports = router;