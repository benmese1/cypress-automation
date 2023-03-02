//Method Name :createNewUser
//Used to create a new User
//Params Company/SubCompany,lastName,firstName,username,email,phonenumber,role
Cypress.Commands.add('createNewUser', (lastName, firstName, name, parentorg, email, phonenumber, role) => {
	cy.log(parentorg);
	cy.get('[data-testid="btn-sub-header-action-Create New"]').click();
	cy.get('[data-testid="form-control-input-lastName"]').type(lastName);
	cy.get('[data-testid="form-control-input-firstName"]').type(firstName);
	cy.get('[data-testid="form-control-input-name"]').type(name);
	cy.get('[data-testid="autocomplete-customer_orgs_id"]').click();
	cy.get('li').contains(parentorg).click();
	cy.get('[data-testid="form-control-input-email"]').type(email);
	cy.get('[data-testid="form-control-input-phoneNumber"]').type(phonenumber);
	cy.get('[data-testid="autocomplete-groups"]').click();
	cy.get('li').contains(role).click();
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User Created Successfully!');
});

//Method Name :editUser
//Used to edit a given user
//Params name, lastName, firstName, phonenumber
Cypress.Commands.add('editUser', (name, lastName, firstName, phonenumber) => {
	cy.xpath('//div[text()="' + name + '"]').click();
	cy.get('[data-testid="form-control-input-lastName"]').clear().type(lastName);
	cy.get('[data-testid="form-control-input-firstName"]').clear().type(firstName);
	cy.get('[data-testid="form-control-input-phoneNumber"]').clear().type(phonenumber);
	cy.get('[data-testid="btn-org-form-submit"]').click();
	cy.get('[data-testid="snackbar-title"]').should('be.visible').contains('User Updated Successfully!');
});
