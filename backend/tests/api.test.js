const request = require('supertest');
const app = require('../api/server'); // Import your server

describe('Backend API Endpoints', () => {
  it('GET /api/exchange - Should return exchange data', async () => {
    const response = await request(app).get('/api/exchange');
    expect(response.status).toBe(200);
    expect(response.body.hits).toBeDefined();
    expect(response.body.hits.hits.length).toBeGreaterThan(0);
  });

  it('GET /api/metadata - Should return metadata data', async () => {
    const response = await request(app).get('/api/metadata');
    expect(response.status).toBe(200);
    expect(response.body.hits).toBeDefined();
    expect(response.body.hits.hits.length).toBeGreaterThan(0);
  });

  it('GET /api/candle - Should return candle data', async () => {
    const response = await request(app).get('/api/candle');
    expect(response.status).toBe(200);
    expect(response.body.hits).toBeDefined();
    expect(response.body.hits.hits.length).toBeGreaterThan(0);
  });

  it('GET /api/nonexistent - Should return 404 for nonexistent file', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('File not found');
  });
}); 
