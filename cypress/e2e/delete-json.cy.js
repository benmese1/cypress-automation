

describe('deleting json file', () => {
    

    it('deletes JSON file', () => {

        // calling deleteJSON custom command
        cy.deleteJSON('data/files/iot.json');

    })


})