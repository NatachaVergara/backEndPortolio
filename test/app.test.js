const app = require("../app");
const request = require("supertest");

describe("GET /precios", () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/precios").send();
    expect(response.status).toBe(200);
  });
});
