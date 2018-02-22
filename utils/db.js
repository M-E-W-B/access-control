const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;

const open = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.database.dev, config.database.options, err => {
      if (err) return reject(err);
      console.log("Connected to 'dev' mongodb.");
      resolve();
    });
  });
};

const close = mongoose.connection.close;

module.exports = { close, open };
