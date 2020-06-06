// const pool = require("./config.js");
const {promisify} = require("util");
const {Pool} = require("pg");

const pool = new Pool({
  host: "13.59.110.213",
  port: 80,
  user: "postgres",
  password: 123456789,
  database: "postgres",
  max: 20,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
});

const promiseQuery = promisify(pool.query).bind(pool);
const promisePoolEnd = promisify(pool.end).bind(pool);

const getQuestionsAndAnswers = (id) => {
  const query = `SELECT b.id, b.product_id, b.body, b.date_written, b.asker_name, b.asker_email, b.reported_q, b.helpful_q, a.ID_A, a.QUESTION_ID, a.BODY_a, a.answerer_name, a.answerer_email, a.reported_a, a.helpful_a
  FROM answers_typed a
  LEFT JOIN questions_typed b ON a.question_id = b.id
  WHERE b.product_id = ${id};`;
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
  promisePoolEnd,
};
