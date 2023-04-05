// @team1
describe('Click on the canvas zoom the cluster and view the asset', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('Success canvas click test', () => {
		cy.get("[class='mapboxgl-canvas']").then(($canvas) => {
			// Get dimension of the canvas

			const canvasWidth = $canvas.width();
			const canvasHeight = $canvas.height();

			// Divide in half since cursor will be at center of canvas

			const canvasCenterX = canvasWidth / 2;
			const canvasCenterY = canvasHeight / 2;

			// Determine the click position by dissecting the space where the button is
			// This helps allow the test to work responsively

			const buttonX = canvasCenterX - 100; //( ( canvasCenterX / 3 ) * 2 );
			const buttonY = canvasCenterY + 100; //( ( canvasCenterY / 3 ) * 2 );

			// Wrap the canvas with the Cypress API, scroll it into view, and click in the location!
			//   cy.wait(100000);
			cy.wrap($canvas).scrollIntoView().click(buttonX, buttonY);
		});
	});

	it('Success canvas click test and zoom the cluster', () => {
		cy.get("[class='mapboxgl-canvas']").then(($canvas) => {
			// Get dimension of the canvas

			const canvasWidth = $canvas.width();
			const canvasHeight = $canvas.height();

			// Divide in half since cursor will be at center of canvas

			const canvasCenterX = canvasWidth / 2;
			const canvasCenterY = canvasHeight / 2;

			// Determine the click position by dissecting the space where the button is
			// This helps allow the test to work responsively

			const buttonX = canvasCenterX - 100; //( ( canvasCenterX / 3 ) * 2 );
			const buttonY = canvasCenterY + 100; //( ( canvasCenterY / 3 ) * 2 );

			// Wrap the canvas with the Cypress API, scroll it into view, and click in the location!
			//   cy.wait(100000);
			cy.wrap($canvas).scrollIntoView().click(buttonX, buttonY);
		});
	});
});