const { join } = require('./util')

module.exports = {
  tray: {
    show: false,
    icon: join('../resources/icon.png')
  },
  rendererPath: join('../renderer_process'),
  rendererDevPath: join('../dist'),
  devtools: {
    open: false,
    mode: 'bottom' // //detach right bottom
  }
}
