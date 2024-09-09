
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

router.get('/profile', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard/passengers', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard/drivers', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard/bustracking', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard/managebuses', (req, res) => {
    res.render('admin/index', { request: req });
});

router.get('/dashboard/routes', (req, res) => {
    res.render('admin/index', { request: req });
});

module.exports = router;