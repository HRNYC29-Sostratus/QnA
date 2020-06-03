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

const insertAnswer = (question_id, body, name, email) => {
  let date = new Date();
  const query = `INSERT INTO public.answers_typed (id_a, question_id, body_a, date_written_a, answerer_name, answerer_email, reported_a, helpful_a) values ((SELECT MAX(id_a)+1 FROM public.answers_typed), ${question_id}, '${body}', '${date}', '${name}', '${email}', 0, 0);`;
  return promiseQuery(query);
};

const updateQuestionHelpful = (question_id) => {
  const query = `UPDATE questions_typed SET helpful_q = (SELECT helpful_q + 1 FROM questions_typed WHERE id =${question_id}) WHERE id =${question_id};`;
  return promiseQuery(query);
};

const updateQuestionReport = (question_id) => {
  const query = `UPDATE questions_typed SET reported_q = (SELECT reported_q + 1 FROM questions_typed WHERE id =${question_id}) WHERE id =${question_id};`;
  return promiseQuery(query);
};

const updateAnswerHelpful = (answer_id) => {
  const query = `UPDATE answers_typed SET helpful_a = (SELECT helpful_a + 1 FROM answers_typed WHERE id_a =${answer_id}) WHERE id_a =${answer_id};`;
  return promiseQuery(query);
};

const updateAnswerReport = (answer_id) => {
  const query = `UPDATE answers_typed SET reported_a = (SELECT reported_a + 1 FROM answers_typed WHERE id_a =${answer_id}) WHERE id_a =${answer_id};`;
  return promiseQuery(query);
};

module.exports = {
  getQuestionsAndAnswers,
  getAnswersAndPhotos,
  insertQuestion,
  insertAnswer,
  updateQuestionHelpful,
  updateQuestionReport,
  updateAnswerHelpful,
  updateAnswerReport,
};
