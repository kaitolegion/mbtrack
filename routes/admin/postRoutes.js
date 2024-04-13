
// POST ROUTES FOR ADMIN   
// CODED BY KAITO

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    res.send('home');
});
  

module.exports = router;