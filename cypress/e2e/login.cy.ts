describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login form', () => {
    cy.get('input[id="name"]').should('be.visible');
    cy.get('label[for="age"]').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('should validate name input', () => {
    cy.get('input[id="name"]').type('John');
    cy.get('input[id="name"]').blur();
    cy.contains('Please enter your full name (first and last).').should('be.visible');
  });

  it('should enable button when form is valid', () => {
    cy.get('input[id="name"]').type('John Doe');
    cy.get('label[for="age"]').click();
    cy.get('button').should('be.enabled');
  });

  it('should navigate to places page when form is submitted', () => {
    cy.get('input[id="name"]').type('John Doe');
    cy.get('label[for="age"]').click();
    cy.get('button').click();
    cy.wait(500);
    cy.url().should('include', '/places');
  });

  it('should display user name in navbar after login', () => {
    cy.get('input[id="name"]').type('John Doe');
    cy.get('label[for="age"]').click();
    cy.get('button').click();
    cy.contains('Hi, John').should('be.visible');
  });
});