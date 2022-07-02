require('dotenv').config();

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

const PORT = Number(process.env.PORT || 4000);

/**
 * @returns {Promise<import('webpack').Configuration>}
 */
module.exports = async (env, { mode }) => {
  const isProd = mode === 'production';

  const publicPath = sanitizePublicPath(
    process.env.VERCEL_URL || process.env.PUBLIC_PATH || `http://localhost:${PORT}/`
  );

  return {
    mode,
    output: {
      publicPath,
      filename: isProd ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
      chunkFilename: isProd ? 'static/js/[name].[contenthash].js' : 'static/js/[name].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },

    devServer: {
      port: PORT,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      proxy: {
        '/edge': 'http://localhost:8083',
        '/remote': 'http://localhost:8081',
        '/singleton': 'http://localhost:8082',
        '/stateless': 'http://localhost:8087',
        '/noimport': 'http://localhost:8088',
        '/host-simple': 'http://localhost:8080',
        '/host-conflict': 'http://localhost:8086',
        '/host-broken': 'http://localhost:8084',
        '/host-fixed': 'http://localhost:8085',
        '/host-noimport': 'http://localhost:8089',
        '/host-dynamic': 'http://localhost:8090',
        '/.netlify': 'http://localhost:9999',
      },
    },

    target: 'web',

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    devtool: isProd ? 'source-map' : 'cheap-module-source-map',

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [
        '...', // keep existing minimizer
        new CssMinimizerPlugin(),
      ],
    },
  };
};

/**
 *
 * @param {string} str
 * @returns
 */
const sanitizePublicPath = (str) => {
  const withTrailingSlash = str.endsWith('/') ? str : `${str}/`;
  return withTrailingSlash.startsWith('http') ? withTrailingSlash : `https://${withTrailingSlash}`;
};
