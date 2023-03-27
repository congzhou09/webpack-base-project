## brick-cli-base

[![npm version](https://badge.fury.io/js/brick-cli-base.svg)](https://badge.fury.io/js/brick-cli-base)

♂ brick-cli-XX is a serie of packages used to organize web-front projects using templates in [webpack-base-project](https://github.com/congzhou09/webpack-base-project), alonging with cli commands.

♂ purposes

1. Organize projects with less config works, which is achieved by encapsulting basic config works into an npm package. Encapsulting also make projects's dependencies in "package.json" file more concise.

2. Uniform basic project configs between diffenent projects using the same same framework.

3. Update project configs more easily. Updating specific package's version will reach the goal.

♂ Related framework for each package is as follows.

|  package name   |  framework   |
| :-------------: | :----------: |
| brick-cli-base  | no framework |
| brick-cli-react |    react     |
|  brick-cli-vue  |     vue      |

## usage

♀ Install specific brick-cli-XX package.

♀ Run "brick init" for the first time. This will create config files for tools like ".eslintrc.js", "babel.config.js", ".prettierrc" and so on with default configurations. If one config file has existed, it will not be overwritten, and a message like "xxx has existed, ignore creation." will be displayed in the command window.

♀ (selectable) Run "brick tidydeps" to remove duplicated dependencies that has been included by brick-cli-XX from the project's "package.json" file. Then run "yarn install" to let yarn re-tidy the relationships between packages.

♀ Custom webpack configurations can be set in "brick.config.js" file under the project's root directory. Content of the file can be in one of three forms below.

```
/*
* 1.Configurations will be merged by "webpack-merge".
* 2.The "brickBase" field corresponds to configurations in "build/config.js" file of "webpack-base-project".
*/

module.exports = {
  brickBase:{
    urlPrefix: 'http://my.prefix'
  },
  devServer:{
    port: 2023
  }
}
```

```
/*
* Configurations returned by the function will be treated as the final webpack config.
*/
module.exports = (curConfig)=>{
  curConfig.devServer.port = 2023;
  return curConfig;
}
```

```
/*
* 1.Configurations returned by the first function corresponds to configurations in "build/config.js" file of "webpack-base-project".
* 2.Configurations returned by the second function will be treated as the final webpack config.
*/
module.exports = [(baseConfig)=>{
  baseConfig.urlPrefix = 'http://my.prefix';
  return baseConfig;
}, (curConfig)=>{
  curConfig.devServer.port = 2023;
  return curConfig;
}];
```

♀ Other configurations for ESLint, TypeScript, Vite, etc can be set in related config files.

♀ Other cli commands are listed below. It will be convenient to write them into corresponding scripts in the "package.json".

<table>
<tr>
<th>cli command</th>
<th>description</th>
<th>parameter</th>
</tr>
<tr>
<td>brick dev</td>
<td>run webpack dev server</td>
<td rowspan="4">
◆--eject <br>
Write final webpack configs to command window(--eject) or to file(--eject=<span style="font-style:italic;">filename</span>)
</td>
</tr>
<tr>
<td>brick vite</td>
<td>run vite dev server</td>
</tr>
<tr>
<td>brick sit</td>
<td>build for sit</td>
</tr>
<tr>
<td>brick prod</td>
<td>build for prod</td>
</tr>
</table>
