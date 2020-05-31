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

const getSome = () => {
  const query = `SELECT * FROM qna_joined WHERE product_id = 1;`;
  return promiseQuery(query);
};

module.exports = {
  getSome,
};
