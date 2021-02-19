const mongoose = require("mongoose");
const express = require("express");
const https = require("https");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
const app = express();

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "./.production" });
} else {
  require("dotenv").config({ path: "./.development" });
}

app.use(logger("dev"));

const PORT = process.env.PORT || 8000;

//middlewares
app.use(require("helmet")());
app.use(require("cors")());
app.use(express.json());

//routes
app.use("/api", require("./routes/routes"));

//errors handler
// app.use(require("./middleware/errors.middleware"));

const start = async () => {
  await mongoose.connect(process.env.CONNECT_STRING);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "DB connection error:"));
  db.once("open", () => {
    console.log("DB started");
  });

  app.listen(PORT, () => {
    console.log(`server listen on ${PORT}`);
  });
};

start();
