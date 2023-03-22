#!/usr/bin/env node

const requireUncached = require('./build/util').requireUncached;
const fs = require('node:fs');
const fsPromise = require('node:fs/promises');
const path = require('path');
const color = require('bash-color');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const { accessSync, constants } = fs;
const { cp: cpPromise } = fsPromise;

const workDirectory = process.cwd();
const CUSTOM_FILENAME = 'brick.config.js';

const configFinal = {
  dev: getFinalConfig('dev'),
  sit: getFinalConfig('sit'),
  prod: getFinalConfig('prod'),
};

function getViteConfigPath() {
  let configDefault = path.join(__dirname, './vite.config.js');
  try {
    const customDirectory = path.join(workDirectory, './vite.config.js');
    accessSync(customDirectory, constants.R_OK);
    configDefault = customDirectory;
  } catch (err) {}

  return configDefault;
}

function resolveDirPath(...args) {
  return path.join(__dirname, ...args);
}

// generate final webpack config using custom brick config in workDirectory
function getFinalConfig(env) {
  fs.cpSync(resolveDirPath('./build/config-orig.js'), resolveDirPath('./build/config.js'));
  const baseConfig = requireUncached(resolveDirPath('./build/config.js'));
  let finalConfig = requireUncached(resolveDirPath(`./build/webpack.${env}.conf`));
  try {
    const customDirectory = path.join(workDirectory, CUSTOM_FILENAME);
    accessSync(customDirectory, constants.R_OK);
    const brickCustom = requireUncached(customDirectory);
    try {
      if (Array.isArray(brickCustom)) {
        const finalBaseConfig = brickCustom[0].call(null, baseConfig);
        fs.writeFileSync(resolveDirPath('./build/config.js'), 'module.exports=' + JSON.stringify(finalBaseConfig, null, 2) + '\n');
        const tmpConfig = requireUncached(resolveDirPath(`./build/webpack.${env}.conf`));
        finalConfig = brickCustom[1].call(null, tmpConfig);
      } else if (typeof brickCustom === 'function') {
        finalConfig = brickCustom.call(null, finalConfig);
      } else if (typeof brickCustom === 'object') {
        if (brickCustom.hasOwnProperty('brickBase')) {
          const finalBaseConfig = Object.assign(baseConfig, brickCustom['brickBase']);
          fs.writeFileSync(resolveDirPath('./build/config.js'), 'module.exports=' + JSON.stringify(finalBaseConfig, null, 2) + '\n');
          const tmpConfig = requireUncached(resolveDirPath(`./build/webpack.${env}.conf`));
          delete brickCustom['brickBase'];
          finalConfig = merge(tmpConfig, brickCustom);
        }
        finalConfig = merge(finalConfig, brickCustom);
      }
    } catch (err) {
      console.error(`error occurs while parsing brick.config.js: `, err);
    }
  } catch (err) {}

  return finalConfig;
}

// eject webpack config to console or file
function ejectConfig(filename, theConfig) {
  if (filename.length > 0) {
    fs.writeFileSync(filename, JSON.stringify(theConfig, null, 2));
  } else {
    console.log(JSON.stringify(theConfig, null, 2));
  }
}

function whetherEject(ejectValue, env) {
  if (ejectValue) {
    ejectConfig(ejectValue, configFinal[env]);
    return true;
  }
  return false;
}

function runBuild(env) {
  const theConfig = configFinal[env];
  const compiler = webpack(theConfig);

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    compiler.close((closeErr) => {
      if (closeErr) {
        console.error(`error occurs when closing webpack compiler:`, closeErr);
      }
    });
  });
}

// yargs's commands info
const commands = [
  {
    cmd: 'init',
    desc: 'create necessary files for devServer and build',
    builder: {},
    handler: () => {
      const filesToCopy = require('./files-to-copy');
      filesToCopy.forEach((one) => {
        const sourceDirectory = path.join(__dirname, `./essentials/${one}`);
        const destDirectory = path.join(workDirectory, `./${one}`);
        try {
          accessSync(destDirectory, constants.R_OK);
          console.warn(color.yellow(`${one} has existed, ignore creation.`));
        } catch (checkErr) {
          cpPromise(sourceDirectory, destDirectory, { recursive: true })
            .then(() => {
              console.log(color.cyan(`file or directory named "${one}" created.`));
            })
            .catch((err) => {
              console.error(`error occurs when creating file ${one}.`, err);
            });
        }
      });
    },
  },
  {
    cmd: 'tidydeps',
    desc: 'tidy duplicated dependencies',
    builder: {},
    handler: () => {
      const outerPackagePath = path.resolve(workDirectory, './package.json');
      const outerPackage = require(outerPackagePath);
      const innerPackage = require('./package.json');
      const innerDepKeys = Object.keys(innerPackage.dependencies);

      const keysToRemove = [];
      // dependencies
      let outerKeys = Object.keys(outerPackage.dependencies ?? {});
      outerKeys.forEach((oneDepName) => {
        if (innerDepKeys.includes(oneDepName)) {
          keysToRemove.push(oneDepName);
        }
      });
      keysToRemove.forEach((oneDepKey) => {
        delete outerPackage.dependencies[oneDepKey];
      });

      keysToRemove.length = 0;

      // devDependencies
      outerKeys = Object.keys(outerPackage.devDependencies ?? {});
      outerKeys.forEach((oneDepName) => {
        if (innerDepKeys.includes(oneDepName)) {
          keysToRemove.push(oneDepName);
        }
      });
      keysToRemove.forEach((oneDepKey) => {
        delete outerPackage.devDependencies[oneDepKey];
      });

      fs.writeFileSync(outerPackagePath, JSON.stringify(outerPackage, null, 2) + '\n');
    },
  },
  {
    cmd: 'vite',
    desc: 'run vite dev server',
    builder: {},
    handler: async (argv) => {
      const configPath = getViteConfigPath();
      const vite = require('vite');
      const { createServer } = vite;
      const server = await createServer({
        configFile: configPath,
      });
      await server.listen();

      server.printUrls();
    },
  },
  {
    cmd: 'dev',
    desc: 'run webpack dev server',
    builder: {},
    handler: (argv) => {
      if (!whetherEject(argv.eject, 'dev')) {
        const theConfig = configFinal['dev'];
        const compiler = webpack(theConfig);

        const detect = require('detect-port');
        const port = theConfig.devServer.port;
        detect(port)
          .then((_port) => {
            if (port !== _port) {
              console.log(color.yellow(`port: ${port} was occupied, try port: ${_port}`));
            }
            theConfig.devServer.port = _port;
            const server = new WebpackDevServer(theConfig.devServer, compiler);
            server.startCallback(() => {
              console.log(color.cyan(`server start successfully at port:${_port}`));
            });
          })
          .catch((err) => {
            console.error(color.red(`server fails in starting. ${err}`));
          });
      }
    },
  },
  {
    cmd: 'sit',
    desc: 'build for sit',
    builder: {},
    handler: (argv) => {
      if (!whetherEject(argv.eject, 'sit')) {
        runBuild('sit');
      }
    },
  },
  {
    cmd: 'prod',
    desc: 'build for prod',
    builder: {},
    handler: (argv) => {
      if (!whetherEject(argv.eject, 'prod')) {
        runBuild('prod');
      }
    },
  },
];

// generate yargs's commands
const yargsObj = yargs(hideBin(process.argv));
commands.forEach((one) => {
  const { cmd, desc, builder, handler } = one;
  yargsObj.command(cmd, desc, builder, handler);
});
yargsObj.option({
  eject: {
    describe: 'eject the config to console <or filename>',
  },
});
yargsObj.parse();
