const { execSync } = require('child_process');
// const shell = require('shelljs'); // 执行文件操作

function mergeOne(oneBranch) {
  execSync(`git checkout ${oneBranch}`);
  execSync('git pull');
  execSync(`git merge master`);
  execSync(`git checkout master`);
}

function run() {
  // execSync('git fetch origin master:master');
  ['react'].forEach((oneBranch) => {
    mergeOne(oneBranch);
  });
}

run();
