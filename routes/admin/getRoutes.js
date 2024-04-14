
// GET ROUTES FOR ADMINISTRATOR 
// CODED BY KAITO

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('home');
});

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.get('/dashboard', (req, res) => {
    res.send('dashboard');
});

module.exports = router;