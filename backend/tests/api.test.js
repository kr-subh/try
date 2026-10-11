import express from "express";
import healthRoutes from "../src/routes/healthRoutes.js";
import studentRoutes from "../src/routes/studentRoutes.js";
import { notFound, errorHandler } from "../src/middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/students", studentRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use(notFound);
app.use(errorHandler);

const runTests = async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  let passed = 0;
  let failed = 0;

  const assert = (condition, name) => {
    if (condition) {
      console.log(`PASS: ${name}`);
      passed++;
    } else {
      console.error(`FAIL: ${name}`);
      failed++;
    }
  };

  try {
    const resRoot = await fetch(`${baseUrl}/`);
    const dataRoot = await resRoot.json();
    assert(
      resRoot.status === 200 && dataRoot.message === "Server is running",
      "GET / returns 200"
    );

    const resHealth = await fetch(`${baseUrl}/api/health`);
    const dataHealth = await resHealth.json();
    assert(
      resHealth.status === 200 && dataHealth.status === "OK",
      "GET /api/health returns 200 and OK"
    );

    const resNoAuth = await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "Test" }),
    });
    assert(
      resNoAuth.status === 403,
      "POST /api/students without auth returns 403"
    );

    const resUserRole = await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", role: "user" },
      body: JSON.stringify({ fullName: "Test" }),
    });
    assert(
      resUserRole.status === 403,
      "POST /api/students with user role returns 403"
    );

    const resMissingFields = await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json", role: "admin" },
      body: JSON.stringify({ fullName: "Test" }),
    });
    assert(
      resMissingFields.status === 400,
      "POST /api/students with missing fields returns 400"
    );

    const resPutUser = await fetch(
      `${baseUrl}/api/students/507f1f77bcf86cd799439011`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", role: "user" },
        body: JSON.stringify({ fullName: "Updated" }),
      }
    );
    assert(
      resPutUser.status === 403,
      "PUT /api/students/:id with user role returns 403"
    );

    const resPutInvalidId = await fetch(`${baseUrl}/api/students/invalid-id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", role: "admin" },
      body: JSON.stringify({ fullName: "Updated" }),
    });
    assert(
      resPutInvalidId.status === 400,
      "PUT /api/students/:id with invalid ID returns 400"
    );

    const resDeleteUser = await fetch(
      `${baseUrl}/api/students/507f1f77bcf86cd799439011`,
      {
        method: "DELETE",
        headers: { role: "user" },
      }
    );
    assert(
      resDeleteUser.status === 403,
      "DELETE /api/students/:id with user role returns 403"
    );

    const resDeleteInvalidId = await fetch(
      `${baseUrl}/api/students/invalid-id`,
      {
        method: "DELETE",
        headers: { role: "admin" },
      }
    );
    assert(
      resDeleteInvalidId.status === 400,
      "DELETE /api/students/:id with invalid ID returns 400"
    );

    const resNotFound = await fetch(`${baseUrl}/api/nonexistent-route`);
    assert(resNotFound.status === 404, "Unknown route returns 404");

    console.log(`\nTests finished: ${passed} passed, ${failed} failed`);
    server.close();
    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("Test execution error:", err);
    server.close();
    process.exit(1);
  }
};

runTests();
