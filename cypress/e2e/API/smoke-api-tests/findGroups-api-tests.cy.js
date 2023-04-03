// API test for the find all groups by generating JWT on the fly
/// <reference types="cypress" />
describe('find all groups api tests', () => {
	let cookieValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to find all groups',
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
			// GraphQL query to findGroups
			const query = `
		query MyQuery {
			findGroups {
			  groupName
			  description
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
				expect(res.body.data.findGroups[0]).to.have.property('groupName');
				cy.log(res.body);
			});
		}
	);
});
