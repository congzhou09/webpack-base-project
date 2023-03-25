// set up necessary package content from the outer project

const fs = require('fs');
const path = require('path');
const fsPromise = require('node:fs/promises');
const outerPackage = require('../package.json');
const innerPackage = require('./package.json');
const filesToCopy = require('./files-to-copy');

const { cp: cpPromise } = fsPromise;

function resolvePath(...args) {
  return path.join(__dirname, ...args);
}

const pathToCopy = [
  { from: resolvePath('../build/'), to: resolvePath('./build/') },
  ...filesToCopy.map((one) => {
    return { from: resolvePath(`../${one}`), to: resolvePath(`./essentials/${one}`) };
  }),
];

Promise.all(
  pathToCopy.map((one) => {
    return cpPromise(one.from, one.to, { recursive: true });
  }),
).catch((err) => {
  console.error(`error occurs when copying files`, err);
});

// create config-orig.js
cpPromise(resolvePath('../build/config.js'), resolvePath('./build/config-orig.js')).catch((err) => {
  console.error(`error occurs when copying files`, err);
});

const innateDependencies = {
  'bash-color': '^0.0.4',
  'detect-port': '^1.5.1',
  yargs: '^17.7.1',
};

innerPackage.dependencies = Object.assign(outerPackage.dependencies, outerPackage.devDependencies, innateDependencies);

/* devDependencies will not be installed using "yarn install" in workDirectory */
// innerPackage.devDependencies = {};
// function pickDevDependencies() {
//   const devDependencyNames = ['webpack-dev-server', 'jest'];
//   devDependencyNames.forEach((one) => {
//     innerPackage.devDependencies[one] = innerPackage.dependencies[one];
//     delete innerPackage.dependencies[one];
//   });
// }
// pickDevDependencies();

fs.writeFileSync(resolvePath('./package.json'), JSON.stringify(innerPackage, null, 2) + '\n');
