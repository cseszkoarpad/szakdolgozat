const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxusautoportal',
});

connection.connect();

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  connection.query(`SELECT * FROM users WHERE userId = ${userId}`, function (err, rows) {
    done(err, rows[0]);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      connection.query(`SELECT * FROM users WHERE userId = ${profile.id}`, function (err, rows) {
        if (rows.length) {
          return done(err, rows[0]);
        } else {
          let newUser = {};
          newUser.userId = profile.id;
          newUser.email = profile.emails[0].value;
          newUser.name = profile.displayName;
          newUser.profilePic = profile.photos[0].value;
          connection.query('INSERT INTO users ( userId, email, name, profilePic ) VALUES (?, ?, ?, ?)',
            [profile.id, profile.emails[0].value, profile.displayName, profile.photos[0].value], function (err, rows) {
              newUser.id = rows.insertId;

              return done(null, newUser);
            });
        }
      });
    }));