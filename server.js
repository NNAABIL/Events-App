// Load Environment Variables
require('dotenv').config();
// Grap App Dependencies
const express = require('express'),
      app     = express(),
      expressLayouts = require('express-ejs-layouts'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
      cookieParser = require('cookie-parser'),
      flash  = require('connect-flash'),
      port    = process.env.PORT;

// Configure App
app.use(cookieParser());
app.use(session({
    secret : "Keyboard Cat",
    cookie : {maxAge : 50000} , 
    resave : false , 
    saveUninitialized : false
}));
app.use(flash());
// Set Static Assets
app.use(express.static(__dirname + "/public"));
// Set View Engine
app.set('view engine' , 'ejs');
app.use(expressLayouts);
// Database Connection
mongoose.connect(process.env.DB_URI , {useNewUrlParser : true , 
    useUnifiedTopology : true , useCreateIndex : true});
// Set Success Messsage If Connection Success
mongoose.connection.on('open' , ()=>{console.log('Connection Success')});
// Use Body Parser
app.use(bodyParser.urlencoded({extended : true}));
// Setting app Routing
app.use(require('./app/routes/events'));
// Running App Server

app.listen(port , ()=>{
    console.log(`Server Running on localhost : ${port}`);
});