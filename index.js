const express = require("express");
const mongoose = require("mongoose");
const homeRoute = require("./routes/home");
const club = require("./models/Club");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/nodejs_crud", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("NOT working"));
db.once("open", () => {
  console.log("Connection is done sucessfully!");
});

//MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Routing
app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
