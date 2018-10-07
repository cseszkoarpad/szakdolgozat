const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

  //nincs használva
  /*app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });*/

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

  app.delete('/api/users/:userId/delete', requireLogin, (req, res) => {
    connection.query(`DELETE FROM users WHERE userId = ? LIMIT 1`, [req.params.userId], (err, result) => {
      if (err) {
        res.send({success: false});
      } else {
        console.log(result);
        res.send({success: true});
      }
    });
  });

  app.post('/api/subscribe', (req, res) => {
    connection.query('INSERT INTO newsletter (email, name) VALUES (?, ?)',
      [req.body.data.email, req.body.data.name], (error, result) => {
        if (error) {
          res.send({success: false});
        } else {
          res.send({success: true});
        }
      });
  });

  app.post('/api/messages', (req, res) => {
    connection.query('INSERT INTO messages (email, name, type, message) VALUES (?, ?, ?, ?)',
      [req.body.data.email, req.body.data.name, req.body.data.type, req.body.data.message], (error, result) => {
        if (error) {
          console.warn(error);
        } else {
          res.send({message: 'success'});
        }
      });
  });
};