// Body Parser is a middleware of Node JS used to handle HTTP POST request. Body Parser can parse string based client request body into JavaScript Object which we can use in our application.

const express = require("express");
const category_route = express();       //to import any url

const bodyParser = require("body-parser");
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({extended:true}));

const verify = require("../middleware/verify");

const category_controller = require("../middleware/categoryController");


category_route.post('/add-category',verify,category_controller.addCategory); //sets route

module.exports = category_route;



// creating a controller,we have to tell which method we are will use to hit particular route
 