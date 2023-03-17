## @brick-cli

♂ @brick-cli is a serie of packages used to organize web-front projects using templates in [webpack-base-project](https://github.com/congzhou09/webpack-base-project), alonging with cli commands.

♂ purposes

1. Uniform basic project configs between diffenent projects using the same same framework.
2. Update project configs more easily. Updating specific package's version will reach the goal.

♂ Related framework for each package is as follows.

|   package name   |  framework   |
| :--------------: | :----------: |
| @brick-cli/base  | no framework |
| @brick-cli/react |    react     |

## usage

♀ Install specific @brick-cli package.

♀ Run "brick init" for the first time. This will create config files for tools like ".eslintrc.js", "babel.config.js", ".prettierrc" and so on with default configurations. If one config file has existed, it will not be overwritten, and a message like "xxx has existed, ignore creation." will be displayed in the command window.

♀ Custom webpack configurations can be set in "brick.config.js" file under the project's root directory. Content of the file can be in one of two forms below.

```
// configurations will be merged by "webpack-merge"
module.exports = {
  devServer:{
    port: 2023
  }
}
```

```
// configurations returned by the function will be treated as the final webpack config
module.exports = (curConfigs)=>{
  curConfigs.devServer.port = 2023;
  return curConfigs;
}
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
<td colspan="4">
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
