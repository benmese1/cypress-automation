describe('Location search tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false }).waitForLoad();
	});

	it('Location selector component is integrated to dashboard', () => {
		cy.get('[data-testid="location-selector-input"] input').should('be.visible');
	});

	it('Location search autocomplete test', () => {
		cy.get('[data-testid="location-selector-input"] input')
			.type('chic')
			.get('.MuiAutocomplete-popper li span')
			.each((el) => {
				expect(el.text().toLowerCase().startsWith('chic')).to.be.true;
			});
	});

	it('No suggestions for less than two chars test', () => {
		cy.get('[data-testid="location-selector-input"] input')
			.type('at')
			.get('.MuiAutocomplete-popper li span')
			.should('not.be.visible');
	});

	it('Get suggestions for less than two chars from recent search and remove from recent test', () => {
		//search 'atlant'
		cy.get('[data-testid="location-selector-input"] input')
			.type('atlant')
			.get('.MuiAutocomplete-popper li span')
			//select first result from autosuggestions list
			.first()
			.click()
			.url()
			//verify map page loaded
			.should('contain', '/map')
			.waitForLoad()
			//back to dashboard page
			.dashboardMenu('Dashboard')
			.waitForLoad()
			//search by two chars
			.get('[data-testid="location-selector-input"] input')
			.type('at')
			.get('.MuiAutocomplete-popper li span')
			.first()
			.should('contain', 'Atlanta, Georgia, USA')
			//verify that user can see remove button in recent search
			.get('.MuiAutocomplete-popper li button')
			.should('be.visible')
			.click()
			//verify that no any suggestions displayed
			.get('.MuiAutocomplete-popper')
			.should('not.be.visible');
	});
});
