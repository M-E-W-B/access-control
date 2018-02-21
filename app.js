const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
const router = express.Router();

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use("/api/v1", router);

require("./routes/unauthenticated")(router);
require("./middlewares")(router);
require("./routes")(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({ message: err.message });
});

module.exports = app;
