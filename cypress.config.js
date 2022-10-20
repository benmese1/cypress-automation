import { defineConfig } from 'cypress';
import merge from 'deepmerge'
import * as path from 'path';
import * as fs from 'fs-extra';

export default defineConfig({
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  e2e: {
    setupNodeEvents(on, config) {
      if (config.env.dev) {
        return {
          baseUrl: "https://www.weather.com",
          env: {
            env: "dev",
            auth_username: "<email>",
            auth_password: "<password>",
          },
        };
      } else
        return {
          baseUrl: "https://www.google.com/",
          env: {
            env: "qa",
            auth_username: "<email>",
            auth_password: "<password>",                  
          },
        };
    },
  },
})

////////////////////////////////////////////////////////////////

// this is the default configuration that comes with cypress 10
// export default defineConfig({
//   fixturesFolder: 'cypress/fixtures',
//   screenshotsFolder: 'cypress/screenshots',
//   videosFolder: 'cypress/videos',
//   downloadsFolder: 'cypress/downloads',
//   e2e: {
    
//     // We've imported your old cypress plugins here.
//     // You may want to clean this up later by importing these.
//     setupNodeEvents(on, config) {
//       // return require('./cypress/support/index.js')(on, config)
//     },
//     specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
//   },
// })

////////////////////////////////////////////////////////////////

// the below two are configurations I have worked on in the hopes of 
// referring to the config files in the config folder. Not working as
// intended quite yet. 

////////////////////////////////////////////////////////////////
// the below code required deepmerge to be installed
// npm i deepmerge
// export default defineConfig({
//   fixturesFolder: 'cypress/fixtures',
//   screenshotsFolder: 'cypress/screenshots',
//   videosFolder: 'cypress/videos',
//   downloadsFolder: 'cypress/downloads',
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       // Load the Config File
//       function loadconfig(filename) {
//         const configJson = require(filename);
//         if (configJson.extends) {
//           const baseConfigFileName = path.join(
//             path.dirname(filename),
//             configJson.extends
//           );
//           const baseConfig = loadconfig(baseConfigFileName);
//           return merge(baseConfig, configJson);
//         } else {
//           return configJson;
//         }
//       }

//      function configModule (on, config) {
//         on("task", {
//           readFiles(folderName) {
//             return new Promise((resolve, reject) => {
//               fs.readdir(folderName, (err, files) => {
//                 if (err) {
//                   return reject(err);
//                 }
//                 resolve(files);
//               });
//             });
//           },
//         });
//         return loadconfig(config.config);
//       };
      
//     },
//     env: {
      
//     },
//     baseUrl: "https://www.amazon.com",
//     watchForFileChanges: false,
//   },
// });






