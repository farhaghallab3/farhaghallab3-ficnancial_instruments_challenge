describe('Exchange Page Tests', () => {
  it('Should load the Exchange Page and display the table', () => {
    cy.visit('http://localhost:3000/exchange');
    cy.contains('Börsen-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit('http://localhost:3000/exchange');
    cy.get('input[placeholder="Nach Name suchen..."]').type('Apple'); // Simulate search
    cy.contains('Apple').should('be.visible'); // Check if filtered data is displayed
  });
});
