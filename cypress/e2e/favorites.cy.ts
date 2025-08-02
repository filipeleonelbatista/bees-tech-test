describe('Favorites Management', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[type="text"]').type('John Doe');
    cy.get('input[type="checkbox"]').click();
    cy.get('button').click();
  });

  it('should add brewery to favorites', () => {
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
    
    cy.get('[data-cy="brewery-card"]').first().within(() => {
      cy.get('button[aria-label="Add"]').click();
    });
    
    cy.get('[data-cy="favorites-section"]').within(() => {
      cy.contains('Test Brewery').should('be.visible');
    });
  });

  it('should remove brewery from favorites', () => {
    // First add a brewery to favorites
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
    
    cy.get('[data-cy="brewery-card"]').first().within(() => {
      cy.get('button[aria-label="Add"]').click();
    });
    
    cy.get('[data-cy="favorites-section"]').within(() => {
      cy.get('button[aria-label="Remove"]').click();
      cy.contains('Test Brewery').should('not.exist');
    });
  });

  it('should persist favorites during session', () => {
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
    
    cy.get('[data-cy="brewery-card"]').first().within(() => {
      cy.get('button[aria-label="Add"]').click();
    });
    
    cy.reload();
    
    cy.get('[data-cy="favorites-section"]').within(() => {
      cy.contains('Test Brewery').should('be.visible');
    });
  });
});