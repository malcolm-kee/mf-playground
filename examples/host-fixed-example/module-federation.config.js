const pkgJson = require('./package.json');
const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'host',
  filename: 'remoteEntry.js',
  exposes: {},
  remotes: {
    remote: 'remote@/singleton/remoteEntry.js',
    edge: 'edge@/edge/remoteEntry.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
