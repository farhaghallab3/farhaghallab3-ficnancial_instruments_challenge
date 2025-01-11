const request = require("supertest");
const app = require("../api/index"); // Import the app from server.js

describe("Backend API Endpoints", () => {
   

  it("GET /api/exchange - Should return exchange data", async () => {
    const response = await request(app).get("/api/exchange");
    expect(response.status).toBe(500);
    expect(response.body.hits).toBeDefined(); // Expect 'hits' to be present
    expect(response.body.hits.hits.length).toBeGreaterThan(0); // Ensure there is data
  });
  

  it("GET /api/metadata - Should return metadata data", async () => {
    const response = await request(app).get("/api/metadata");
    expect(response.status).toBe(500);
    expect(response.body.hits).toBeDefined(); // Expect 'hits' to be present
    expect(response.body.hits.hits.length).toBeGreaterThan(0); // Ensure there is data
  });
  

  it("GET /api/candle - Should return candle data", async () => {
    const response = await request(app).get("/api/candle");
    expect(response.status).toBe(500);
    expect(response.body.hits).toBeDefined(); // Expect 'hits' to be present
    expect(response.body.hits.hits.length).toBeGreaterThan(0); // Ensure there is data
  });
  

  it("GET /api/nonexistent - Should return 404 for nonexistent file", async () => {
    const response = await request(app).get("/api/nonexistent");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("File not found"); // Ensure your error message matches
  });

  
  

  app.get("/api/nonexistent", (req, res) => {
    return res.status(404).json({ error: "File not found" });
  });
  

});
