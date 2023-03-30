// API test for the update device
/// <reference types="cypress" />
describe('Update device api tests', () => {
	let cookieValue;
	let imeiValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to update device',
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
			// GraphQL query to updateDevice

			const query = `
				mutation MyMutation {
					updateDevice(device: {_id: "6408de74f8d2e629cf6ece53", prd_cde: "Auto Product Code", device_type: "Auto Device Test", order_num: "Auto101"}) {
					  imei
					  assets_id
					  asset_name
					  dev_id
					  prd_cde
					  device_type
					  status
					  order_num
					  org_name
					  _id
					}
				  }`;
			cy.log('GraphQL body is as follows = ' + query);
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
				expect(res.body.data.updateDevice).to.have.property('imei');
				expect(res.body.data.updateDevice).to.have.property('prd_cde').to.contains('Auto Product Code');
				expect(res.body.data.updateDevice).to.have.property('device_type', 'Auto Device Test');
				expect(res.body.data.updateDevice).to.have.property('order_num', 'Auto101');
			});
		}
	);
});
