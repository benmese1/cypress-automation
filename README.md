WELCOME

Before you start running the tests in this project, there are a few things you need to do. 

1.) Install node. 
    You can download and install node from here: https://nodejs.org/en/download/

2.) Although typescript was not implemented in ths project for time reasons, if we feel the need to 
    implement typescript in future, this is how you could do it. However, before implementing ts, we should 
    probably discuss it as a team:   
    cd into project folder
    npm install --save-dev typescript
         or install globally
    npm install -g typescript

2.a) clone the repo 

3.) in your command prompt, cd into the folder which contains the cloned repo and: 
    npm i

4.) you should already be in the correct folder in your command prompt. If not, cd into project folder and install cypress. You can also
open the project in VSC, click on the terminal menu -> new terminal and type the following:  
    npm install cypress --save-dev

5.) you should be able to open the cypress test GUI by typing: npx cypress open
    NOTE: there are scripts in the package.json file that allow you to launch the test GUI into individual environments. Feel free to use those as you see fit for your testing. 

6.) this project typically executes tests from the cypress test runner (test GUI). The way this project is set up, you open the test runner in a particular environment. For example, if you want to execute your tests in the development environment you would open the terminal in VSC and type the following command;
    npm run cy:dev
This command executes the following script npx cypress open --env dev=1. Addition scripts can be found in the 
package.json file. 
If you wanted to execute your tests in the qa environment, you would;
    npm run cy:qa
Etc. This gives the tester a lot of control over specific environment variables, and for this project is the recommended way to execute these tests. 


