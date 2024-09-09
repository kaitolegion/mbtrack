
// GET ROUTES FOR PASSENGER 
// CODED BY KAITO

const express = require('express');
const router = express.Router();

// middleware
const { isAuthenticatedPassenger, checkAuthPassenger } = require('./middlewares');
// end


router.get('/', (req, res) => {
    res.redirect('/app/login');
});

router.get('/otp/confirmation', (req, res) => {
    res.render('passenger/security/otp');
});

router.get('/login', checkAuthPassenger, async (req, res, next) => {
    res.render('passenger/auth/login', { errors: [], invalid: false, session: "" });
});

router.get('/register', checkAuthPassenger, async (req, res) => {
    res.render('passenger/auth/register');
});

router.get('/upload/identity/:IDToken', checkAuthPassenger, async (req, res) => {
    res.render('passenger/auth/uploadID');
});

router.get('/forgot', checkAuthPassenger, async (req, res) => {
    res.render('passenger/auth/forgot');
});

router.get('/dashboard', isAuthenticatedPassenger, async (req, res) => {

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    res.render('passenger/dash/index', {
        currentTime: `${hours}:${minutes}:${seconds} ${ampm}`
    });
});

module.exports = router;