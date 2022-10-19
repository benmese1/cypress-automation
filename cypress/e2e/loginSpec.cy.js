import LoginPage from "./cucumber-test/pages/loginPage.js";
import HomePage from "./cucumber-test/pages/homePage.js";

let loginPage = new LoginPage();
let homePage = new HomePage();

describe('Login', () => {
  it('Success login test', () => {
    loginPage.open(Cypress.env('username'), Cypress.env('password'));
    homePage.isSignedIn();
  })

  it('Incorrect password test', () => {
    loginPage.open(Cypress.env('username'), 'incorrect');
    loginPage.isIncorrectDisplayed();
    loginPage.isIncorrectText('Incorrect username or password.');
  })

  it('Empty login test', () => {
    loginPage.open(' ', ' ');
    loginPage.isIncorrectDisplayed();
    loginPage.isIncorrectText('The username you entered cannot be empty or contain only spaces');
  })

  it('Empty password test', () => {
    loginPage.open(Cypress.env('username'), ' ');
    loginPage.isIncorrectDisplayed();
    loginPage.isIncorrectText('The password you entered cannot be empty or contain only spaces');
  })
})