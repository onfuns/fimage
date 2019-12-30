const { app, Menu, Tray } = require('electron')
const { tray } = require('./config')

const setTray = (win, options = []) => {
  let trayTool = new Tray(tray.icon)
  const trayMemu = [
    {
      label: app.getName(),
      click() {
        win.show()
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click() {
        app.quit()
      }
    },
    ...options
  ]
  const contextMenu = Menu.buildFromTemplate(trayMemu)
  trayTool.setContextMenu(contextMenu)
  trayTool.setToolTip(app.getName())
  return trayTool
}

module.exports = {
  setTray
}
