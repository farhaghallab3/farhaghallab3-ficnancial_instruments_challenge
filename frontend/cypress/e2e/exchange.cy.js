Cypress.Commands.add('disableOverflow', () => {
  cy.get('body').then((body) => {
    body.css('overflow', 'visible'); // Disable overflow clipping
  });
});


describe('Exchange Page Tests', () => {
  it('Should load the Exchange Page and display the table', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.contains('Börsen-Daten').should('be.visible'); // Check header
    cy.get('table').should('be.visible'); // Ensure table is rendered
  });

  it('Should filter the table based on search input', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.disableOverflow();
    cy.get('input[placeholder="Nach Name suchen..."]').type('Tesla Inc'); // Simulate search
    //cy.contains('Tesla Inc',{timeout: 10000}).should('be.visible', {force: true}); // Check if filtered data is displayed
    cy.contains('Tesla Inc').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');

  });

  it('Should open the Add New Entry modal', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.get('button').contains('+').click(); // Click the Add New Entry button
    cy.contains('Neue Börsen-Daten hinzufügen').should('be.visible'); // Ensure the modal is visible
  });

  it('Should add a new entry to the table', () => {
    cy.visit('http://localhost:3000/exchange'); // Visit the Exchange page
    cy.get('button').contains('+').click(); // Open the Add New Entry modal

    // Fill in the form fields
    cy.get('input[name="_id"]').type('TEST-ID');
    cy.get('input[name="_source.symbol"]').type('TEST-SYMBOL');
    cy.get('input[name="_source.name"]').type('Test Name');
    cy.get('input[name="_source.country"]').type('Test Country');

    // Submit the form
    cy.contains('Done').click();

    // Verify the new data is added to the table
    cy.contains('TEST-ID').should('be.visible');
    cy.contains('TEST-SYMBOL').should('be.visible');
   // cy.contains('Test Name').should('be.visible');
   // cy.contains('Test Country').should('be.visible');
    cy.contains('Test Name').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');
    cy.contains('Test Country').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');
  });
});
