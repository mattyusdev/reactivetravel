const router = require("express").Router();
const db = require("../db/db");

const onlyUsers = require("../auth/onlyUsers");
const onlyAdmins = require("../auth/onlyAdmins");

router.get("/", onlyUsers, (req, res) => {
  db.query(
    `SELECT vacations.id, vacations.location, vacations.title, vacations.description, vacations.dateFrom, vacations.dateTo, vacations.price, vacations.image,
  (select count(vacations_id) from users_vacations WHERE vacations.id = users_vacations.vacations_id) as followers from vacations`,
    (err, vacations) => {
      if (err) throw err;
      if (req.token.isAdmin) {
        res.json([
          { id: req.token.id, username: req.token.username, isAdmin: true },
          vacations
        ]);
      } else {
        let q = `SELECT vacations_id as id FROM users_vacations
        WHERE users_id = ?`;

        db.query(q, [req.token.id], (err, followedVacationsId) => {
          if (err) throw err;

          let followed = [];

          followedVacationsId.forEach(f =>
            vacations.filter((v, i) => {
              if (f.id == v.id) {
                followed.push({ ...vacations.splice(i, 1)[0], followed: true });
              }
            })
          );

          res.json([
            { id: req.token.id, username: req.token.username, isAdmin: false },
            [...followed, ...vacations]
          ]);
        });
      }
    }
  );
});

router.put("/:id/follow", onlyUsers, (req, res) => {
  const { userId, add } = req.body;
  const { id } = req.params;

  let q;

  if (userId && add != undefined && Math.sign(id) === 1) {
    if (add) {
      q = `INSERT users_vacations(users_id, vacations_id)
            VALUES(?, ?)`;
    } else {
      q = `DELETE FROM users_vacations
            WHERE users_id = ? AND vacations_id = ?`;
    }

    db.query(q, [userId, id], (err, results) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  } else {
    res.status(400).send("Missing info");
  }
});

router.post("/search", onlyUsers, (req, res) => {
  const { text, dateFrom, dateTo } = req.body;

  let q = `SELECT vacations.id, vacations.location, vacations.title, vacations.description, vacations.dateFrom, vacations.dateTo, vacations.price, vacations.image,
  (select count(vacations_id) from users_vacations WHERE vacations.id = users_vacations.vacations_id) as followers from vacations WHERE concat(location, title, description) LIKE ?`;

  if (dateFrom != null && dateTo != null) {
    q += ` AND dateFrom <= ? AND dateTo >= ?`;
    db.query(q, [`%${text}%`, dateFrom, dateTo], (err, results) => {
      if (err) throw err;

      if (req.token.isAdmin) {
        res.json(results);
      } else {
        let newQ = `SELECT vacations_id as id FROM users_vacations
        WHERE users_id = ?`;

        db.query(newQ, [req.token.id], (err, followedVacationsId) => {
          if (err) throw err;

          let followed = [];

          followedVacationsId.forEach(f =>
            results.filter((v, i) => {
              if (f.id == v.id) {
                followed.push({
                  ...results.splice(i, 1)[0],
                  followed: true,
                  search: true
                });
              } else {
                v.search = true;
              }
            })
          );

          res.json([...followed, ...results]);
        });
      }
    });
  } else {
    db.query(q, [`%${text}%`], (err, results) => {
      if (err) throw err;

      if (req.token.isAdmin) {
        res.json(results);
      } else {
        let newQ = `SELECT vacations_id as id FROM users_vacations
        WHERE users_id = ?`;

        db.query(newQ, [req.token.id], (err, followedVacationsId) => {
          if (err) throw err;

          let followed = [];

          followedVacationsId.forEach(f =>
            results.filter((v, i) => {
              if (f.id == v.id) {
                followed.push({
                  ...results.splice(i, 1)[0],
                  followed: true,
                  search: true
                });
              } else {
                v.search = true;
              }
            })
          );

          res.json([...followed, ...results]);
        });
      }
    });
  }
});

router.post("/", onlyAdmins, (req, res) => {
  const {
    location,
    title,
    description,
    dateFrom,
    dateTo,
    price,
    image
  } = req.body;

  if (
    location &&
    title &&
    description &&
    dateFrom &&
    dateTo &&
    price &&
    image
  ) {
    let q = `INSERT INTO
    vacations(
        location,
        title,
        description,
        dateFrom,
        dateTo,
        price,
        image
    )
    VALUES
    (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`;

    db.query(
      q,
      [location, title, description, dateFrom, dateTo, price, image],
      (err, results) => {
        if (err) throw err;
        res.sendStatus(201);
      }
    );
  } else {
    res.status(400).send("Missing info");
  }
});

router.delete("/:id", onlyAdmins, (req, res) => {
  const { id } = req.params;

  if (Math.sign(id) === 1) {
    let q = `
    DELETE from users_vacations
    where vacations_id = ?;
    DELETE from vacations
    where id = ?;
    `;

    db.query(q, [id, id], (err, results) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

router.put("/:id", onlyAdmins, (req, res) => {
  const {
    location,
    title,
    description,
    dateFrom,
    dateTo,
    price,
    image
  } = req.body;

  if (
    location &&
    title &&
    description &&
    dateFrom &&
    dateTo &&
    price &&
    image
  ) {
    let q = `UPDATE vacations
    SET location = ?, title = ?, description = ?, dateFrom = ?, dateTo = ?, price = ?, image = ?
    WHERE id = ?
    `;

    db.query(
      q,
      [
        location,
        title,
        description,
        dateFrom,
        dateTo,
        price,
        image,
        req.params.id
      ],
      (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
      }
    );
  } else {
    res.status(400).send("Missing Info");
  }
});

module.exports = router;
