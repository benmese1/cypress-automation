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
		'Send an API request to create device',
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
			// GraphQL query to createDevice

			cy.generateRandomNumber(15).then((value) => {
				imeiValue = value;

				let org_name = "Andrew's Comp";
				let customer_org_id = '641090500abc0c33c11b10c7';
				const query = `
				mutation MyMutation {
					createDevice(device: {imei:  "${imeiValue}" , org_name: "${org_name}", customer_orgs_id: "${customer_org_id}"}) {
					imei
					assets_id
					asset_name
					dev_id
					added_dt
					added_date
					updated_date
					customer_orgs_id
					}
				}`;
				cy.log('GraphQL body is as follows = ' + query);
				cy.log('IMEI value is = ' + imeiValue);
				cy.log('Value  generated is = ' + value);
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
					expect(res.body.data.createDevice).to.have.property('imei');
					expect(res.body.data.createDevice).to.have.property('imei').to.contains(imeiValue);
					expect(res.body.data.createDevice).to.have.property('customer_orgs_id', customer_org_id);
				});
			});
		}
	);
});
