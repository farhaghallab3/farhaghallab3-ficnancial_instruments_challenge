describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Financial Instruments Dashboard').should('be.visible');
  });
});
