const jwt = require("jsonwebtoken");

function onlyAdmin(req, res, next) {
  const token = req.header("token");

  if (token) {
    jwt.verify(token, "SECRET", (err, decoded) => {
      if (err) throw err;
      if (decoded.isAdmin) {
        req.token = decoded;
        next();
      } else {
        res.status(401).send("you are not admin!!");
      }
    });
  } else {
    res.status(401).send("You need to login!!");
  }
}

module.exports = onlyAdmin;
