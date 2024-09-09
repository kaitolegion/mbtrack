
// POST ROUTES FOR ADMIN   
// CODED BY KAITO

const express = require('express');

const validator = require('validator')
const router = express.Router();

// const adminn = require("firebase-admin");
// const dotenv = require('dotenv');
// dotenv.config({ path: '.env' });

// const serviceAccounts = {
//     "type": process.env.type,
//     "project_id": process.env.project_id,
//     "private_key_id": process.env.private_key_id,
//     "private_key": process.env.private_key,
//     "client_email": process.env.client_email,
//     "client_id": process.env.client_id,
//     "auth_uri": process.env.auth_uri,
//     "token_uri": process.env.token_uri,
//     "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
//     "client_x509_cert_url": process.env.client_x509_cert_url,
//     "universe_domain": process.env.universe_domain
// };

// adminn.initializeApp({ credential: adminn.credential.cert(serviceAccounts) });


// const db = admin.firestore();


async function AuthSignInAdmin(username, password) {
    const uname = await db.collection('admin').where('username', '==', username).get();
    let fetchData, fetchdocID;
    uname.forEach(doc => {
        fetchData = doc.data();
        fetchdocID = doc.id;
    });

    if (uname.empty) {
        return res.status(404).json({ message: 'User not found' });
    } else {
        if (fetchData.password == password) {
            return fetchdocID;
        }
        return res.status(401).json({ message: 'Invalid password' });
    }
}

router.post('/login', async (req, res) => {

    // diri ang request data 
    const { username, password } = req.body;

    try {
        const adminData = await db.collection('admin').where('username', '==', username).get();
        let fetchData;
        adminData.forEach(doc => {
            fetchData = doc.data();
        });
        // icheck ang data if exist ba or dili sa database
        const uid = await AuthSignInAdmin(username, password);
        res.cookie('uid', uid); // isave niya dayun sa cookie sa browser
        res.redirect('/admin/dashboard');

    } catch (error) {
        return res.send('err' + username + " " + password);

    }
    res.send('homes');
});


module.exports = router;