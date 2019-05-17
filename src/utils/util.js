const electron = global.require('electron')
export const { remote } = electron
export const { BrowserWindow } = remote
const path = nodeRequire('path')
const fs = nodeRequire('fs-extra')
const os = nodeRequire('os')

//格式化文件大小
export const formatFileSize = (fsize, prec = 1) => {
  let rank = 0
  let unit = 'B'

  while (fsize > 1024) {
    fsize /= 1024
    rank += 1
  }

  fsize = fsize.toFixed(prec)
  switch (rank) {
    case 1:
      unit = 'KB'
      break
    case 2:
      unit = 'MB'
      break
    case 3:
      unit = 'GB'
      break
    case 4:
      unit = 'TB'
      break
    default:
      break
  }
  return `${fsize} ${unit}`
}

//读取文件，包括文件夹内容
export const readFiles = async (filePath, names, cb) => {
  try {
    if (isDir(filePath)) {
      const files = fs.readdirSync(filePath)
      files.forEach(file => {
        const filedir = path.join(filePath, file)
        const stats = fs.statSync(filedir)
        if (stats.isFile()) {
          let suffix = filedir.substring(filedir.lastIndexOf('.')).toLowerCase()
          if (names.includes(suffix)) {
            cb &&
              cb({
                path: filedir,
                size: stats.size,
                name: filedir.substring(filedir.lastIndexOf('/') + 1)
              })
          }
        } else if (stats.isDirectory()) {
          readFiles(filedir, names, cb)
        }
      })
    } else {
      const file = fs.statSync(filePath)
      cb &&
        cb({
          path: filePath,
          size: file.size,
          name: filePath.substring(filePath.lastIndexOf('/') + 1)
        })
    }
  } catch (err) {
    console.error('stats error:', err)
  }
}

//是否是文件夹
export const isDir = path => {
  return fs.exists(path) && fs.statSync(path).isDirectory()
}

export const getSeparator = () => {
  const p = os.platform()
  return p === 'darwin' || p === 'linux' ? '/' : '\\'
}