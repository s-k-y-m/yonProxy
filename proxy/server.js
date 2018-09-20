const express = require("express");
const morgan = require("morgan");
const path = require("path");
var nearby = require("../nearbyPlaces/db/index.js");
var bodyParser = require("body-parser");
var db = require("../info/db/index.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/nearby/:id", function(req, res) {
  nearby.findOne({ id: req.params.id }).exec(function(err, docs) {
    res.status(200).json(docs);
  });
});

app.get("/restaurants/info/*", function(req, res) {
  console.log("GET Request on " + req.url);
  var dbId = req.url.slice(18);
  db.findOne(dbId, (err, data) => {
    if (err) {
      res.status(405).send("error");
      res.end();
    } else {
      res.status(200).send(data);
      res.end();
    }
  });
});

app.get("/restaurants/all", function(req, res) {
  console.log("GET Request on " + req.url);
  db.getAll((err, data) => {
    if (err) {
      res.status(404).send("error");
      res.end();
    } else {
      res.status(200).send(data);
      res.end();
    }
  });
});
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
