describe('Candles Page Tests', () => {
  beforeEach(() => {
    // Visit the Candles page before each test
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/candle`);
  });

  it('Should load the Candles page and display the chart', () => {
    // Check if the page title and heading are correct
    cy.title().should('include', 'Candle Data | Financial Dashboard');
    cy.get('h1').contains('Candle-Daten').should('be.visible');

    // Ensure the symbol selector dropdown exists
    cy.get('select').should('be.visible');

    // Check if the chart container is rendered
    cy.get('canvas').should('exist');
  });

  it('Should allow selecting a symbol from the dropdown and update the chart', () => {
    // Select a symbol from the dropdown
    cy.get('select').select('PL.COMM');
    cy.get('canvas').should('exist');
  });

  it('Should update the chart when selecting a different symbol', () => {
    // Select a different symbol from the dropdown
    cy.get('select').select('BGH.US');
    cy.get('canvas').should('exist');


    cy.get('select').select('BGH.US');
    cy.get('canvas').should('exist');
  });

  it('Should have accessible elements', () => {
    // Check if the chart has ARIA attributes for accessibility
    cy.get('div[role="img"]').should('exist'); // Ensure the chart has a role of img
    cy.get('h2#chart-title').should('contain', 'End Prices Chart'); // Chart title
    cy.get('p#chart-desc').should(
      'contain',
      'A line chart displaying the end prices of selected financial symbols over time.'
    ); // Chart description
  });

  it('Should render a dropdown with unique symbols', () => {
    // Get all the options in the dropdown
    cy.get('select option').then((options) => {
      const symbols = [...options].map((option) => option.value);
      const uniqueSymbols = [...new Set(symbols)]; // Check for uniqueness
      expect(symbols).to.deep.equal(uniqueSymbols); // Ensure dropdown contains unique values
    });
  });
});
