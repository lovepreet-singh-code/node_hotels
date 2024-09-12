const mongoose = require('mongoose');

//define the mongodb connection url
//const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = 'mongodb+srv://hotels:LoveDB007@cluster0.hbiqa.mongodb.net/'


//set up Mongodb connection
 mongoose.connect(mongoURL,{
//userNewUrlparser:true,
 //useUnifiedTopolpgy:true
 })


//get the default connection

const db = mongoose.connection;

//define event listeners for database connection

db.on('connected', ()=>{
    console.log('connected to mongoDB server');
});

db.on('error', (err)=>{
    console.error('mongoDB connection errors', err);
});

db.on('disconnected', ()=>{
    console.log('mongoDB disconnected');
});


//export the database connection
module.exports = db;