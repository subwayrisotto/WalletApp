const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", function () {
  console.log("Database connection successful");
});

db.on("error", function (err) {
  console.error("Database connection error:", err);
  process.exit(1);
});


app.use((err, req, res, next) => {
    if (err.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(500).json({ message: err.message });
    }
});

module.exports = app;