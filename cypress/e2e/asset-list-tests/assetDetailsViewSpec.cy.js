const { log } = require("console");



describe('Asset Management page -- details view verification', () => {


	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('Verify Asset Details View is collapsable', () => {
		elements.usernameDropDown.click()
		clickFirstRow();
		cy.get('#details-summary').should('be.visible');
		cy.get('#battery-block').should('exist');

		cy.clickOutside();
		cy.get('#details-summary').should('not.exist');
		cy.get('#battery-block').should('not.exist');
	});

	it('Verify Critical battery state on Asset Details View', () => {
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.1');
		cy.clickOutside();

		//verify each 'Battery Icon' cells have appropriate icon
		verifyBatteryIconsInAssetList('[data-testid = "battery-svg-critical"]');

		clickFirstRow();

		expandDetailsSection();

		verifyBatteryIconIsDisplayed('[data-testid = "battery-svg-critical"]');

		//verify 'Battery Voltage' value
		cy.get('[data-testid="asset-details-drawer-details-battery-voltage"]').then(($val) => {
			expect(parseFloat($val.text())).to.be.lessThan(3.2)
		});
	});

	it('Verify Alert battery state on Asset Details View', () => {
		
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.3');
		cy.clickOutside();

		//verify each 'Battery Icon' cells have appropriate icon
		verifyBatteryIconsInAssetList('[data-testid = "battery-svg-alert"]');

		clickFirstRow();

		expandDetailsSection();

		verifyBatteryIconIsDisplayed('[data-testid = "battery-svg-alert"]');

		//verify 'Battery Voltage' value
		cy.get('[data-testid="asset-details-drawer-details-battery-voltage"]').then(($val) => {
			expect(parseFloat($val.text())).to.be.greaterThan(3.21).lessThan(3.4)
		});
	});

	it('Verify Warning battery state on Asset Details View', () => {

		cy.addAssetsFilter('Battery Icon', 'starts with', '3.5');
		cy.clickOutside();

		//verify each 'Battery Icon' cells have appropriate icon
		verifyBatteryIconsInAssetList('[data-testid = "battery-svg-warning"]');

		clickFirstRow();

		expandDetailsSection();

		verifyBatteryIconIsDisplayed('[data-testid = "battery-svg-warning"]');

		//verify 'Battery Voltage' value
		cy.get('[data-testid="asset-details-drawer-details-battery-voltage"]').then(($val) => {
			expect(parseFloat($val.text())).to.be.greaterThan(3.41).lessThan(3.6)
		});
	});


	it('Verify Full battery state on Asset Details View', () => {
	
		cy.addAssetsFilter('Battery Icon', 'starts with', '3.9');
		cy.clickOutside();

		//verify each 'Battery Icon' cells have appropriate icon
		verifyBatteryIconsInAssetList('[data-testid = "battery-svg-full"]');

		clickFirstRow();

		expandDetailsSection();

		verifyBatteryIconIsDisplayed('[data-testid = "battery-svg-full"]');

		//verify 'Battery Voltage' value
		cy.get('[data-testid="asset-details-drawer-details-battery-voltage"]').then(($val) => {
			expect(parseFloat($val.text())).to.be.greaterThan(3.61)
		});
	});
 });

const verifyBatteryIconsInAssetList = (expectedBatteryLocator) => {
	cy.xpath("//*[@role='cell'][count(//*[@data-testid='column-header-battery-icon']//ancestor::*[@role='columnheader']/preceding-sibling::*) + 1]")
	.each(($item) => {
		cy.wrap($item).find(expectedBatteryLocator).should('be.visible');
	});
};

const verifyBatteryIconIsDisplayed = (expectedBatteryLocator) => {
	cy.get(`#details-content ${expectedBatteryLocator}`).should('exist');
};

const expandDetailsSection = () => {
	if(cy.get('#details').then(($section) => { 
		cy.wrap($section)
				.invoke('attr', 'aria-expanded')
				.then(($is_expanded) => {
					if($is_expanded === 'false') {
						$section.click()	
					}
				})
		}));
};

const clickFirstRow = () => {
	cy.get('[role="grid"] [data-rowindex="0"]').click();
};
