// API test for the find all assets which are non transmitting
/// <reference types="cypress" />
describe('find non transmitting Assets ', () => {
	let cookieValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to find all Assets',
		{
			// Multiple attempts as the API is intermittent to respond at once
			retries: {
				runMode: 0,
				openMode: 0,
			},
		},
		() => {
			// https://on.cypress.io/request
			// Method and URI to be specified here along with query and path params
			// GraphQL query to findAssets

			const query = `
			query MyQuery {
				findAssets(input: {limit: 35000}) {
				  asset_id
				  name
				  category
				  signal
				  added_date
				  added_by
				  updated_date
				  updated_by
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
				expect(res.body.data.findAssets[0]).to.have.property('signal');
				var assets = res.body.data.findAssets;
				cy.log('Total number of Assets = ' + assets.length);
				let transmitters = assets.reduce((a, t) => a + (t.signal === true), 0);
				cy.log('Transmitters = ' + transmitters);
				let nonTransmitters = assets.reduce((a, t) => a + (t.signal !== true), 0);
				cy.log('Non Transmitters = ' + nonTransmitters);
				const passRate = ((nonTransmitters / assets.length) * 100).toFixed(2);
				cy.log('Pass rate = ' + passRate);
				cy.checkWithinLimit(passRate, 10).then((flag) => {
					cy.log(flag);
					cy.then(() => expect(flag).to.be.equal(true));
				});
			});
		}
	);
});
