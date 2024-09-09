
// GET ROUTES FOR DRIVER 
// CODED BY KAITO

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('home');
});
  
router.get('/login', (req, res) => {
    res.render('./driver/auth/login');
});

router.get('/dashboard', (req, res) => {
    res.render('./driver/dash/index');
});

module.exports = router;