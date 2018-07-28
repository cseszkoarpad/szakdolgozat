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

  app.get('/api/cars/:id', (req, res) => {
    Car.findOne({_id: req.params.id})
    .then(car => res.send(car))
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
    const {
      marka,
      modell,
      kep,
      ar, ev, allapot,
      kivitel, km, szin,
      tomeg, uzemanyag,
      hengerUrtartalom,
      teljesitmeny, hajtas,
      valto, leiras,
    } = req.body.car;

    const car = new Car();
    car.marka = marka;
    car.modell = modell;
    car.kep = kep;
    car.ar = ar;
    car.ev = ev;
    car.allapot = allapot;
    car.kivitel = kivitel;
    car.km = km;
    car.szin = szin;
    car.tomeg = tomeg;
    car.uzemanyag = uzemanyag;
    car.hengerUrtartalom = hengerUrtartalom;
    car.teljesitmeny = teljesitmeny;
    car.hajtas = hajtas;
    car.valto = valto;
    car.leiras = leiras;

    car.save((err, car) => {
      if (err) return err;

      req.user.credits -= 1;
      req.user._cars.push(car._id);
      req.user.save();

      res.send(car);
    });
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
    const {
      marka,
      modell,
      kep,
      ar, ev, allapot,
      kivitel, km, szin,
      tomeg, uzemanyag,
      hengerUrtartalom,
      teljesitmeny, hajtas,
      valto, leiras,
    } = req.body.car;

    car.marka = marka;
    car.modell = modell;
    car.kep = kep;
    car.ar = ar;
    car.ev = ev;
    car.allapot = allapot;
    car.kivitel = kivitel;
    car.km = km;
    car.szin = szin;
    car.tomeg = tomeg;
    car.uzemanyag = uzemanyag;
    car.hengerUrtartalom = hengerUrtartalom;
    car.teljesitmeny = teljesitmeny;
    car.hajtas = hajtas;
    car.valto = valto;
    car.leiras = leiras;

    Car.findById({_id: id}, (err, car) => {
      if (err) return err;

      car.save();
    });
  });

  app.delete('/api/cars/:id', requireLogin, (req, res) => {
    const id = req.params.id;
    Car.remove({_id: id})
    .then(() => res.send({message: 'success'}))
    .catch(error => console.error(error));
  });
};