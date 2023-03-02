Cypress.Commands.add('mapWait', () => {
	cy.intercept('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js')
		.as('map')
		.wait('@map');
});

/** Set location on Asset Map page
 * @param {string} location - searched location value
 * @param {boolean} isSubmit - type enter if true, default is true
 */
Cypress.Commands.add('searchLocation', (location, isSubmit) => {
	if (typeof isSubmit === 'undefined') {
		isSubmit = true;
	}
	cy.get('[data-testid="location-button"]').click({ force: true });
	cy.wait(1000);
	if (isSubmit) {
		cy.get('[data-testid="filter-bar-location-selector-wrapper"] button').type(
			location + '{enter}',
			{ delay: 100 },
			{ force: true }
		);
		// the map animation when you change location can take up to 6 seconds zooming out from one location
		// and zooming in to another. This wait ensures the zoom is complete before other actions are taken.
		cy.wait(6000);
	} else {
		cy.get('[data-testid="filter-bar-location-selector-wrapper"] button').type(
			location,
			{ delay: 100 },
			{ force: true }
		);
	}
});

/** Expand section with specific name on Drawer
 *  @param {string} sectionName - section's name to expand
 */
Cypress.Commands.add('expandDrawerSection', (sectionName) => {
	cy.contains('[role="button"]', sectionName).then(($section) => {
		cy.wrap($section)
			.invoke('attr', 'aria-expanded')
			.then(($is_expanded) => {
				if ($is_expanded === 'false') {
					$section.click();
				}
			});
	});
});
