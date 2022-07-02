const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { paths } = require('../helpers/paths');

module.exports = function webpackConfig({ publicPath, mode }) {
  return createWebpackConfig({
    mode,
    mfConfig: require(paths.mfConfigPath),
    publicPath: process.env.VERCEL_URL || process.env.PUBLIC_PATH || publicPath || '/',
  });
};

/**
 *
 * @returns {import('webpack').Configuration}
 */
function createWebpackConfig({ mode, mfConfig, publicPath }) {
  const isProd = mode === 'production';

  return {
    mode,
    entry: paths.appEntry,
    output: {
      publicPath,
      filename: 'static/js/[name].[contenthash].js',
      chunkFilename: 'static/js/[name].[contenthash].js',
      path: paths.outputPath,
      clean: true,
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json'],
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
              loader: require.resolve('css-loader'),
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-react'),
                  {
                    runtime: 'automatic',
                  },
                ],
                require.resolve('@babel/preset-env'),
              ],
              babelrc: false,
              configFile: false,
            },
          },
        },
      ],
    },

    devtool: 'source-map',

    plugins: [
      new ModuleFederationPlugin(mfConfig),
      new HtmlWebPackPlugin({
        template: paths.appIndexHtml,
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
}
