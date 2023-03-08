//Method Name :myAccount_ImpersonateUser
//Used to do user impersonation
//Params impersonationUsername, impersonationFullname
Cypress.Commands.add('myAcount_ImpersonateUser', (impersonationUsername, impersonationFullname) => {
	cy.get("[aria-label='account of current user']").click();
	cy.get('[data-testid="SupervisorAccountOutlinedIcon"]').should('be.visible').click();
	cy.get('[id="impersonate-user-search"]').wait(3000).type(impersonationUsername);
	cy.get('p').contains(impersonationFullname).click();
	cy.waitForLoad();
	cy.get('[data-testid="logged-in-username"]').should('be.visible').contains(impersonationUsername);
});

//Method Name :myAccount_StopImpersonating"
//Used to StopImpersonating
//Params NA
Cypress.Commands.add('myAcount_StopImpersonating', () => {
	cy.wait(3000).get('[data-testid="logged-in-username"]').click();
	cy.get('[data-testid="global-text-btn-component"]').should('be.visible').click();
});
