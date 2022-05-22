const pkgJson = require('./package.json');
const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'host',
  filename: 'remoteEntry.js',
  exposes: {},
  remotes: {
    remote: 'remote@/remote/remoteEntry.js',
    edge: 'edge@/stateless/remoteEntry.js',
  },
  shared: {
    ...dependencies,
  },
};
