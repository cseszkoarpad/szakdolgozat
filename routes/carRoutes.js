const requireLogin = require('..//middlewares/requireLogin');
const mysql = require('mysql');
const uniqid = require('uniqid');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxusautoportal',
});

connection.connect();

module.exports = app => {
  app.get('/api/cars', (req, res) => {
    connection.query('SELECT * FROM cars LIMIT 10', (err, cars) => {
      res.send(cars);
    });
  });

  app.get('/api/cars/:id', (req, res) => {
    connection.query(`SELECT * FROM cars WHERE id = ? LIMIT 1`, [req.params.id], (err, result) => {
      res.send(result[0]);
    });
  });

  app.get('/api/cars/:id/images', (req, res) => {
    connection.query(`SELECT secure_url FROM images WHERE carId = ?`, [req.params.id], (err, result) => {
      res.send(result);
    });
  });

  app.get('/api/car/:carId/likes', (req, res) => {
    connection.query(`SELECT COUNT(*) as likeCount FROM likes WHERE carId = ?`, [req.params.carId], (err, result) => {
      res.send({likes: result[0].likeCount});
    });
  });

  app.put('/api/car/like', requireLogin, (req, res) => {
    connection.query('SELECT * FROM likes WHERE carId = ? AND userId = ? LIMIT 1', [req.body.carId, req.user.userId], (err, result) => {
      if (result.length) {
        res.send({error: 'Már kedvelte ezt az autót!'});
      } else {
        connection.query(`INSERT INTO likes (carId, userId) VALUES (?, ?)`, [req.body.carId, req.user.userId], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({success: true});
          }
        });
      }
    });
  });

  app.post('/api/cars/search', (req, res) => {
    let queryString = `SELECT * FROM cars WHERE`;
    let parameters = [];
    if (req.body.data.marka) {
      queryString += ` marka LIKE ?`;
      parameters.push(req.body.data.marka);
    }

    if (req.body.data.kivitel && !req.body.data.marka) {
      queryString += ` kivitel = ?`;
      parameters.push(req.body.data.kivitel);
    } else if (req.body.data.kivitel) {
      queryString += ` AND kivitel = ?`;
      parameters.push(req.body.data.kivitel);
    }

    if (req.body.data.uzemanyag && !req.body.data.marka && !req.body.data.kivitel) {
      queryString += ` uzemanyag = ?`;
      parameters.push(req.body.data.uzemanyag);
    } else if (req.body.data.uzemanyag) {
      queryString += ` AND uzemanyag = ?`;
      parameters.push(req.body.data.uzemanyag);
    }

    connection.query(queryString, [...parameters], (err, cars) => {
      if (cars && cars.length > 0) {
        res.send(cars);
      }
    });
  });

  app.get('/api/comments/:carId', (req, res) => {
    connection.query(`SELECT name, profilePic, text, feltoltve FROM users, comments WHERE carId = ? AND users.userId = comments.userId
     ORDER BY feltoltve DESC`, [req.params.carId], (err, comments) => {
      if (comments && comments.length > 0) {
        res.send(comments);
      } else {
        res.send([]);
      }
    });
  });

  app.post('/api/comments', requireLogin, async (req, res) => {
    const userId = req.user.userId;
    const carId = req.body.data.carId;
    const text = req.body.data.userText;
    const name = req.user.name;
    const profilePic = req.user.profilePic;
    const newComment = {userId, carId, text, name, profilePic};
    connection.query(`INSERT INTO comments (userId, carId, text) VALUES (?, ?, ?)`, [userId, carId, text], (err, result) => {
      if (result && result.affectedRows === 1) {
        newComment.feltoltve = new Date();
        newComment.id = result.insertId;
        res.send(newComment);
      }
    });
  });

  app.post('/api/cars', requireLogin, (req, res) => {
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
    connection.query(`INSERT INTO cars (id, marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg,
     uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [uniqid(), marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny,
        hajtas, valto, leiras, req.user.userId], (err, result) => {
        if (err) console.log(err);

        res.send(result);
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

  });

  app.delete('/api/cars/delete/:carId/:userId', requireLogin, (req, res) => {
    connection.query(`DELETE FROM cars WHERE id = ? AND cars.userId = ?`, [req.params.carId, req.params.userId], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({success: true});
      }
    });
  });
};