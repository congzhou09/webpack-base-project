const { execSync } = require('child_process');

function mergeOne(oneBranch) {
  execSync(`git checkout ${oneBranch}`);
  execSync('git pull');
  execSync(`git merge master`);
  execSync(`git push`);
  // execSync(`git checkout master`);
}

function run() {
  const args = process.argv.slice(2);
  const validBranch = ['react', 'vue'];
  args.forEach((oneBranch) => {
    if (validBranch.includes(oneBranch)) {
      mergeOne(oneBranch);
    }
  });
}

run();
