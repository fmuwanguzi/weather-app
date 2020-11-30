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
        const myWeather = respose.data
        
        res.render('weather', {myWeather})

    })
    //res.render('weather');
});

module.exports = router;