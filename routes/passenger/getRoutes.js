
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

router.get('/login', (req, res, next) => {
    res.render('passenger/login', { errors: [], invalid: false, session: "" });
});

router.get('/register', (req, res) => {
    res.render('passenger/register');
});

router.get('/forgot', (req, res) => {
    res.render('passenger/forgot');
});

router.get('/dashboard', (req, res) => {
    res.render('passenger/dash/index');
});

module.exports = router;