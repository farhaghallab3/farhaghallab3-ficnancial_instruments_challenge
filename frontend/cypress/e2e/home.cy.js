describe('Home Page Tests', () => {
  it('Should load the Home Page and display the header and buttons', () => {
    cy.visit('http://localhost:3000'); // Visit the Home Page
    cy.contains('Dashboard für Finanzinstrumente').should('be.visible'); // Check header

    // Check if buttons are visible and have the correct labels
    cy.contains('Börsen-Daten anzeigen').should('be.visible');
    cy.contains('Metadaten-Daten anzeigen').should('be.visible');
    cy.contains('Candle-Daten anzeigen').should('be.visible');
  });

  it('Should navigate to the Exchange page when the button is clicked', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Börsen-Daten anzeigen').click();
    cy.url().should('include', '/exchange'); // Ensure navigation works
    cy.contains('Börsen-Daten').should('be.visible'); // Check Exchange page content
  });

  it('Should navigate to the Metadata page when the button is clicked', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Metadaten-Daten anzeigen').click();
    cy.url().should('include', '/metadata');
    cy.contains('Metadaten-Daten').should('be.visible');
  });

  it('Should navigate to the Candles page when the button is clicked', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Candle-Daten anzeigen').click();
    cy.url().should('include', '/candles');
    cy.contains('Candle-Daten').should('be.visible');
  });

  it('Should open the menu about the website', () => {
    cy.visit('http://localhost:3000');
    cy.contains('☰').click(); // Open the menu
    cy.contains('Über diese Website').should('be.visible'); // Check menu content
    cy.contains('schließen').click(); // Close the modal
    cy.contains('Dashboard für Finanzinstrumente').should('be.visible'); // Ensure the home page is still visible
  });

  it('Should display the background animations', () => {
    cy.visit('http://localhost:3000');

    // Ensure at least one of the background icons is rendered
    cy.get('.bg-bitcoin').should('exist'); // Check for Bitcoin icon
    cy.get('.bg-coin').should('exist'); // Check for Coin icon
    cy.get('.bg-ethereum').should('exist'); // Check for Ethereum icon

    // Ensure animations are applied
    cy.get('.animate-fall').should('have.css', 'animation-name', 'fall'); // Check animation class
  });
});
