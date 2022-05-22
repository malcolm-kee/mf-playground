const pkgJson = require('./package.json');
const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './version': './src/components/version',
  },
  remotes: {},
  shared: {
    ...dependencies,
  },
};
