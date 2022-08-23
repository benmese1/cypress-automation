WELCOME

Before you start running the tests in this project, there are a few things you need to do. 

1.) Install node. 
    You can download and install node from here: https://nodejs.org/en/download/

1.a) install cypress
    cd into the folder that will contain your cypress repo and: npm install cypress --save-dev

2.) Although typescript was not implemented in ths project for time reasons, if we feel the need to 
    implement typescript in future, this is how you could do it:   
    cd into project folder
    npm install --save-dev typescript
    or install globally
    npm install -g typescript

2.a) clone the repo 

3.) in your command prompt, cd into the folder which contains the cloned repo and: 
    npm i

4.) cd into project folder and install cypress:  
    npm install cypress --save-dev
NOTE: for future installs (if using VSC), with project open click on Terminal -> new terminal and execute commands from there

5.) you should be able to open the cypress test GUI by typing: npx cypress open
    NOTE: there are scripts in the package.json file that allow you to launch the test GUI into individual environments. Feel free to use those as you see fit for your testing. 

--With the release of cypress 10, this functionality does not work as intended. It is the intent of the
--creator to fix this in a future release. You can, however, still use the script npm run cypress
--in order to open the cypress test GUI, sanse specific environment (for now)
6.) this project typically executes tests from the cypress test runner (test GUI). The way this project is set up, you open the test runner in a particular environment. For example, if you want to execute your tests in the development environment you would open the terminal in VSC and type the following command;
    npm run cy:dev
This command executes the following script npx cypress open --env fileConfig=development. Addition scripts can be found in the 
package.json file. 
If you wanted to execute your tests in the stage environment, you would;
    npm run cy:stage
Etc. This gives the tester a lot of control over specific environment variables, and for this project is the recommended way to execute these tests. 


