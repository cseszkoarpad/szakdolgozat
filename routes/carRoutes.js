const requireLogin = require('../middlewares/requireLogin');
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
    connection.query(`SELECT * FROM cars LIMIT 25`, (err, cars) => {
      if (err) console.log(err);
      else {
        res.send(cars);
      }
    });
  });

  app.get('/api/cars/by-user/:userId', (req, res) => {
    connection.query(`SELECT * FROM cars WHERE userId = ?`, [req.params.userId], (err, cars) => {
      if (err) console.log(err);
      else {
        res.send(cars);
      }
    });
  });


  //MŰKÖDIK DE NINCS RÁ CSINÁLVA FRONTEND OLDAL
  app.get('/api/cars/suggested/:userId', (req, res) => {
    connection.query(`SELECT preview_url, marka, modell, ar, ev, kivitel, km, szin, tomeg, uzemanyag,
     hengerUrtartalom, teljesitmeny, hajtas, valto, leiras FROM cars, likes WHERE likes.carId = cars.id AND likes.userId = ?`,
      [req.params.userId], (err, cars) => {
        if (err) console.log(err);
        else {
          let kivitelek = {};
          cars.forEach(car => {
            if (kivitelek[car.kivitel]) {
              kivitelek[car.kivitel]++;
            } else {
              kivitelek[car.kivitel] = 1;
            }
          });
          let favouriteKivitel;
          for (let i in kivitelek) {
            let maxCount = 0;
            if (kivitelek.hasOwnProperty(i) && kivitelek[i] > maxCount) {
              maxCount = kivitelek[i];
              favouriteKivitel = i;
            }
          }
          connection.query(`SELECT * FROM cars WHERE kivitel = ? LIMIT 25`, [favouriteKivitel], (err, cars) => {
            if(err) {
              console.error(err)
            } else {
              res.send(cars);
            }
          });
        }
      });
  });

  app.get('/api/cars/:id', (req, res) => {
    connection.query(`SELECT * FROM cars WHERE id = ? LIMIT 1`, [req.params.id], (err, result) => {
      res.send(result[0]);
    });
  });

  app.get('/api/cars/:carId/images', (req, res) => {
    connection.query(`SELECT secure_url FROM images WHERE carId = ?`, [req.params.carId], (err, result) => {
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

  app.get('/api/comments/:carId', (req, res) => {
    connection.query(`SELECT name, profilePic, text, feltoltve FROM users, comments WHERE carId = ? AND users.userId = comments.userId
     ORDER BY feltoltve DESC`, [req.params.carId], (err, comments) => {
      if (comments && comments.length) {
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

  app.post('/api/cars/images', requireLogin, (req, res) => {
    connection.query(`INSERT INTO images (secure_url, carId) VALUES (?, ?)`,
      [req.body.data.url, req.body.data.carId], (err, result) => {
        if (err) console.log(err);
        else {
          connection.query(`UPDATE cars SET preview_url = ? WHERE cars.id = ? AND preview_url = '' LIMIT 1`,
            [req.body.data.url, req.body.data.carId], (err, result) => {
              if (err) console.log(err);
              else {
                res.send(result);
              }
            });
        }
      });
  });

  app.post('/api/cars', requireLogin, (req, res) => {
    const {
      id, preview_url,
      marka, modell,
      ar, ev,
      kivitel, km, szin,
      tomeg, uzemanyag,
      hengerUrtartalom,
      teljesitmeny, hajtas,
      valto, leiras,
    } = req.body.car;

    connection.query(`INSERT INTO cars (id, preview_url, marka, modell, ar, ev, kivitel, km, szin, tomeg,
     uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, preview_url, marka, modell, ar, ev, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny,
        hajtas, valto, leiras, req.user.userId], (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send(id);
        }
      });
  });

  app.put('/api/cars/:carId/edit', (req, res) => {
    const {
      preview_url, marka, modell, ar, ev,
      kivitel, km, szin, tomeg, uzemanyag,
      hengerUrtartalom, teljesitmeny, hajtas,
      valto, leiras,
    } = req.body.car;

    connection.query(`UPDATE cars SET preview_url = ?, marka = ?, modell = ?, ar = ?, ev = ?, kivitel = ?, km = ?, szin = ?, tomeg = ?, uzemanyag = ?, hengerUrtartalom = ?, teljesitmeny = ?, hajtas = ?, valto = ?, leiras = ? WHERE id = ? LIMIT 1`,
      [preview_url, marka, modell, ar, ev, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, req.params.carId], (err, result) => {
        if (err) {
          console.warn(err);
        } else {
          res.send({success: true});
        }
      });
  });

  app.delete('/api/cars/delete/:carId', requireLogin, (req, res) => {
    connection.query(`DELETE FROM cars WHERE id = ?`, [req.params.carId], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({success: true});
      }
    });
  });
};