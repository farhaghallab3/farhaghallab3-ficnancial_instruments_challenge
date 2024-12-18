describe('Metadata Page Tests', () => {
  it('Should load the Metadata Page and display the table', () => {
    cy.visit('http://localhost:3000/metadata');
    cy.contains('Metadaten-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit('http://localhost:3000/metadata');
    cy.get('input[placeholder="Nach Name suchen..."]').type('Apple Inc'); // Simulate search
    cy.contains('Apple Inc').should('be.visible'); // Check if filtered data is displayed
  });
});
