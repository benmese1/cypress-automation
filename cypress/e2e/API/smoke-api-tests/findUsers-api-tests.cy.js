// API test for the find all Users by generating JWT on the fly
/// <reference types="cypress" />
describe('find all Users api tests1', () => {
	let cookieValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to find all Users',
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
			// GraphQL query to findUsers
			const query = `
		query MyQuery {
			findUsers {
			  sub
			  firstName
			  lastName
			  phoneNumber
			  active
			  status
			  last_login_date
			  added_date
			  updated_date
			  added_by
			  updated_by
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
				expect(res.body.data.findUsers[0]).to.have.property('firstName');
				cy.log(res.body);
			});
		}
	);
});
