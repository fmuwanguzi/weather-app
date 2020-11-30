const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/weather', (req, res) =>{
    console.log(req);
})

modules.exports = router