const devices = [
    {device: 'iphone-5', orientation: 'portrait'},
    {device: 'iphone-5', orientation: 'landscape'},
    {device: 'ipad-2', orientation: 'portrait'},
    {device: 'ipad-2', orientation: 'landscape'},
]

describe('Mobile Asset Management page -- details view verification', {retries: 0}, () => {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false})
            .waitForLoad()
            .dashboardMenu('Asset List');
    });

    devices.forEach(({device, orientation}) => {
        it(`Asset details on ${device} ${orientation} screen`, () => {
            cy.viewport(device, orientation);
            validateMobileDetails();
        });
    });
});

const validateMobileDetails = () => {
    clickFirstCell();
    cy.get('[data-testid="global-text-btn-component"]')
        .contains('Show more')
        .should('be.visible')
        .click()

    cy.get('[data-testid="global-text-btn-component"]')
        .contains('Show less')
        .should('be.visible')
}

const clickFirstCell = () => {
    cy.get('[role="grid"] [data-rowindex="0"] [role="cell"][data-colindex="1"]')
        .click()
}

const clickOutside = () => {
    cy.get('body').click(0, 0);
};
