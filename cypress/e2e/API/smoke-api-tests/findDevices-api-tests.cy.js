// API test for the find all devices by generating JWT on the fly
/// <reference types="cypress" />
describe('find all Devices api tests1', () => {
	let cookieValue;
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
			// https://on.cypress.io/request
			// Method and URI to be specified here along with query and path params
			// GraphQL query to findDevices
			const query = `
		query MyQuery {
			findDevices {
			imei
			assets_id
			asset_name
			dev_id
			added_dt
			added_date
			updated_date
			added_by
			prd_cde
			serial_num
			device_type
			carrier
			box_id
			terminated
			status
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
				expect(res.body.data.findDevices[0]).to.have.property('imei');
				cy.log(res.body);
			});
		}
	);
});
