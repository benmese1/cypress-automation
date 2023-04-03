Cypress.Commands.add('syncTimeWithServer', () => {
	cy.request('GET', '/api/time').then((response) => {
		const serverTime = response.body.time;
		cy.clock(serverTime);
	});
});
