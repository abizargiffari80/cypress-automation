describe('Login and Checkout Tests', () => {

  const testData = {
    baseUrl: 'https://recruitment-staging-queenbee.paradev.io',
    userCredentials: {
      phoneNumber: '081234567890',
      password: 'Password123',
      verificationCode: '123456'
    },
    promoCode: 'QRP-TEST-123'
  };

  // Handle closing ads by clicking outside
  before(() => {
    cy.visit(testData.baseUrl);
    cy.wait(5000);
    cy.get('body').click(10, 10);  // Click near the top-left corner to close the ad
    cy.wait(5000);  // Wait for 2 seconds to ensure ad is closed before proceeding
  });


  const login = () => {
    cy.get('a[href="/login"]').click();
    cy.get('#page-login__tabs-number__input-number').type(testData.userCredentials.phoneNumber);
    cy.get('#page-login__tabs-email__input-password').type(testData.userCredentials.password);
    cy.get('#page-login__button-login').click();
    cy.get('#page-login__tabs-number__input-verification-code').type(testData.userCredentials.verificationCode);
    cy.url().should('include', '/dashboard');
  };

  // Positive Test Case 1: Successful Login
  it('should successfully login with valid phone number and password', () => {
    login();  // Reuse the login functionality
  });

  // Positive Test Case 2: Apply Promo Code
  it('should apply promo code successfully', () => {
    login();  // Reuse the login functionality

    // Add product to the cart (e.g., Collagen Drink)
    cy.get('button').contains('Add to Cart').click();

    // Go to checkout page
    cy.get('button').contains('Proceed to Checkout').click();

    // Apply promo code
    cy.get('input[name="promo_code"]').type(testData.promoCode);
    cy.get('button').contains('Apply').click();

    // Assert that the promo code is applied correctly
    cy.get('.total').should('contain', 'Discount Applied');
  });

  // Positive Test Case 3: Checkout Process
  it('should complete checkout successfully with valid credentials and promo code', () => {
    login();  // Reuse the login functionality

    // Add product to the cart (e.g., Collagen Drink)
    cy.get('button').contains('Add to Cart').click();

    // Go to checkout page
    cy.get('button').contains('Proceed to Checkout').click();

    // Apply promo code
    cy.get('input[name="promo_code"]').type(testData.promoCode);
    cy.get('button').contains('Apply').click();

    // Complete the checkout process
    cy.get('button').contains('Confirm Order').click();

    // Assert that the order is successfully placed (you can check for a success message or redirection)
    cy.url().should('include', '/order-confirmation');  // Example confirmation page URL
    cy.get('.order-summary').should('contain', 'Order Confirmed');
  });

});
