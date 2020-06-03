const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

describe("Jest assertions are working", () => {
  it("makes sure the tests are working", () => {
    expect(true).toBe(true);
  });
});

describe("GET request to /qa/:product_id", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.get("/qa/1").send();
    expect(res.statusCode).toEqual(200);
  });
  it("should respond with a results property", async () => {
    const res = await request.get("/qa/1").send();
    expect(res.body.results.length).toBeGreaterThanOrEqual(9);
  });
});

describe("GET request to /qa/:question_id/answers", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.get("/qa/1/answers").send();
    expect(res.statusCode).toEqual(200);
  });
  it("should respond with a results property", async () => {
    const res = await request.get("/qa/1/answers").send();
    expect(res.body.results.length).toBeGreaterThanOrEqual(7);
  });
});

describe("POST request to /qa/:product_id", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.post("/qa/1").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST request to /qa/:question_id/answers", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.post("/qa/1/answers").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("PUT request to /qa/question/:question_id/helpful", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.put("/qa/question/1/helpful").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("PUT request to /qa/question/:question_id/report", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.put("/qa/question/1/report").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("PUT request to /qa/answer/:answer_id/helpful", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.put("/qa/answer/1/helpful").send();
    expect(res.statusCode).toEqual(200);
  });
});

describe("PUT request to /qa/answer/:answer_id/report", () => {
  it("should call the endpoint with status of 200", async () => {
    const res = await request.put("/qa/answer/1/report").send();
    expect(res.statusCode).toEqual(200);
  });
});
