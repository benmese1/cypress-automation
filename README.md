WELCOME

THE FILE user-story-file CONTAINS THE USER STORIES THAT CORRESPOND WITH THESE TESTS

Before you start running the tests in this project, there are a few things you need to do. 

1.) Install node. 
    You can download and install node from here https://nodejs.org/en/download/
1.a) Although typescript was not implemented in ths project for time reasons, feel free to add it in anticipation of future improvements to this project.  
    cd into project folder
    npm install --save-dev typescript
    or install globally
    npm install -g typescript
2.) clone the repo from here https://github.com/jamesmmorin/cypress-automation to an appropriate location
3.) in your command prompt, cd into the folder which contains the cloned repo and 
    npm i
4.) cd into project folder and install cypress. 
    npm install cypress --save-dev
NOTE: for future installs (if using VSC), with project open click on Terminal -> new terminal and execute commands from there
5.) you should be able to open the cypress test GUI by typing npx cypress open
6.) this project typically executes tests from the cypress test runner (test GUI). The way this project is set up, you open the test runner in a particular environment. For example, if you want to execute your tests in the development environment you would open the terminal in VSC and type the following command;
    npm run cy:dev
This command executes the following script npx cypress open --env fileConfig=development. Addition scripts can be found in the 
package.json file. 
If you wanted to execute your tests in the stage environment, you would;
    npm run cy:stage
Etc. This gives the tester a lot of control over specific environment variables, and for this project is the recommended way to execute these tests. 
7.) As this is a mock test framework, these tests have all been executed in the development environment by running the command
    npm run cy:dev
The author suggests you do the same:)
8.) The tests in this project are under the test folder. 
    The integration folder with default cypress example tests have been left for training and example purposes
Tests are separated by epic 
    test -> epic-demoblaze 
and stories 
    test -> epic-demoblaze-> story-one, etc. 
The test are named S1 T1 for story one, test one. 
9.) The author considered a number of different naming conventions for organizing these tests, some of them probably better than the above, but stayed with this naming convention for ease of comparison with the user story file. 

EXTRA.) In case you are having issues with any of the libraries added to this project, here is a convenient list of them

Cypress xpath
    npm install -D cypress-xpath
    add this to cypress/support/index.js
    import ‘cypress-xpath’;
npm faker
    npm install faker --save-dev
Cypress real events
    npm install cypress-real-events
    add this to cypress/support/index.js
    import "cypress-real-events/support";
fs-extra
    npm install fs-extra
clipboardy
    npm install clipboardy
    import clipboard from 'clipboardy';


