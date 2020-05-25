const jwt = require("jsonwebtoken");

function onlyUsers(req, res, next) {
  const token = req.header("token");

  if (token) {
    jwt.verify(token, "SECRET", (err, decoded) => {
      if (err) throw err;
      if (decoded.username) {
        req.token = decoded;
        next();
      } else {
        res.status(401).send("You need to login!!");
      }
    });
  } else {
    res.status(401).send("You need to login!!");
  }
}

module.exports = onlyUsers;
