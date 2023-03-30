// API test for the find all Organizations by generating JWT on the fly
/// <reference types="cypress" />
describe('find all Organizations api tests', () => {
	let cookieValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to find all Organizations',
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
			// GraphQL query to findOrganizations
			const query = `
		 query MyQuery {
			findOrgs {
			  name
			  description
			  brand
			  org_key
			  type
			  asset_count
			  device_count
			  time_zones
			  distance_unit_preference
			  added_date
			  updated_date
			  added_by
			  updated_by
			  account_number
			  parent_org_id
			}
		  }`;

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
				expect(res.body.data.findOrgs[0]).to.have.property('name');
				cy.log(res.body);
			});
		}
	);
});
