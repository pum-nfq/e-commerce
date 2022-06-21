describe('empty spec', () => {
  it('Click on an element', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('focus').click();

    cy.url().should('include', '/commands/actions');

    // cy.url().should('include', '/commands/actions');

    cy.url().should('equal', 'https://example.cypress.io/commands/actions');

    cy.get('#email1')
      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com');
  });
});
