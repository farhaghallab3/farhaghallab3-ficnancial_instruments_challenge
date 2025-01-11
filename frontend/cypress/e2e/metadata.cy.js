describe('Metadata Page Tests', () => {
  it('Should load the Metadata Page and display the table', () => {
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/metadata`); // Visit the Metadata page
    cy.contains('Metadaten-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/metadata`); // Visit the Metadata page
    cy.get('input[placeholder="Nach Name suchen..."]').type('Apple'); // Simulate search
    cy.contains('Apple').should('be.visible'); // Check if filtered data is displayed
  });

  it('Should filter table based on country dropdown', () => {
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/metadata`); // Visit the Metadata page
    cy.get('select').select('USA'); // Select a country from the dropdown
    cy.contains('USA').should('be.visible'); // Check if country data is displayed
  });
});
