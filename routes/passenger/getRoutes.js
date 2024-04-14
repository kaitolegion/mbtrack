
// GET ROUTES FOR PASSENGER 
// CODED BY KAITO

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/app/login');
});

router.get('/otp/confirmation', (req, res) => {
    res.render('passenger/security/otp');
});

router.get('/login', (req, res) => {
    res.render('passenger/login');
});

router.get('/register', (req, res) => {
    res.render('passenger/register');
});

router.get('/forgot', (req, res) => {
    res.render('passenger/forgot');
});

router.get('/dashboard', (req, res) => {
    res.send('dashboard');
});

module.exports = router;