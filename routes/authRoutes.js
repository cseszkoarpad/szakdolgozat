const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const config = require('../config/keys');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/users/:userId', requireLogin, (req, res) => {
    connection.query(`UPDATE users SET name=?, profilePic=?, location=?, phone=? WHERE userId=? LIMIT 1`,
      [req.body.data.name, req.body.data.profilePic, req.body.data.location, req.body.data.phone, req.params.userId],
      (err, result) => {
        if (err) return console.error(err);

        res.send(req.body.data);
      });
  });

  app.post('/api/messages', (req, res) => {
    connection.query('INSERT INTO messages (email, name, message) VALUES (?, ?, ?)',
      [req.body.data.email, req.body.data.name, req.body.data.message], (error, result) => {
        if (error) {
          console.warn(error);
        } else {
          res.send({message: 'success'});
        }
      });
  });
};