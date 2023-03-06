//Method Name :createNewOrganization
//Used to create a new Organization
//Params companyname,brand,type,timezone,distancepreference
Cypress.Commands.add('createNewOrganization', (companyname, parentcompany, brand, type, timezone, distancepref) => {
	cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
	cy.get('[data-testid="input-org-name"]').type(companyname);
	cy.get('[data-testid="input-org-parent-company"]').click();
	cy.get('li').contains(parentcompany).click();
	cy.get('[data-testid="input-org-brand"]').click();
	cy.get('li').contains(brand).click();
	cy.get('[data-testid="input-org-type"]').click();
	cy.get('li').contains(type).click();
	cy.get('[data-testid="input-org-timezone"]').click();
	cy.get('li').contains(timezone).click();
	cy.get('[data-testid="input-org-distance-unit-preference"]').click();
	cy.get('li').contains(distancepref).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Created Successfully!');
});

//Method Name :editOrg
//Used to edit a given Org
//Params companyname, brand, type, timezone, distancepreference
Cypress.Commands.add('editOrg', (companyname, brand, type, timezone, distancepref) => {
	cy.xpath('//div[text()="' + companyname + '"]').click();
	cy.get('[data-testid="input-org-brand"]').clear().type(brand);
	cy.get('li').contains(brand).click();
	cy.get('[data-testid="input-org-type"]').clear().type(type);
	cy.get('li').contains(type).click();
	cy.get('[data-testid="input-org-timezone"]').clear().type(timezone);
	cy.get('li').contains(timezone).click();
	cy.get('[data-testid="input-org-distance-unit-preference"]').clear().type(distancepref);
	cy.get('li').contains(distancepref).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Updated Successfully!');
});

/**
 * Search for the organizations& users
 */
Cypress.Commands.add('searchOrgsAndUsers', (searchCriteria) => {
	cy.get('[data-testid="items-list-search-input"]').should('be.visible').type(searchCriteria).wait(1000);
});

//Method Name :verifyMyOrganizationTableView
//Used to verify if My Organization table exits
//Params No Param
Cypress.Commands.add('verifyMyOrganizationTableView', () => {
	cy.get('[role="grid"]').invoke('attr', 'aria-rowcount').then(parseInt).should('be.gte', 1);
});

/**
 * Transfer Company
 */
Cypress.Commands.add('transferOrg', (company, parentcompany) => {
	cy.xpath('//div[text()="' + company + '"]').click();
	cy.get('[data-testid="input-org-parent-company"]').click().clear().type(parentcompany);
	cy.get('li').contains(parentcompany).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('Organization Updated Successfully!');
});

/**
 * Filter the organizations
 */
Cypress.Commands.add('addFilter', (columnName, operator, value) => {
	cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible').click({ force: true }).wait(500);
	cy.get('[role="tooltip"] .MuiDataGrid-filterForm').as('filterPopup');
	//find elements within 'Filter' Popup
	cy.get('@filterPopup').find('select').eq(1).select(columnName);
	cy.get('@filterPopup').find('select').eq(2).select(operator);

	if (!operator.includes('empty')) {
		cy.get('@filterPopup').find('input').last().type(value).wait(500);
	}
	cy.clickOutside();
});