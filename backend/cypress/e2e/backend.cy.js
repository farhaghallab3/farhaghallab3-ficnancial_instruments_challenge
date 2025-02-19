describe("Backend API Endpoints", () => {
  const PORT = process.env.PORT || 3001;// Replace with your backend URL if it's different
  
    it("GET /api/exchange - Should return exchange data", () => {
      cy.request(`${PORT}/api/exchange`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
  
    it("GET /api/metadata - Should return metadata data", () => {
      cy.request(`${PORT}/api/metadata`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
  
    it("GET /api/candle - Should return candle data", () => {
      cy.request(`${PORT}/api/candle`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
     
  });
  