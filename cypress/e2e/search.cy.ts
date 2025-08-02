describe('Brewery Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[type="text"]').type('John Doe');
    cy.get('input[type="checkbox"]').click();
    cy.get('button').click();
  });

  it('should display search interface', () => {
    cy.get('input[aria-label="Search brewery"]').should('be.visible');
    cy.get('button').contains('Search').should('be.visible');
  });

  it('should search for breweries', () => {
    cy.intercept('GET', '**/breweries/search**', {
      fixture: 'breweries.json'
    }).as('searchBreweries');

    cy.get('input[aria-label="Search brewery"]').type('brewery');
    cy.wait('@searchBreweries');
    
    cy.get('[data-cy="brewery-card"]').should('have.length.gt', 0);
  });

  it('should display brewery information in cards', () => {
    cy.intercept('GET', '**/breweries/search**', {
      body: [{
        id: '1',
        name: 'Test Brewery',
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        brewery_type: 'micro',
        postal_code: '12345',
        phone: '555-0123'
      }]
    }).as('searchBreweries');

    cy.get('input[aria-label="Search brewery"]').type('test');
    cy.wait('@searchBreweries');
    
    cy.contains('Test Brewery').should('be.visible');
    cy.contains('123 Test St').should('be.visible');
    cy.contains('Test City, Test State - Test Country').should('be.visible');
  });

  it('should show message when no results found', () => {
    cy.contains('Search for a brewery to see the results').should('be.visible');
  });
});