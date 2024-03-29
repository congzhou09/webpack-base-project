## webpack-base-project

● Web-front base project containing whole dependencies and configs for environments of dev, site and prod.

● Each git branch maintains the project with corresponding framework.

| branch |  framework   |
| :----: | :----------: |
| master | no framework |
|  vue   |     vue      |
| react  |    react     |

● Features supported is listed in the table below. <b>Feel free to access "/build" directory and relating config files for more detail.</b>

<table>
<tr>
<th>Feature</th>
<th>ps</th>
</tr>
<tr>
<td> webpack-dev-server </td>
<td> ◇configurations are in "/build"  </td>
</tr>
<tr>
<td> vite devServer </td>
<td> ◇using "/index.html" as the entry  </td>
</tr>
<tr>
<td> compile using webpack  </td>
<td>
◇"src/index.js" as the default compiling entry<br>
◇"/dist" as the default compiling outcomes directory<br>
◇with webpack configs: splitChunks, runtimeChunk  <br>
</td>
</tr>
<tr>
<td> webpack compiling tools</td>
<td>
◇Babel <br>
◇TypeScript <br>
◇Less<br>
◇Sass<br>
◇PostCSS<br>
◇thread-loader<br>
</td>
</tr>
<tr>
<td> code quality and style tools </td>
<td> 
◇ESLint<br>
◇EditorConfig<br>
◇Prettier<br>
</td>
</tr>
<tr>
<td> general </td>
<td>
◇cross-env<br>
◇gzip copies<br>
◇static resource files in "/static" folder<br>
◇css extracted to files<br>
◇minimized textual files<br>
</td>
</tr>
<tr>
<td> tool </td>
<td> 
◇webpack-bundle-analyzer<br>
◇progress-bar-webpack-plugin<br>
◇speed-measure-webpack-plugin<br>
◇jest <br>
</td>
</tr>
</table>

● There is a serie of [packages](https://github.com/congzhou09/webpack-base-project/blob/master/package/README.md) used to organize web-front projects using templates here.
