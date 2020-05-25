const mysql = require("mysql");

const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
  multipleStatements: true,
});

module.exports = db;
