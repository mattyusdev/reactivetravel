const express = require("express");
const app = express();
const port = process.env.PORT || 1000;

const cors = require("cors");
const db = require("./db/db");

const userRoutes = require("./routes/userRoutes");
const vacationRoutes = require("./routes/vacationRoutes");

const bcrypt = require("bcryptjs");

db.connect(console.log(`@@@@@MY SQL IS CONNECTED@@@@@`));

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/api/vacations", vacationRoutes);

app.listen(port, console.log(`@@@@@SERVER IS UP IN ${port}@@@@@`));
