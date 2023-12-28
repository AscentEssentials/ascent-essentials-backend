import request from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    // Close the MongoDB connection after all tests are done
    await mongoose.connection.close();
  });
});
