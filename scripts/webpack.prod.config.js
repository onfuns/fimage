const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const config = require('./config')

const join = name => path.join(__dirname, name)
const DIST_FILE_PATH = join(config.build.output)
const prodConfig = merge(baseWebpackConfig, {
  mode: config.build.env,
  output: {
    path: DIST_FILE_PATH,
    filename: 'app.bundle.js',
    publicPath: config.build.publicPath,
    chunkFilename: '[name].js'
  },
  devtool: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: join('../main.js'),
        to: DIST_FILE_PATH
      },
      {
        from: join('../src/assets/images'),
        to: DIST_FILE_PATH + '/assets/images'
      },
      {
        from: join('../package.json'),
        to: DIST_FILE_PATH
      }
    ])
  ]
})

if (config.build.bundleAnaly) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodConfig
