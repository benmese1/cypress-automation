/** Create new Report
 * @param {string} reportTemplate - name of template to be applied for Report creation
*/
Cypress.Commands.add('createNewReport', (reportTemplate) => {
	cy.get('[data-testId="btn-sub-header-action-Create New Report"]').click();
	cy.get('[data-testId="report-type-autocomplete-field"]').clear().realType(reportTemplate);
	cy.get('li').contains(reportTemplate).realClick();
	cy.get('[data-testid="global-button-component"]').click();
});
