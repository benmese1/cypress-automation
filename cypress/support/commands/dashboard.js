//Click on the Dashboard menu
Cypress.Commands.add('dashboardMenu', (menu) => {
	const dashboardMenu = [
		'Dashboard',
		'Asset Map',
		'Asset List',
		'Devices',
		'My Organization',
		'User Management',
		'My Account',
		'Reports',
		'Geofencing',
	];
	cy.get('[data-testid="header"] [role="button"]')
		.click()
		.wait(500)
		.get('[data-testid="side-menu"]')
		.should('be.visible');
	dashboardMenu.forEach((dashboard) => {
		if (menu === dashboard) {
			cy.contains(dashboard).click({ force: true }).wait(100).end();
		} else {
			cy.log('check the selector for dashboard');
		}
	});
});
