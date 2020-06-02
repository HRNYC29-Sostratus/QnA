// const pool = require("./config.js");
const {promisify} = require("util");
const {Pool} = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: 123456789,
  database: "postgres",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

const promiseQuery = promisify(pool.query).bind(pool);
const promisePoolEnd = promisify(pool.end).bind(pool);

const getQuestionsAndAnswers = (id) => {
  const query = `SELECT * FROM qna_joined WHERE product_id = ${id};`;
  return promiseQuery(query);
};

const getAnswersAndPhotos = (id) => {
  const query = `SELECT * FROM answers_photos_joined WHERE question_id = ${id}`;
  return promiseQuery(query);
};

const insertQuestion = (product_id, body, name, email) => {
  let date = new Date();
  const query = `INSERT INTO public.qna_joined (id, product_id, body, date_written, asker_name, asker_email, reported_q, helpful_q) values((SELECT MAX(id)+1 FROM public.qna_joined), ${product_id}, '${body}', '${date}', '${name}', '${email}', 0 , 0);`;
  return promiseQuery(query);
};

const insertAnswer = (question_id, body, name, email) => {};

module.exports = {
  getQuestionsAndAnswers,
  getAnswersAndPhotos,
  insertQuestion,
  insertAnswer,
};
