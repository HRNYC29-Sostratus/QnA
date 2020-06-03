const questionsAndAnswersReponse = (results) => {
  if (results.rows.length === 0) {
    return {};
  }
  let obj = {
    product_id: results.rows[0].product_id,
    results: [],
  };
  q_ids = {};
  results.rows.forEach((row) => {
    if (!q_ids[row.id]) {
      obj.results.push({
        answers: {},
        asker_name: row.asker_name,
        question_body: row.body,
        question_date: row.date_written,
        question_helpfulness: row.helpful_q,
        question_id: row.id,
        reported: row.reported_q,
      });
      q_ids[row.id] = 1;
    }
  });

  let questions = obj.results;

  results.rows.forEach((row) => {
    questions.forEach((question) => {
      if (row.id === question.question_id && row.id_a !== null) {
        question.answers[row.id_a] = {
          answerer_name: row.answerer_name,
          body: row.body_a,
          date: row.date_written_a,
          helpfulness: row.helpful_a,
          id: row.id_a,
          newDate: new Date(),
          photos: [],
        };
      }
    });
  });

  return obj;
};

const answersAndPhotosResponse = (results) => {
  let obj = {question: results.rows[0].question_id, results: []};

  results.rows.forEach((row) => {
    obj.results.push(row);
  });
  return obj;
};

module.exports = {
  questionsAndAnswersReponse,
  answersAndPhotosResponse,
};
