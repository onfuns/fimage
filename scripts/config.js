module.exports = {
  build: {
    env: 'production',
    basePath: '../src',
    output: '../package/dist',
    template: '../src/index.html',
    publicPath: './',
    bundleAnaly: false
  },
  dev: {
    env: 'development',
    port: 8088,
    output: '../.electron',
    devtool: 'inline-source-map',
    publicPath: './',
    proxy: {}
  }
}
