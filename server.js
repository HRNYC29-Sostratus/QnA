const cluster = require("cluster");

if (cluster.isMaster) {
  const cpus = 4;
  console.log(`forking ${cpus} cpus!`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const path = require("path");
  const compression = require("compression");
  const db = require("./database/index");
  const helpers = require("./buildResponse");
  const morgan = require("morgan");

  const PORT = 8080;

  app.use(compression());
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(__dirname, "../dist/")));

  app.get("/qa/:product_id", (req, res) => {
    let id = req.params.product_id;
    db.getQuestionsAndAnswers(id)
      .then((results) => {
        return helpers.questionsAndAnswersReponse(results);
      })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.get("/qa/:question_id/answers", (req, res) => {
    let id = req.params.question_id;
    db.getAnswersAndPhotos(id)
      .then((results) => {
        return helpers.answersAndPhotosResponse(results);
      })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.post("/qa/:product_id", (req, res) => {
    let product_id = req.params.product_id;
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;

    db.insertQuestion(product_id, body, name, email)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.post("/qa/:question_id/answers", (req, res) => {
    let question_id = req.params.question_id;
    let body = req.body.body;
    let name = req.body.name;
    let email = req.body.email;

    db.insertAnswer(question_id, body, name, email)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.put("/qa/question/:question_id/helpful", (req, res) => {
    let question_id = req.params.question_id;

    db.updateQuestionHelpful(question_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.put("/qa/question/:question_id/report", (req, res) => {
    let question_id = req.params.question_id;
    db.updateQuestionReport(question_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.put("/qa/answer/:answer_id/helpful", (req, res) => {
    let answer_id = req.params.answer_id;

    db.updateAnswerHelpful(answer_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.put("/qa/answer/:answer_id/report", (req, res) => {
    let answer_id = req.params.answer_id;

    db.updateAnswerReport(answer_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  });

  app.listen(PORT, () => console.log(`Server listening on ${PORT}!`));
  module.exports = app;
}
