const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
require('dotenv').config()

let city = 'boston'
let API_key = process.env.API_KEY;

let url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`

router.get('/weather', (req, res) => {
    axios.get(url)
    .then((response) => {
        const myWeather = response.data
        res.render('weather', {myWeather})
    })
    .catch(error => {
        res.send(error = "please try again");
    });
    //res.render('weather', {myWeather});
});

module.exports = router;