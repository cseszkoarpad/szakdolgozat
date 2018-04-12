require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan')

const config = require('./config/keys')

require('./services/passport');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const pgp = require('pg-promise')();

const db = pgp(config.database);

require('./routes/authRoutes')(app);
require('./routes/autoRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Example app listening on port 4000!'))