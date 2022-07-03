const path = require('node:path');
const process = require('node:process');

const root = process.cwd();

exports.paths = {
  appRoot: root,
  appEntry: path.resolve(root, 'src/index.js'),
  appPublic: path.resolve(root, 'public'),
  appIndexHtml: path.resolve(root, 'src/index.html'),
  appDevProxy: path.resolve(root, 'dev.proxy.js'),
  outputPath: path.resolve(root, 'dist'),
  mfConfigPath: path.resolve(root, 'module-federation.config.js'),
};
