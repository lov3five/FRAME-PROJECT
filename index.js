const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const _CONST = require('./app/config/constant')
const DB_MONGO = require('./app/config/db.config')
const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

// Theo dõi log GET, POST, PUT,...
app.use(morgan('combined')); 

// Cross domain
app.use(cors(corsOptions));

app.use(express.static("public", {'extension' : '[jsx]'}));
app.set('view engine', 'ejs')

function isConnected(){
    console.log("Connected MongoDB!!!");
}

function connect(){
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('connected', isConnected);
    return mongoose.connect(DB_MONGO.url, {keepAlive: 1, useNewUrlParser: true});
}

connect();

require('./app/routes')