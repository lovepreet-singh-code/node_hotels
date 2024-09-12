const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyparser = require('body-parser');
app.use(bodyparser.json()); //req.body
const PORT = process.env.PORT || 3000;

//const MenuItem = require('./models/Menuitem.js');

app.get('/', function (req,res){
    res.send('welcome to my hotel...')
})

// import the router files
const personRoutes = require('./routes/personRoutes.js')
const menuitemRoutes = require('./routes/menuitemRoutes.js')

//use the routers
app.use('/person', personRoutes);
app.use('/menu',menuitemRoutes);



app.listen(3000)

// {
//     "name": "noodles",
//     "price": 500,
//     "taste": "spicy",
//     "is_drink": "true",
//     "ingredients": "soos",
//     "num_sales": 2
// }


// {
//     "name":"manu kumari",
//     "age": 25,
//     "work": "chef",
//     "mobile":7846736387,
//     "email":"manu@example.com",
//     "address":"gurdaspur",
//     "salary":300000
// }