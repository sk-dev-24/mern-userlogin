const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');
const app = express();

app.use(express.json({ urlencoded: false }));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    next();
});

app.use('/user', route);

app.listen(4000, () => {
    mongoose.connect('mongodb+srv://sathishsk7064:LnxvXeJOvj28FLlt@mern-userlogin.egzsj.mongodb.net/test')
        .then(() => console.log('Connected!'));
});