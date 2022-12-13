const { time } = require("console");
const dayjs = require('dayjs')

describe('Verify the Asset Filter by dates', () => {
  it('Asset Filter by Dates', () => {

    // Login to Dev Environment
    cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

    // Assert the user is visible 
    cy.get("[aria-label='account of current user']").should('be.visible');

    // Click Asset Maps
    cy.dashboardMenu("Asset Map");

    // Wait for the map to reload
    cy.mapWait();

    //Click Calendar
    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    // Click Today and assert the assets filter
    cy.get('[data-title="Today"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let today = new Date();
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(today);
      }
    });

    cy.get('button[data-testid="calendar-range-result"]').click({ force: true });

    //Click Yesterday and assert the asset filters

    cy.get('[data-title="Yesterday"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(yesterday);
      }
    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click This week and assert the asset filters

    cy.get('[data-title="This Week"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let thisweek = new Date();
    thisweek.setDate(today.getDate() - 7);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(thisweek);
      }
    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Last week and assert the asset filters

    cy.get('[data-title="Last Week"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let lastweek = new Date();
    lastweek.setDate(today.getDate() - 8);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(lastweek);
      }
    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Last 7 Days and assert the asset filters

    cy.get('[data-title="Last 7 Days"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(thisweek);
      }
    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Last 14 Days and assert the asset filters

    cy.get('[data-title="Last 14 Days"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let last14days = new Date();
    last14days.setDate(today.getDate() - 14);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(last14days);
      }

    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Last 90 Days and assert the asset filters
    let last90days = new Date();
    last90days.setDate(last90days.getDate() - 90);
    cy.get('[data-title="Last 90 Days"]').click({ force: true });
    cy.get('#date-range-filter-submit-btn').click({ force: true });

    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(last90days);
      }

    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Current Month and assert the asset filters
    // Extract the current month from todays date and add a filter for assets for this month only
    let now = new Date();
    let month = now.getMonth() + 1;
    let currentmonth = `${now.getFullYear()}` + "-" + `${month}` + "-01";
    cy.get('[data-title="Dec"]').click({ force: true });

    //Assert the assets within the date filter of current month
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let dec_date = new Date(currentmonth);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(dec_date);
      }

    });

    cy.get('button[data-testid="calendar-range-result"]').click({ force: true });

    //Click Previous 1st Month assert the asset filters
    // Extract the 1st previous month from todays date and add a filter for assets for 2nd previous month only
    let prevmonth = now.getMonth();
    let previousmonth = `${now.getFullYear()}` + "-" + `${prevmonth}` + "-01";
    cy.get('[data-title="Nov"]').click({ force: true });

    //Assert the assets within the date filter of 1st previous month
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let nov_date = new Date(previousmonth);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(nov_date);
      }

    });

    cy.get('[data-testid="calendar-range-result"]').click({ force: true });

    //Click Previous 2nd Month assert the asset filters
    // Extract the previous 2nd month from the today's date and assert that all assets are within the date filter range
    let prevmonth1 = now.getMonth() - 1;
    let previousmonth1 = `${now.getFullYear()}` + "-" + `${prevmonth1}` + "-01";
    cy.get('[data-title="Oct"]').click({ force: true });

    //Assert the assets within the date filter of 1st previous month
    cy.get('#date-range-filter-submit-btn').click({ force: true });
    let oct_date = new Date(previousmonth1);
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.assertFilterDates(oct_date);
      }

    });

    // Select a date range from calender to identify the date filter
    cy.get('[data-testid="calendar-range-result"]').click({ force: true });
    cy.get('[data-index=1]').click({ force: true });
    cy.get('[id*=":r"]').eq(1).clear();
    cy.get('[id*=":r"]').eq(1).type("11/01/2022");
    cy.get('[id*=":r"]').eq(3).clear();
    cy.get('[id*=":r"]').eq(3).type("11/16/2022");

    cy.get('#date-range-filter-submit-btn').click({ force: true });

    let startdate = new Date("11/01/2022");
    let enddate = new Date("11/16/2022");

    // Assert the assets to within the start date and end date
    cy.get('#assets-count').then(($assets) => {
      if ($assets.text() > 0) {
        cy.get('[data-timestamp*="Z"]').each(($e) => {
          cy
            .wrap($e).invoke('attr', 'data-timestamp')
            .then($current_date => {
              const date = new Date($current_date);
              expect(startdate).to.lte(date);
              expect(date).to.lte(enddate);
            });
        }
        )
      };
    });
  })
})