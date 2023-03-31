// API test for the create asset by generating JWT on the fly
/// <reference types="cypress" />
describe('Create asset api tests', () => {
	let cookieValue;
	let assetid;
	beforeEach(() => {
		cy.generateAPIToken();
		cy.getCookie('apitoken').then((cookie) => {
			cookieValue = cookie.value;
		});
	});
	it(
		'Send an API request to create asset',
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

			cy.generateRandomNumber(6).then((value) => {
				assetid = value;
				let vin = assetid * 10;

				let org_name = "Andrew's Comp";
				let customer_org_id = '641090500abc0c33c11b10c7';
				const query = `
				mutation MyMutation {
					createAsset(asset: {asset_id: "${assetid}", category: "Trailer", city: "New York", vin: "${vin}", name: "autoTestAsset", customer_orgs_id: "${customer_org_id}"}) {
					  _id
					  city
					  name
					  category
					  vin
					  asset_id
					  customer_orgs_id
					}
				  }`;
				cy.log('GraphQL body is as follows = ' + query);
				cy.log('Asset Id is = ' + assetid);
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
					expect(res.body.data.createAsset).to.have.property('asset_id');
					expect(res.body.data.createAsset).to.have.property('asset_id').to.contains(assetid);
					expect(res.body.data.createAsset).to.have.property('customer_orgs_id', customer_org_id);
					expect(res.body.data.createAsset).to.have.property('_id');
					global.autoAssetID = res.body.data.createAsset._id;
					cy.log('New ID = ' + autoAssetID);
				});
			});
		}
	);
	it(
		'Send an API request to delete asset',
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

			const query = `
				mutation MyMutation { 
					deleteAsset(_id: "${autoAssetID}") {
					   _id
						city
						name
						category
						vin
						asset_id
						customer_orgs_id
					}
				  }`;
			cy.log('GraphQL body is as follows = ' + query);
			cy.log('Asset Id is = ' + assetid);
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
				expect(res.body.data.deleteAsset).to.have.property('asset_id');
				expect(res.body.data.deleteAsset).to.have.property('_id').to.contains(autoAssetID);
			});
		}
	);
});
