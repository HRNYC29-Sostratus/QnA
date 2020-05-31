const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const db = require("./database/index");
// const port = 3000;
// here is how to use dotenv to set all the environment variable
const PORT = 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "../dist/")));

app.get("/qa/:product_id", (req, res) => {
  db.getSome().then((results) => {
    console.log("results", results);
  });
  res.send("you hit the qa by product id route");
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}!`));
