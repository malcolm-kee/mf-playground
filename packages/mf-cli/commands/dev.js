const fs = require('node:fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { paths } = require('../helpers/paths');
const webpackConfig = require('../helpers/webpack.config');

exports.dev = function dev({ publicPath, port = 3000, open = false }) {
  const compiler = webpack(
    webpackConfig({
      mode: 'development',
      publicPath: process.env.VERCEL_URL || process.env.PUBLIC_PATH || publicPath || '/',
    })
  );

  const devServer = new WebpackDevServer(
    {
      port,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      historyApiFallback: publicPath
        ? {
            index: publicPath,
          }
        : false,
      static: fs.existsSync(paths.appPublic)
        ? {
            directory: paths.appPublic,
            publicPath: publicPath && removeTrailingSlash(publicPath),
            watch: true,
          }
        : undefined,
      client: {
        logging: 'none',
      },
      proxy: fs.existsSync(paths.appDevProxy) ? require(paths.appDevProxy) : undefined,
    },
    compiler
  );

  return devServer.start().then(() => {
    console.log(`Dev server on http://localhost:${port}`);
    if (open) {
      require('../helpers/open-browser').openBrowser(`http://localhost:${port}`);
    }
  });
};

/**
 *
 * @param {string} str
 * @returns
 */
const removeTrailingSlash = (str) => (str.endsWith('/') ? str.slice(0, -1) : str);
