require('dotenv').config();

const path = require('path');
const mfConfig = require('./module-federation.config');
const webpackBase = require('../../webpack.base.config');

const PORT = Number(process.env.PORT || 8085);

/**
 * @returns {Promise<import('webpack').Configuration>}
 */
module.exports = async (env, { mode }) => {
  const publicPath = process.env.VERCEL_URL || process.env.PUBLIC_PATH || `/host-fixed/`;

  return webpackBase(env, {
    mode,
    outputPath: path.resolve(__dirname, 'dist'),
    publicPath,
    mfConfig,
    port: PORT,
  });
};
