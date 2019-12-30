const { BrowserWindow } = require('electron')

const createWindow = (options = {}) => {
  return new BrowserWindow({
    webPreferences: { webSecurity: false },
    width: 410,
    height: 600,
    resizable: false,
    title: 'Fimage',
    show: false,
    ...options
  })
}

module.exports = {
  createWindow
}
