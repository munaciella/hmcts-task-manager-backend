const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeAll(async () => {
  await db.query(`DELETE FROM tasks`);
});

afterAll(async () => {
  await db.end();
});

describe("Task Routes", () => {
  let taskId;

  test("POST /tasks should create a task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "This is a test",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
    taskId = res.body.id;
  });

  test("POST /tasks should return 400 for missing description", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Test Task",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Description is required");
  });

  test("POST /tasks should return 400 for missing title", async () => {
    const res = await request(app).post("/tasks").send({
      description: "This is a test",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Title is required");
  });

  test("GET /tasks should return an array of tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /tasks/:id should return the task", async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test("GET /tasks/:id should return 404 for non-existing task", async () => {
    const res = await request(app).get("/tasks/99999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Task not found");
  });

  test("PATCH /tasks/:id should update the task status", async () => {
    const res = await request(app)
      .patch(`/tasks/${taskId}`)
      .send({ status: "in-progress" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("in-progress");
  });

  test("PATCH /tasks/:id should return 404 for non-existing task", async () => {
    const res = await request(app)
      .patch("/tasks/99999")
      .send({ status: "done" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Task not found");
  });

  test("DELETE /tasks/:id should delete the task", async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /tasks/:id should return 404 for non-existing task", async () => {
    const res = await request(app).delete("/tasks/99999");
    expect(res.statusCode).toBe(404);
  });
});
