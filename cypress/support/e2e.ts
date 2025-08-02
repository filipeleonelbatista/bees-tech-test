import './commands';

Cypress.on('window:before:load', (win) => {
  // @ts-ignore // Disable service workers
  delete win.navigator.serviceWorker;
});