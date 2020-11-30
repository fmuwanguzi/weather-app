const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/weather', (req, res) => {
    res.render('weather');
})

module.exports = router;