describe('Candles Page Tests', () => {
  it('Should load the Candles Page and display the table', () => {
    cy.visit('http://localhost:3000/candles');
    cy.contains('Candle-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit('http://localhost:3000/candles');
    cy.get('input[placeholder="Nach Symbol suchen..."]').type('BTC'); // Simulate search
    cy.contains('BTC').should('be.visible'); // Check if filtered data is displayed
  });
});
