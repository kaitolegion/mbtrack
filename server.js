const express = require("express");
const path = require("path");

const passengerGetRoutes = require('./routes/passenger/getRoutes');
const passengerPostRoutes = require('./routes/passenger/postRoutes');

const driverGetRoutes = require('./routes/driver/getRoutes');
const driverPostRoutes = require('./routes/driver/postRoutes');

const adminGetRoutes = require('./routes/admin/getRoutes');
const adminPostRoutes = require('./routes/admin/postRoutes');



const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/app', passengerGetRoutes);
app.use('/app', passengerPostRoutes);

app.use('/driver', driverGetRoutes);
app.use('/driver', driverPostRoutes);

app.use('/admin', adminGetRoutes);
app.use('/admin', adminPostRoutes);


app.get('/', (req, res) => {
    res.send('asd');
});

app.get('*', (req, res) => {
    res.render('404');
});


const port = 3000;



app.listen(port, () => {
    console.log('server is running on port 3000');
});