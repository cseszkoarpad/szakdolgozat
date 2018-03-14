require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan')
const path = require("path");

const config = require('./config/keys')

const Comment = require('./models/Comment')
const Auto = require('./models/Auto')
const User = require('./models/User')

require('./services/passport');

//nemtom mire jó
//mongoose.Promise = global.Promise;
mongoose.connect(config.database);


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

//deployhoz
app.use(express.static(path.resolve(__dirname, "client", "build")));  
app.get("/", (req, res) => {  
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to the database")
});

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/autoRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Example app listening on port 4000!'))