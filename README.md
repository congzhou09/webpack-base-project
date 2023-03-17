## webpack-base-project

● Web-front base project containing whole dependencies and configs for environments of dev, site and prod.
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
◇compiling outcomes are in "/dist"<br>
◇webpack configs: splitChunks, runtimeChunk  <br>
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
◇gzip copy<br>
◇static resource files in "/static" folder
◇css extracted to files
◇minimized textual files
◇.gitignore
</td>
</tr>
</table>

● Each git branch maintains the project with corresponding framework.

| branch |  framework   |
| :----: | :----------: |
| master | no framework |
|  vue   |     vue2     |
| react  |    react     |
