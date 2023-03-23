// API test for the find all assets by generating JWT on the fly : Dev only
/// <reference types="cypress" />
describe('find all Assets api tests1', () => {
	let cookieValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then(cookie => {
			cookieValue = cookie.value
		})
	});
	it(
		'Send an API request to find all Assets',
		{
			// Multiple attempts as the API is intermittent to respond at once
			retries: {
				runMode: 2,
				openMode: 2,
			},
		},
		() => {
			// https://on.cypress.io/request
			// Method and URI to be specified here along with query and path params
			// GraphQL query to findAssets
			const query = `
		query MyQuery {
			findAssets {
			   asset_id
			   name
			   category
			   added_date
			 }
		   }
		   `;
			cy.request({
				method: 'POST',
				url: Cypress.env('graphQL_uri'),
				headers: {
					Authorization: cookieValue,
					'Content-Type': 'application/json',
				},
				body: { query },
			}).then((res) => {
				expect(res.status).to.eq(200);
				expect(res.body.data.findAssets[0]).to.have.property('name');
				cy.log(res.body);
			});
		});
});