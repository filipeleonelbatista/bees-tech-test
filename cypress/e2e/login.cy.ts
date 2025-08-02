describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login form', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="checkbox"]').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should validate name input', () => {
    cy.get('input[type="text"]').type('John');
    cy.get('input[type="text"]').blur();
    cy.contains('Please enter your full name (first and last).').should('be.visible');
  });

  it('should enable button when form is valid', () => {
    cy.get('input[type="text"]').type('John Doe');
    cy.get('input[type="checkbox"]').click();
    cy.get('button').should('be.enabled');
  });

  it('should navigate to places page when form is submitted', () => {
    cy.get('input[type="text"]').type('John Doe');
    cy.get('input[type="checkbox"]').click();
    cy.get('button').click();
    cy.url().should('include', '/places');
  });

  it('should display user name in navbar after login', () => {
    cy.get('input[type="text"]').type('John Doe');
    cy.get('input[type="checkbox"]').click();
    cy.get('button').click();
    cy.contains('Hi, John').should('be.visible');
  });
});