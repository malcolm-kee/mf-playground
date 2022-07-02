const fs = require('fs-extra');
const webpack = require('webpack');

const { paths } = require('../helpers/paths');
const webpackConfig = require('../helpers/webpack.config');

exports.build = function build({ publicPath, mode }) {
  const compiler = webpack(
    webpackConfig({
      mode,
      publicPath: process.env.VERCEL_URL || process.env.PUBLIC_PATH || publicPath || '/',
    })
  );

  return new Promise((fulfill, reject) => {
    compiler.run((err) => {
      if (err) {
        return reject(err);
      }
      copyPublicDic();
      fulfill();
    });
  });
};

function copyPublicDic() {
  if (fs.existsSync(paths.appPublic)) {
    fs.copySync(paths.appPublic, paths.outputPath, {
      dereference: true,
    });
  }
}
