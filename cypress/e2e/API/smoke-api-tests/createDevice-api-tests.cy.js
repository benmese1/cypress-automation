// API test for the find all devices by generating JWT on the fly
/// <reference types="cypress" />
describe('find all Devices api tests1', () => {
	let cookieValue;
	let imeiValue;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to find all Devices',
		{
			// Multiple attempts as the API is intermittent to respond at once
			retries: {
				runMode: 2,
				openMode: 2,
			},
		},
		() => {
			function getRandom(length) {
				return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
			}
			// https://on.cypress.io/request
			// Method and URI to be specified here along with query and path params
			// GraphQL query to createDevice

			imeiValue = getRandom(15);
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
			  }		  
		   `;
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
				expect(res.body.data.createDevice).to.have.property('imei');
				expect(res.body.data.createDevice).to.have.property('imei').to.contains(imeiValue);
				expect(res.body.data.createDevice).to.have.property('customer_orgs_id', customer_org_id);
			});
		}
	);
});
