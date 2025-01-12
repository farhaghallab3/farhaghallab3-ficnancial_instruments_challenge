describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}`);
    cy.contains('Financial Instruments Dashboard').should('be.visible');
  });
});
