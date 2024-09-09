// MY LIBRARIES
// CODED BY KAITO CODING
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });


const passengerGetRoutes = require('./routes/passenger/getRoutes');
const passengerPostRoutes = require('./routes/passenger/postRoutes');
const driverGetRoutes = require('./routes/driver/getRoutes');
const driverPostRoutes = require('./routes/driver/postRoutes');
const adminGetRoutes = require('./routes/admin/getRoutes');
const adminPostRoutes = require('./routes/admin/postRoutes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "minibustrack", saveUninitialized: true, resave: true }));



app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/app', passengerGetRoutes);
app.use('/app', passengerPostRoutes);
app.use('/driver', driverGetRoutes);
app.use('/driver', driverPostRoutes);
app.use('/admin', adminGetRoutes);
app.use('/admin', adminPostRoutes);


app.get('/', (req, res) => {
    res.render('home');
});

app.get('*', (req, res) => {
    res.render('404');
});

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('server is running on port 3000');
});