describe('Exchange Page Tests', () => {
  beforeEach(() => {
    // Visit the Exchange page before each test
    cy.visit(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/exchange`);
  });

  it('Should load the Exchange page and display the table', () => {
    // Check page title
    cy.title().should('include', 'Börsen-Daten | Finanzinstrumente Dashboard');

    // Check main heading
    cy.get('h1').contains('Börsen-Daten').should('be.visible');

    // Check if the search input is visible
    cy.get('#search-input').should('exist');

    // Check if the table is rendered
    cy.get('table').should('exist');

    // Check if the "Add New Entry" button is visible
    cy.contains('+').should('be.visible');
  });

  it('Should filter the table based on the search input', () => {
    // Type in the search input
    cy.get('#search-input').type('Apple Inc');

    // Ensure filtered results are displayed
    cy.contains('Apple Inc').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');


    // Clear the search and ensure the table resets
    cy.get('#search-input').clear();
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('Should filter the table based on the country dropdown', () => {
    // Ensure the country filter dropdown is visible
    cy.get('select[aria-label="Filter by country"]').should('exist');

    // Select a country from the dropdown
    cy.get('select[aria-label="Filter by country"]').select('Germany');

    // Ensure the filtered data is displayed
    cy.contains('Germany').should('be.visible');

    // Select "All Countries" to reset the filter
    cy.get('select[aria-label="Filter by country"]').select('All Countries');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('Should open and close the modal for adding a new entry', () => {
    // Click the "Add New Entry" button
    cy.contains('+').click();

    // Ensure the modal is visible
    cy.get('[aria-modal="true"]').should('be.visible');
    cy.get('h2').contains('Neue Börsen-Daten hinzufügen').should('be.visible');

    // Close the modal
    cy.contains('Cancel').click();
    cy.get('[aria-modal="true"]').should('not.exist');
  });

  it('Should add a new entry through the modal', () => {
    // Click the "Add New Entry" button
    cy.contains('+').click();

    // Fill in the modal inputs
    cy.get('input[aria-label="Input for symbol"]').type('TEST_SYMBOL');
    cy.get('input[aria-label="Input for name"]').type('Test Name');
    cy.get('input[aria-label="Input for country"]').type('Test Country');

    // Submit the new entry
    cy.contains('Done').click();

    // Ensure the new entry is added to the table
    cy.contains('TEST_SYMBOL').should('be.visible');
    cy.contains('Test Name').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');
    cy.contains('Test Country').scrollIntoView({ offset: { top: 0, left: 0 } }).should('be.visible');
  });

  it('Should have accessible elements', () => {
    // Ensure the page has an ARIA-compliant search input
    cy.get('input#search-input').should('have.attr', 'aria-label', 'Search through exchange data');

    // Ensure the table headers are present
    cy.get('table thead th').each((header) => {
      cy.wrap(header).should('be.visible');
    });

    // Check for accessible modal
    cy.contains('+').click();
    cy.get('[aria-modal="true"]').should('exist');
    cy.contains('Cancel').click();
  });

  it('Should render unique country options in the dropdown', () => {
    // Check all dropdown options
    cy.get('select[aria-label="Filter by country"] option').then((options) => {
      const countries = [...options].map((o) => o.value);
      const uniqueCountries = [...new Set(countries)];
      expect(countries).to.deep.equal(uniqueCountries);
    });
  });
});
