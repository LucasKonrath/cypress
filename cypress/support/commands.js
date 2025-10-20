// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to check element visibility with retry
Cypress.Commands.add('shouldBeVisibleWithRetry', (selector, options = {}) => {
  const { timeout = 10000 } = options
  cy.get(selector, { timeout }).should('be.visible')
})

// Custom command to navigate and verify page load
Cypress.Commands.add('visitAndVerify', (path, expectedTitle) => {
  cy.visit(path)
  if (expectedTitle) {
    cy.title().should('include', expectedTitle)
  }
  cy.url().should('include', path)
})