describe('feature/checkoutPage', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should return homepage', () => {
    cy.visit('http://e-commerce-pum-khoa.vercel.app/product');
    cy.get('.product-card__link').first().click();
    cy.get(
      '.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-in-form-item',
    )
      .first()
      .click();

    cy.get('.ant-input-number-handler.ant-input-number-handler-up')
      .first()
      .click();

    cy.get(
      '.ant-btn.ant-btn-primary.ant-btn-lg.ant-btn-block.detail-product__content__order__buy-now',
    ).click();
  });

  it('should navigate to navbar when click on cart item', () => {
    cy.get('.header__cart').click();
    cy.url().should('contains', '/cart');
  });

  it('should increase quantity of item in cart list when click on', () => {
    cy.get('.ant-input-number-handler.ant-input-number-handler-up')
      .first()
      .click();
    cy.get('.ant-input-number-input').should('have.value', 3);
  });

  it('should display alert message when required inputs are empty ', () => {
    cy.get('.ant-btn.ant-btn-primary').click();
    cy.get('.header__wrapper');
  });

  it('should display success message and clear the cart when required inputs are filled', () => {
    cy.get('#nest-messages_user_name').type('Duy Vo');
    cy.get('#nest-messages_phone').type('0123456901');
    cy.get('#nest-messages_user_email').type('duy.vo@nfq.asia');
    cy.get('#nest-messages_user_address').type('Resort Victoria Can Tho', {
      delay: 200,
    });
    cy.get('.ant-btn.ant-btn-primary').click({ multiple: true });
    cy.get('.header__wrapper');
  });
});
