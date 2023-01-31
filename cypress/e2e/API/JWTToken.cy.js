// API test to genearte the JWT token
/// <reference types="cypress" />

it('cy.request() - Generate the JWT token ', () => {
	// https://on.cypress.io/request
	// Method and URI to be specified here along with query and path params

	cy.request({
		method: 'POST',
		url: Cypress.env('cognito_uri'),
		headers: {
			'X-Amz-Target': Cypress.env('X-Amz-Target'),
			'Content-Type': Cypress.env('Content-Type'),
		},
		body: {
			AuthFlow: Cypress.env('AuthFlow'),
			ClientId: Cypress.env('ClientId'),
			AuthParameters: { USERNAME: Cypress.env('TESTusername'), PASSWORD: Cypress.env('TESTpassword') },
		},
	}).should((response) => {
		expect(response.status).to.eq(200);
		expect(response.body.AuthenticationResult).to.have.property('IdToken');
		expect(response.body.AuthenticationResult).to.have.property('ExpiresIn').to.eq(3600);
		global.token = response.body.AuthenticationResult.IdToken;
		cy.log('Token = ' + token);
	});
});
