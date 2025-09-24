// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  if (err.message.includes('Network Error')) {
    return false;  // Ignore the network error and continue the test
  }
  // Allow other uncaught exceptions to fail the test
  return true;
});
