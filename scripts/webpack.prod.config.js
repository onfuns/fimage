const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const config = require('./config')
const { join } = require('./utils')

const prodConfig = merge(baseWebpackConfig, {
  mode: config.build.env,
  output: {
    path: config.build.output,
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
    // new CopyWebpackPlugin([
    //   {
    //     from: join('../src/assets/images'),
    //     to: config.build.output + '/assets/images'
    //   }
    // ])
  ]
})

if (config.build.bundleAnaly) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prodConfig
