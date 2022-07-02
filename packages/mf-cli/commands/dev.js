const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../helpers/webpack.config');

exports.dev = function dev({ publicPath, port = 3000 }) {
  console.log({ publicPath, port });

  const compiler = webpack(
    webpackConfig({
      mode: 'development',
      publicPath: process.env.VERCEL_URL || process.env.PUBLIC_PATH || publicPath || '/',
    })
  );

  const devServer = new WebpackDevServer(compiler, {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  });

  return devServer.start().then(() => console.log(`Dev server on http://localhost:${port}`));
};
