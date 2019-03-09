const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};

module.exports = function() {
  const db = config.get("db");
  mongoose
    .connect(db, options)
    .then(() => winston.info(`Connected to ${db}...`));
};
