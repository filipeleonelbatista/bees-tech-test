/// <reference types="cypress" />

Cypress.Commands.add('login', (name: string = 'John Doe') => {
  cy.visit('/');
  cy.get('input[type="text"]').type(name);
  cy.get('input[type="checkbox"]').click();
  cy.get('button').click();
});

Cypress.Commands.add('addBreweryToFavorites', (breweryName: string) => {
  cy.get('input[aria-label="Search brewery"]').type(breweryName);
  cy.get('[data-cy="brewery-card"]').first().within(() => {
    cy.get('button[aria-label="Add"]').click();
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(name?: string): Chainable<void>;
      addBreweryToFavorites(breweryName: string): Chainable<void>;
    }
  }
}

export {};