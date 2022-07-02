const pkgJson = require('./package.json');
const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'dynamicHost',
  filename: 'remoteEntry.js',
  exposes: {},
  remotes: {},
  shared: {
    ...dependencies,
  },
};
