const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: false }));

let city = 'paris'
//let city = 'req.body.city'
let API_KEY = process.env.API_KEY;
//console.log(API_KEY); to test thats its printing out correctly

//added units=imperial to get the right units for United states 
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`

//setting up to get weather in Boston
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

router.post('/', (req, res) => {
    console.log('----weatherRoute----');
    let newCity = req.body.city;
    console.log('----the new city starts here ----' + newCity )
    let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}=imperial&appid=${API_KEY}`;

        axios.get(newUrl)
        .then((response) => {
            const myWeather = response.data
            console.log(myWeather);

            res.render('weather', {myWeather});

    })
    .catch(error => {
        console.log(error);
        res.send(error = "refresh your screen and input city and state(or country)");
    });


})


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
    //                  if(!newUrl) {
    //                      return;
    //                     }
    //             })
    //         })
        

module.exports = router;