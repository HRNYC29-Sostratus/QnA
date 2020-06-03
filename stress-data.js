const Faker = require("faker");

function generateId(userContext, events, done) {
  const id = Faker.random.number(200);
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateId,
};
