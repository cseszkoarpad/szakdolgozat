const requireLogin = require('..//middlewares/requireLogin');
const requireCredits = require('..//middlewares/requireCredits');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxusautoportal',
});

connection.connect();

module.exports = app => {
  app.get('/api/cars', (req, res) => {
    connection.query('SELECT * FROM cars LIMIT 1', (err, cars) => {
      res.send(cars);
    });
  });

  app.get('/api/cars/:id', (req, res) => {
    connection.query(`select * from cars where id = ${req.params.id} LIMIT 1`, (err, car) => {
      res.send(car[0]);
    });
  });

  app.post('/api/cars/search', (req, res) => {
    let queryString = `select * from cars where`;

    if (req.body.data.marka) {
      queryString += ` marka LIKE '%${req.body.data.marka}%'`;
    }

    if (req.body.data.kivitel && !req.body.data.marka) {
      queryString += ` kivitel = '${req.body.data.kivitel}'`;
    } else if (req.body.data.kivitel) {
      queryString += ` AND kivitel = '${req.body.data.kivitel}'`;
    }

    if (req.body.data.uzemanyag && !req.body.data.marka && !req.body.data.kivitel) {
      queryString += ` uzemanyag = '${req.body.data.uzemanyag}'`;
    } else if (req.body.data.uzemanyag) {
      queryString += ` AND uzemanyag = '${req.body.data.uzemanyag}'`;
    }

    connection.query(queryString, (err, cars) => {
      if (cars.length) {
        res.send(cars);
      }
    });
  });

  app.get('/api/comments/:carId', (req, res) => {
    connection.query(`SELECT name, profilePic, text, feltoltve FROM users, comments WHERE carId = ${req.params.carId} AND users.id = comments.userId
     ORDER BY feltoltve DESC`, (err, comments) => {
      if (comments.length) {
        res.send(comments);
      }
    });
  });

  app.post('/api/comments', requireLogin, async (req, res) => {
    const userId = req.body.data.userId;
    const carId = Number(req.body.data.carId);
    const text = req.body.data.userText;
    const name = req.body.data.name;
    const profilePic = req.body.data.profilePic;
    const newComment = {userId, carId, text, name, profilePic};
    connection.query(`INSERT INTO comments (userId, carId, text) VALUES (?, ?, ?)`, [userId, carId, text], (err, result) => {
      if (result.affectedRows === 1) {
        newComment.feltoltve = new Date();
        newComment.id = result.insertId;
        res.send(newComment);
      }
    });
  });

  //requireLogin, requireCredits,
  app.post('/api/cars', (req, res) => {
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

    const car = {};
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
    console.log(req.user);
    car.userId = req.user.id;
    console.log([{...car}]);
    connection.query(`INSERT INTO cars (marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg,
     uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [{...car}], (err, car) => {
        req.user.credits -= 1;
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
    connection.query(`DELETE FROM cars WHERE id = ${id}`);
  });
};