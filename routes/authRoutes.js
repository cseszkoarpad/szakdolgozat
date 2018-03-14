const passport = require('passport')
const User = require('../models/User')

module.exports = app => {
	app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
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

  //lekérni a usereket
  app.get('/api/users', (req, res) => {
    User.find((err, users) => {
      if(err) return err

      res.send(users)
    })
  })

  //tesztelni kell
  app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    User.findByIdAndRemove({ _id: id }, (err, user) => {
      if(err) return err

      res.send({ "message": `${user} felhasznalo torolve` })
    })
  })
}