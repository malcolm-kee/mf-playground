const pkgJson = require('./package.json');

const dependencies = pkgJson.dependencies;

module.exports = {
  name: 'react18',
  filename: 'remoteEntry.js',
  exposes: {
    './exposes': './src/exposes',
  },
  remotes: {},
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
