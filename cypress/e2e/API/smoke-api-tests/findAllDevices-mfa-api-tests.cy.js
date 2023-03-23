// API test for the find all devices by generating JWT on the fly : QA with MFA code
/// <reference types="cypress" />
import * as otplib from 'otplib';

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
		cy.request({
			method: 'POST',
			url: Cypress.env('cognito_uri'),
			headers: {
				'X-Amz-Target': Cypress.env('X-Amz-Target'),
				'Content-Type': Cypress.env('Content-Type'),
			},
			body: {
				AuthFlow: Cypress.env('AuthFlow'),
				ClientId: Cypress.env('ClientId'),
				AuthParameters: { USERNAME: Cypress.env('TESTusernameAPI'), PASSWORD: Cypress.env('TESTpasswordAPI') },
			},
		}).should((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('Session');
			global.Session = response.body.Session;
			cy.log('Session ID  = ' + global.Session);
		});

		const secret = Cypress.env('TESTMFAAPI');
		const code = otplib.authenticator.generate(secret);
		cy.log('MFA Code  = ' + code);

		cy.request({
			method: 'POST',
			url: Cypress.env('cognito_uri'),
			headers: {
				'X-Amz-Target': Cypress.env('X-Amz-Target-Auth'),
				'Content-Type': Cypress.env('Content-Type-Auth'),
			},
			body: {
				ChallengeName: Cypress.env('ChallengeName'),
				ChallengeResponses: {
					USERNAME: Cypress.env('TESTusernameAPI'),
					SOFTWARE_TOKEN_MFA_CODE: code,
				},
				Session: global.Session,
				ClientId: Cypress.env('ClientId'),
				UserPoolId: Cypress.env('UserPoolId'),
			},
		}).should((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.AuthenticationResult).to.have.property('IdToken');
			expect(response.body.AuthenticationResult).to.have.property('ExpiresIn').to.eq(3600);
			// Token is stored and will be consumed in graphQL API call
			global.token = response.body.AuthenticationResult.IdToken;
			cy.log('Token = ' + token);
		});

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
				Authorization: global.token,
				'Content-Type': 'application/json',
			},
			body: { query },
		}).then((res) => {
			expect(res.status).to.eq(200);
			expect(res.body.data.findDevices[0]).to.have.property('imei');
			// hardcoded for now , in Integration we can compare from UI
			// expect(res.body.data.findDevices[0]).to.have.property('assets_id').to.eq('63a7cf09c45bfb7ace184f45');
			cy.log(res.body);
		});
	}
);
