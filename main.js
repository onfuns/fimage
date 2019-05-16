const electron = require('electron')
const path = require('path')
const { app, Menu, BrowserWindow } = electron

const IS_DEV = process.env.NODE_ENV == 'development'
IS_DEV && require('electron-reload')(path.join(__dirname, 'dist'))

/** 设置菜单*/
function setMenu() {
  let menuTemplate = [
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          role: 'undo'
        },
        {
          label: '重做',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
        {
          label: '删除',
          role: 'delete'
        },
        {
          label: '全选',
          role: 'selectall'
        }
      ]
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '关于',
          click() {
            electron.shell.openExternal(
              'https://github.com/onfuns/fimage'
            )
          }
        }
      ]
    }
  ]
  if (process.platform === 'darwin') {
    menuTemplate.unshift({
      label: app.getName(),
      submenu: [
        {
          label: '退出',
          role: 'quit'
        }
      ]
    })
  }
  if (!IS_DEV) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
  }
}

/** create window begin */
let win = null
function createWindow() {
  win = new BrowserWindow({
    webPreferences: { webSecurity: false },
    width: 410,
    height: 600,
    resizable: false,
    title: 'fimage',
    show: false
  })
  win.loadURL(
    IS_DEV
      ? `file://${__dirname}/.electron/index.html`
      : `file://${__dirname}/index.html`
  )
  IS_DEV && win.webContents.openDevTools({ mode: 'bottom' })
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('close', event => {
    if (app.quitting) {
      win = null
    } else {
      event.preventDefault()
      win.hide()
    }
  })
  setMenu()
}
/** create window end */

app.on('ready', createWindow)

app.on('activate', () => {
  win.show()
})

app.on('before-quit', () => (app.quitting = true))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
