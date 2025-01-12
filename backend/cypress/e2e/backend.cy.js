describe("Backend API Endpoints", () => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""; // Replace with your backend URL if it's different
  
    it("GET /api/exchange - Should return exchange data", () => {
      cy.request(`${baseUrl}/api/exchange`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
  
    it("GET /api/metadata - Should return metadata data", () => {
      cy.request(`${baseUrl}/api/metadata`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
  
    it("GET /api/candle - Should return candle data", () => {
      cy.request(`${baseUrl}/api/candle`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.hits).to.exist; // Ensure 'hits' is present
        expect(response.body.hits.hits.length).to.be.greaterThan(0); // Ensure there is data
      });
    });
     
  });
  