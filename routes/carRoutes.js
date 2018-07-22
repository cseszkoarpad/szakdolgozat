const Comment = require('../models/Comment');
const Car = require('../models/Car');
const requireLogin = require('..//middlewares/requireLogin');
const requireCredits = require('..//middlewares/requireCredits');

module.exports = app => {
  app.get('/api/cars', (req, res) => {
    Car.find()
    .then(cars => res.send(cars))
    .catch(error => console.error(error));
  });

  app.get('/api/comments', (req, res) => {
    Comment.find()
    .then(comments => res.send(comments))
    .catch(error => console.error(error));
  });

  app.post('/api/cars/comments', requireLogin, async (req, res) => {
    const userId = req.body.userId;
    const carId = req.body.carId;
    const userText = req.body.userText;

    const comment = new Comment();
    comment.userId = userId;
    comment.text = userText;
    comment.save((err, newComment) => {
      if (err) return err;

      Car.findById({_id: carId}, (err, car) => {
        if (err) return err;

        car._comments.unshift(newComment._id);
        car.save()
        .then(car => res.send(car))
        .catch(error => console.error(error));
      });
    });
  });

  app.post('/api/cars', requireLogin, requireCredits, (req, res) => {
    const car = new Car();
    car.marka = req.body.marka;
    car.modell = req.body.modell;
    car.kep = req.body.kep;
    car.ar = req.body.ar;
    car.ev = req.body.ev;
    car.allapot = req.body.allapot;
    car.kivitel = req.body.kivitel;
    car.km = req.body.km;
    car.szin = req.body.szin;
    car.tomeg = req.body.tomeg;
    car.uzemanyag = req.body.uzemanyag;
    car.hengerUrtartalom = req.body.hengerUrtartalom;
    car.teljesitmeny = req.body.teljesitmeny;
    car.hajtas = req.body.hajtas;
    car.valto = req.body.valto;
    car.leiras = req.body.leiras;

    car.save((err, car) => {
      if (err) return err;

      req.user.credits -= 1;
      req.user._cars.push(car._id);
      req.user.save();
    })
    .then(car => res.send(car))
    .catch(error => console.error(error));
  });

  app.put('/api/cars/likes', requireLogin, (req, res) => {
    const id = req.body.id;
    Car.findById({_id: id}, (err, car) => {
      if (err) return err;

      car.likes = car.likes + 1;
      car.save()
      .then(car => res.send(car))
      .catch(error => console.error(error));
    });
  });

  app.put('/api/cars/edit', requireLogin, (req, res) => {
    const id = req.body.id;

    Car.findById({_id: id}, (err, car) => {
      if (err) return err;

      car.marka = req.body.marka;
      car.modell = req.body.modell;
      car.kep = req.body.kep;
      car.ar = req.body.ar;
      car.ev = req.body.ev;
      car.allapot = req.body.allapot;
      car.kivitel = req.body.kivitel;
      car.km = req.body.km;
      car.szin = req.body.szin;
      car.tomeg = req.body.tomeg;
      car.uzemanyag = req.body.uzemanyag;
      car.hengerUrtartalom = req.body.hengerUrtartalom;
      car.teljesitmeny = req.body.teljesitmeny;
      car.hajtas = req.body.hajtas;
      car.valto = req.body.valto;
      car.leiras = req.body.leiras;

      car.save()
      .then(car => res.send(car))
      .catch(error => console.error(error));
    });
  });

  app.delete('/api/cars/:id', requireLogin, (req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    Car.remove({_id: id}).then(() => res.send({message: 'success'}))
    .catch(error => console.error(error));
  });
};
