describe('feature/search', () => {
  context('display on desktop', () => {
    beforeEach(() => {
      cy.viewport(1200, 700);
    });
    it('should return homepage', () => {
      cy.visit('http://e-commerce-pum-khoa.vercel.app/');
    });

    it('should toggle search section when click on search icon and close button', () => {
      cy.get('.header__search').click();
      cy.get('.searchBox__close-btn').click();
    });

    it('should list item when fill search text (debounce)', () => {
      cy.get('.header__search').click();
      cy.get('.searchBox__input').click().type('court', { delay: 1000 });
    });

    it('should clear the search input', () => {
      cy.get('.searchBox__clear-btn').click();
    });

    it('should redirect to detail page of specific item when click on', () => {
      cy.get('.searchBox__input').click().type('court');
      cy.get('.searchList__item').first().click();

      cy.url().should('contains', 'detail/');
    });
  });

  context('display on mobile/tablet', () => {
    beforeEach(() => {
      cy.viewport(1000, 700);
    });

    it('should return homepage', () => {
      cy.visit('http://e-commerce-pum-khoa.vercel.app/');
    });

    it('should list item that name equal to search text', () => {
      cy.get('.header__search').click();
      cy.get('.search__input').type('panda', { delay: 600 });
    });

    it('should close the search section when click on outside it then clear input', () => {
      cy.get('.search__overlays').click();
      cy.get('.header__search').click();
    });

    it('should redirect to detail page of specific item when click on', () => {
      cy.get('.search__input').click().type('court');
      cy.get('.searchList__item').first().click();

      cy.url().should('contains', 'detail/');
    });
  });
});
