// @team2
const dayjs = require('dayjs');

describe('Asset Battery Chart View Verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset List');
		cy.viewport(1280, 1024);
	});

	it('Verify Battery Chart is Displayed', () => {
		cy.searchAssets('377716');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		//verify default values of Start Date, End Date fields
		cy.get("[role='region']").eq(2).find('input').first().should('have.value', dayjs().format('MM/DD/YYYY'));
		cy.get("[role='region']").eq(2).find('input').last().should('have.value', dayjs().format('MM/DD/YYYY'));

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('December', '18', 2022);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		//verify baterry chart is present
		cy.get('.ReactChart').should('exist');
	});

	it('Verify Solar Chart is Displayed', () => {
		cy.searchAssets('377707');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		let solarTooltipsYAxes = ['0.0', '1.5', '0.2'];
		let solarTooltipsXAxes = ['02/08/2023', '02/10/2023', '02/11/2023'];

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('December', '1', 2022);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		cy.get('.ReactChart').should('exist');

		//switch off all canvas except Solar
		cy.get("[data-testid='rounded-checkbox-button']").contains('Primary Voltage').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Secondary Voltage').click();

		solarTooltipsYAxes.forEach((tooltip, i) => {
			//verify appropriate color
			cy.get('g circle').eq(i).should('have.attr', 'style').and('contain', 'rgb(231, 141, 58)');

			//verify tooltips
			cy.get('g circle').eq(i).realHover().wait(1000);
			cy.get('.Cursor').last().contains(tooltip);
			cy.get('.Cursor').first().contains(solarTooltipsXAxes[i]);
		});
	});

	it('Verify Primary Voltage Chart is Displayed', () => {
		cy.searchAssets('368428');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		let primaryVoltageTooltips = [
			'3.930',
			'3.930',
			'3.930',
			'3.940',
			'3.930',
			'3.930',
			'3.940',
			'3.940',
			'3.930',
			'3.930',
			'3.930',
			'3.930',
			'3.930',
			'3.920',
			'3.930',
			'3.930',
			'3.940',
			'3.930',
		];

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('January', '1', 2023);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		cy.get('.ReactChart').should('exist');

		//switch off all canvas except Primary Voltage
		cy.get("[data-testid='rounded-checkbox-button']").contains('Solar').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Secondary Voltage').click();

		primaryVoltageTooltips.forEach((tooltip, i) => {
			//verify appropriate color
			cy.get('g circle').eq(i).should('have.attr', 'style').and('contain', 'rgb(60, 136, 204)');

			//verify tooltips
			cy.get('g circle').eq(i).realHover().wait(1000);
			cy.get('.Cursor').last().contains(tooltip);
		});
	});

	it('Verify Secondary Voltage Chart is Displayed', () => {
		cy.searchAssets('377707');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		let secondaryVoltageTooltips = ['14.200', '14.150', '14.150'];

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('February', '1', 2023);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		cy.get('.ReactChart').should('exist');

		//switch off all canvas except Secondary Voltage
		cy.get("[data-testid='rounded-checkbox-button']").contains('Solar').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Primary Voltage').click();

		secondaryVoltageTooltips.forEach((tooltip, i) => {
			//verify appropriate color
			cy.get('g circle').eq(i).should('have.attr', 'style').and('contain', 'rgb(106, 200, 126)');

			//verify tooltips
			cy.get('g circle').eq(i).realHover().wait(1000);
			cy.get('.Cursor').last().contains(tooltip);
		});
	});

	it('Verify Battery Chart for Short Time Duration', () => {
		cy.searchAssets('377707');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		let voltageTooltip = 4;

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('February', '11', 2023);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		cy.get('.ReactChart').should('exist');

		//switch off all canvas except Secondary Voltage
		cy.get("[data-testid='rounded-checkbox-button']").contains('Solar').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Primary Voltage').click();

		//verify only one dot is displayed
		cy.get('g circle').should('have.length', 1);

		//verify tooltip
		cy.get('g circle').realHover().wait(1000);
		cy.get('.Cursor').last().contains(voltageTooltip);
	});

	it('Verify at Least One Chart Should be Always Displayed', () => {
		cy.searchAssets('377707');
		cy.openAsset('Werner Enterprises', 'Asset ID');
		cy.expandDrawerSection('Battery');

		//select startDate
		cy.get("[role='region']").eq(2).find('input').first().click();
		cy.selectDate('February', '11', 2023);

		//select endDate
		cy.get("[role='region']").eq(2).find('input').last().click();
		cy.selectDate('February', '16', 2023);

		//try to switch all charts
		cy.get("[data-testid='rounded-checkbox-button']").contains('Solar').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Primary Voltage').click();
		cy.get("[data-testid='rounded-checkbox-button']").contains('Secondary Voltage').click().should('be.not.disabled');
	});
});
