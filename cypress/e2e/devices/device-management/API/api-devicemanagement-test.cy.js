// Dummy API test @team3
/// <reference types="cypress" />

context('Token generate Requests', () => {
	// the URI in the request
	beforeEach(() => {
		cy.request('https://api.opencagedata.com');
	});

	// Manage HTTP requests in your app

	it('cy.request() - make an API request to find Token', () => {
		// https://on.cypress.io/request
		// Method and URI to be specified here along with query and path params
		cy.request(
			'GET',
			'https://api.opencagedata.com/geocode/v1/json?key=feb40b975e23443497eb85290db32c47&q=42.408623'
		).should((response) => {
			expect(response.status).to.eq(200);
			// the server sometimes gets an extra comment posted from another machine
			// which gets returned as 1 extra object
			expect(response.body).to.have.property('total_results');
		});
	});
});
