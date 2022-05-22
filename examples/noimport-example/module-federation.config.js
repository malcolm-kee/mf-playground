const pkgJson = require('./package.json');

const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'edge',
  filename: 'remoteEntry.js',
  exposes: {
    './version': './src/components/version',
  },
  remotes: {},
  shared: {
    ...dependencies,
    react: {
      import: false,
      requiredVersion: '*',
    },
    'react-dom': {
      import: false,
      requiredVersion: '*',
    },
  },
};
