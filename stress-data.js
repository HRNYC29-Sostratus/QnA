const Faker = require("faker");

function generateId(userContext, events, done) {
  const id = Faker.random.number(1000);
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateId,
};
