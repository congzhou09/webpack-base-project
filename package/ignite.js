// construct necessary package content from the outer project

const fs = require('fs');
const fsPromise = require('node:fs/promises');
const outerPackage = require('../package.json');
const innerPackage = require('./package.json');
const filesToCopy = require('./files-to-copy');

const { cp: cpPromise } = fsPromise;

const pathToCopy = [
  { from: '../build/', to: './build/' },
  ...filesToCopy.map((one) => {
    return { from: `../${one}`, to: `./${one}` };
  }),
];

Promise.all(
  pathToCopy.map((one) => {
    return cpPromise(one.from, one.to, { recursive: true });
  }),
).catch((err) => {
  console.error(`error occurs when copying files`, err);
});

const innateDependencies = {
  'bash-color': '^0.0.4',
  'detect-port': '^1.5.1',
  yargs: '^17.7.1',
};

innerPackage.dependencies = Object.assign(outerPackage.dependencies, outerPackage.devDependencies, innateDependencies);
innerPackage.scripts = Object.assign(outerPackage.scripts);

fs.writeFileSync('./package.json', JSON.stringify(innerPackage, null, 2));
