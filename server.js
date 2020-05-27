const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;
// const port = 3000;
// here is how to use dotenv to set all the environment variable
const PORT = 3000;

const csvStringifier = createCsvStringifier({
  header: [
    {id: "id", title: "id"},
    {id: "product_id", title: "product_id"},
    {id: "body", title: "body"},
    {id: "date_written", title: "date_written"},
    {id: "asker_name", title: "asker_name"},
    {id: "asker_email", title: "asker_email"},
    {id: "reported", title: "reported"},
    {id: "helpful", title: "helpful"},
  ],
});

let readStream = fs.createReadStream("./data/questions.csv");
let writeStream = fs.createWriteStream("./toLoad/clean_questions.csv");

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      //trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      // if (key !== trimKey) {
      //   delete chunk[key];
      // }
    }
    //filters out all non-number characters
    // let onlyNumbers = chunk.default_price.replace(/\D/g, "");
    // chunk.default_price = onlyNumbers;
    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({writableObjectMode: true});

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "../dist/")));

app.listen(PORT, () => console.log(`Server listening on ${PORT}!`));
