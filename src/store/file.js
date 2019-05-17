import { observable, action } from 'mobx'
import { compressImg } from '../actions'
const fs = nodeRequire('fs-extra')
const path = nodeRequire('path')
import { formatFileSize, getSeparator } from '../utils/util'

export const getFileInfo = filePath => {
  const fileName = filePath.substring(filePath.lastIndexOf(getSeparator()) + 1)
  const buildDir = path.join(path.dirname(filePath), 'build')
  return {
    buildDir,
    newPath: path.join(buildDir, getSeparator(), fileName),
    fileName
  }
}

class File {
  @observable files = []

  @action
  compress(files) {
    this.files = [...this.files, ...files]
    //实现类似进度条，newsize为压缩后文件大小，newsize有值则压缩完成
    this.files.map((file, index) => {
      if (file.newsize) return file //过滤掉已压缩
      if (file.size < 100 * 1000) { //小于100kb不压缩
        fs.copySync(file.path, getFileInfo(file.path).newPath)
        this.setFileInfo(index, {
          ...file,
          newSize: formatFileSize(file.size),
          status: 'success'
        })
        return
      }
      compressImg(file.path, getFileInfo(file.path).buildDir)
        .then(data => {
          this.setFileInfo(index, {
            ...file,
            newSize: data.length ? formatFileSize(fs.statSync(data[0].path).size) : 0,
            status: 'success'
          })
        })
        .catch(err => {
          console.log('compress error:', err)
          this.setFileInfo(index, {
            ...file,
            newSize: 0,
            status: 'error'
          })
        })
    })
  }

  setFileInfo(index, file) {
    this.files[index] = {
      ...file,
      name: getFileInfo(file.path).fileName,
      newPath: getFileInfo(file.path).newPath,
    }
  }

  reset() {
    this.files = []
  }
}

export default new File()
