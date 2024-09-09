
// POST ROUTES FOR PASSENGER 
// CODED BY KAITO
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const validator = require('validator')
const ratelimit = require('express-rate-limit');
const admin = require("firebase-admin");
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
// controller
const hashPassword = require('../../controller/hashPassword');



// firebase configuration
const serviceAccount = { "type": process.env.type, "project_id": process.env.project_id, "private_key_id": process.env.private_key_id, "private_key": process.env.private_key, "client_email": process.env.client_email, "client_id": process.env.client_id, "auth_uri": process.env.auth_uri, "token_uri": process.env.token_uri, "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url, "client_x509_cert_url": process.env.client_x509_cert_url, "universe_domain": process.env.universe_domain };
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// end firebase configuration

const db = admin.firestore();

// rate limit
let limiter = ratelimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again after one hour"
});
// end rate limit

// ------------------- FUNCTIONS ----------------------------

async function AuthSignIn(email, password) {
    const pemail = await db.collection('passengers').where('email', '==', email).get();
    let fetchData, fetchdocID;
    pemail.forEach(doc => {
        fetchData = doc.data();
        fetchdocID = doc.id;
    });

    if (pemail.empty) {
        return res.status(404).json({ message: 'User not found' });
    } else {
        if (fetchData.password == hashPassword(password)) {
            return fetchdocID;
        }
        return res.status(401).json({ message: 'Invalid password' });
    }
}

// ------------------- END FUNCTIONS ----------------------------



// ------------------- VALIDATOR ----------------------------

// validate login passenger
const validateLogin = [
    check('email').custom((value, { req }) => {
        if (!value) {
            throw new Error('Email cannot be empty');
        } else if (!validator.isEmail(value)) {
            throw new Error('Please enter valid email address');
        }
        return true;
    }).normalizeEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

// ------------------- END VALIDATOR ----------------------------

// ------------------- START ROUTES ----------------------------


router.post('/login', limiter, validateLogin, async (req, res) => {
    const { email, password } = req.body;
    removesym = (email == "@") ? "" : email;
    req.session.email = removesym.charAt(0) === "@" ? removesym.slice(1) : removesym;
    req.session.password = password;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('passenger/auth/login', { errors: errors.array(), invalid: false, session: req.session });
        }
        // let fetchData, fetchdocID;
        // const pemail = await db.collection('passengers').where('email', '==', email).get();
        // pemail.forEach(doc => {
        //     fetchData = doc.data();
        //     fetchdocID = doc.id;
        // });

        const passengerData = await db.collection('passengers').where('email', '==', email).get();
        let fetchData;
        passengerData.forEach(doc => {
            fetchData = doc.data();
        });

        const uid = await AuthSignIn(email, password);
        res.cookie('uid', uid);
        res.redirect('/app/dashboard');

    } catch (error) {
        return res.render('passenger/auth/login', { errors: [], invalid: true, session: req.session });

    }

});


// ------------------- END START ROUTES ----------------------------

module.exports = router;