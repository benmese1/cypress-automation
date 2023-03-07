import * as otplib from 'otplib';

describe('Login with github credentials', () => {
	it('Get SMS and apply it in 2FA form', () => {
		cy.syncTimeWithServer();
		const secret = 'WADBH2VMMY3LSSTDXQNCHRTX5K3PES4FX4KRY57KIKQLFLR7LZVQ';
		const code = otplib.authenticator.generate(secret);
		cy.visit('/login');

		cy.get('.visible-lg #signInFormUsername').type('mfa', { force: true });
		cy.get('.visible-lg #signInFormPassword').type('Tester123@', { force: true });
		cy.get('.visible-lg .btn-primary').realClick({ force: true });
		cy.get('input[id=totpCodeInput]').realType(code);
		cy.get('#signInButton').realClick();
		cy.get("[aria-label='account of current user']").should('be.visible');
		cy.get('[data-testid="selector"] [role="button"]').realClick().wait(500);
		cy.get('[data-testid="global-search-select-item-Assets"]').click();
		cy.get('[data-testid="selector-input"] input').invoke('attr', 'placeholder').should('equal', 'Find an Asset');
	});
});
