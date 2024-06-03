const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const zipper = require('zip-local');

main();

async function main() {
  await exec('npm run build');
  const packageDir = 'local-packaged-extension';
  if (fs.existsSync(packageDir)) {
    await fs.rm(packageDir, { recursive: true });
  }
  await fs.mkdir(packageDir);
  const zipContents = ['dist', 'public', 'manifest.json'];
  for await (const filename of zipContents) {
    await fs.copy(filename, `${packageDir}/${filename}`);
  }

  zipper.sync
    .zip(packageDir)
    .compress()
    .save(packageDir + '.zip');

  // await fs.rm(packageDir, { recursive: true });
  console.log('Local extension packaged');
}
