describe('Exchange Page Tests', () => {
  it('Should load the Exchange Page and display the table', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.contains('Börsen-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.get('input[placeholder="Nach Name suchen..."]').type('Bitcoin'); // Simulate search
    cy.contains('Bitcoin').should('be.visible'); // Check if filtered data is displayed
  });

  it('Should filter table based on country dropdown', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.get('select').select('Unknown'); // Select a country from the dropdown
    cy.contains('Unknown').should('be.visible'); // Check if country data is displayed
  });
});
