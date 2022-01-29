const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const authRoute = require('./src/api/auth');
const profileRoute = require('./src/api/profile');
const dataRoute = require('./src/api/data');
const adminRoute = require('./src/api/admin');
const uploadRoute = require('./src/api/upload');

const keys = require('./config/keys');
const http = require("http");
const app = express();

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./src/middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/data', dataRoute);
app.use('/api/admin_panel', adminRoute);
app.use('/api/upload', uploadRoute);

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
//
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build'));
// });

// app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


const server = http.createServer(app);

module.exports = server;
