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
  connection.query(`select * from users where userId = ${userId}`, function (err, rows) {
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
      connection.query(`select * from users where userId = ${profile.id}`, function (err, rows) {
        if (rows.length) {
          return done(err, rows[0]);
        } else {
          let newUser = {};
          newUser.userId = profile.id;
          newUser.name = profile.displayName;
          newUser.profilePic = profile.photos[0].value;
          connection.query('INSERT INTO users ( userId, name, profilePic ) values (?, ?, ?)', [profile.id, profile.displayName, profile.photos[0].value], function (err, rows) {
            newUser.id = rows.insertId;

            return done(null, newUser);
          });
        }
      });
    }));