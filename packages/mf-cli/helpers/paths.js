const path = require('node:path');
const process = require('node:process');

const root = process.cwd();

exports.paths = {
  appRoot: root,
  appEntry: path.resolve(root, 'src/index.js'),
  appIndexHtml: path.resolve(root, 'src/index.html'),
  outputPath: path.resolve(root, 'dist'),
  mfConfigPath: path.resolve(root, 'module-federation.config.js'),
};