const { join } = require('./utils')

module.exports = {
  build: {
    env: 'production',
    basePath: join('../src'),
    output: join('../renderer_process'),
    template: join('../src/index.html'),
    publicPath: './',
    bundleAnaly: false
  },
  dev: {
    env: 'development',
    port: 8088,
    output: join('../dist'),
    devtool: 'inline-source-map',
    publicPath: './',
    proxy: {}
  },
  join
}
