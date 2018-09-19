const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxusautoportal',
});

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
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
        if(err) return console.error(err)

        res.send(req.body.data);
    });
  })
};