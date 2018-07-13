const Comment = require('../models/Comment');
const Auto = require('../models/Auto');
const requireLogin = require('..//middlewares/requireLogin');
const requireCredits = require('..//middlewares/requireCredits');

module.exports = app => {
  app.get('/api/autos', (req, res) => {
    Auto.find()
    .then(autos => res.send(autos))
    .catch(error => console.error(error));
  });

  app.get('/api/comments', (req, res) => {
    Comment.find()
    .then(comments => res.send(comments))
    .catch(error => console.error(error));
  });

  app.post('/api/autos/comments', async (req, res) => {
    const userId = req.body.userId;
    const autoId = req.body.autoId;
    const userText = req.body.userText;

    const comment = new Comment();
    comment.userId = userId;
    comment.text = userText;
    comment.save((err, newComment) => {
      if (err) return err;

      Auto.findById({_id: autoId}, (err, auto) => {
        if (err) return err;

        auto._comments.unshift(newComment._id);
        auto.save()
        .then(auto => res.send(auto))
        .catch(error => console.error(error));
      });
    });
  });

  app.post('/api/autos', requireLogin, requireCredits, (req, res) => {
    const auto = new Auto();
    auto.marka = req.body.marka;
    auto.modell = req.body.modell;
    auto.kep = req.body.kep;
    auto.ar = req.body.ar;
    auto.ev = req.body.ev;
    auto.allapot = req.body.allapot;
    auto.kivitel = req.body.kivitel;
    auto.km = req.body.km;
    auto.szin = req.body.szin;
    auto.tomeg = req.body.tomeg;
    auto.uzemanyag = req.body.uzemanyag;
    auto.hengerUrTartalom = req.body.hengerUrTartalom;
    auto.teljesitmeny = req.body.teljesitmeny;
    auto.hajtas = req.body.hajtas;
    auto.valto = req.body.valto;
    auto.leiras = req.body.leiras;

    auto.save((err, auto) => {
      if (err) return err;

      req.user.credits -= 1;
      req.user._autos.push(auto._id);
      req.user.save();
    })
    .then(auto => res.send(auto))
    .catch(error => console.error(error));
  });

  app.put('/api/autos/likes', requireLogin, (req, res) => {
    const id = req.body.id;
    Auto.findById({_id: id}, (err, auto) => {
      if (err) return err;

      auto.likes = auto.likes + 1;
      auto.save()
      .then(auto => res.send(auto))
      .catch(error => console.error(error));
    });
  });

  app.put('/api/autos/edit', requireLogin, (req, res) => {
    const id = req.body.id;

    Auto.findById({_id: id}, (err, auto) => {
      if (err) return err;

      auto.marka = req.body.marka;
      auto.modell = req.body.modell;
      auto.kep = req.body.kep;
      auto.ar = req.body.ar;
      auto.ev = req.body.ev;
      auto.allapot = req.body.allapot;
      auto.kivitel = req.body.kivitel;
      auto.km = req.body.km;
      auto.szin = req.body.szin;
      auto.tomeg = req.body.tomeg;
      auto.uzemanyag = req.body.uzemanyag;
      auto.hengerUrTartalom = req.body.hengerUrTartalom;
      auto.teljesitmeny = req.body.teljesitmeny;
      auto.hajtas = req.body.hajtas;
      auto.valto = req.body.valto;
      auto.leiras = req.body.leiras;

      auto.save()
      .then(auto => res.send(auto))
      .catch(error => console.error(error));
    });
  });

  app.delete('/api/autos/delete', requireLogin, (req, res) => {
    const id = req.body.id;

    Auto.findById({_id: id})
    .then(auto => {
      auto.remove()
      .then(() => res.send({message: 'success'}));
    })
    .catch(error => console.error(error));
  });
};
