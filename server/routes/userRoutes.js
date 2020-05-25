const router = require("express").Router();
const db = require("../db/db");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    db.query(
      `SELECT id, username, password, isAdmin FROM users WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) throw err;
        if (results.length) {
          if (bcryptjs.compareSync(password, results[0].password)) {
            jwt.sign(
              { id: results[0].id, username, isAdmin: results[0].isAdmin },
              "blah",
              { expiresIn: "50m" },
              (err, token) => {
                if (err) throw err;
                delete results[0].password;
                res.send(token);
              }
            );
          } else {
            res.status(400).send("Password is incorrect");
          }
        } else {
          res.status(400).send("Username is incorrect");
        }
      }
    );
  } else {
    res.status(400).send("Missing info");
  }
});

router.post("/register", (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  if (firstName && lastName && username && password && email) {
    db.query(
      `SELECT * FROM users WHERE username = ?`,
      [username],
      async (err, results) => {
        if (err) throw err;

        if (!results.length) {
          const salt = await bcryptjs.genSalt(10);
          const hash = await bcryptjs.hash(password, salt);

          let q = `INSERT INTO
            users(firstName, lastName, username, password, email)
            VALUES
            (?, ?, ?, ?, ?)`;

          db.query(
            q,
            [firstName, lastName, username, hash, email],
            (err, results) => {
              if (err) throw err;
              res.sendStatus(201);
            }
          );
        } else {
          res.status(400).send("That username is taken, try another");
        }
      }
    );
  } else {
    res.status(400).send("Missing Info");
  }
});

module.exports = router;
