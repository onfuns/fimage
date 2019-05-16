import { observable, action } from 'mobx'
import { compressImg } from '../actions'
const fs = nodeRequire('fs-extra')
import { formatFileSize, getBuildPath } from '../utils/util'

class File {
  @observable files = []

  @action
  compress(files) {
    this.files = [...this.files, ...files]
    //实现类似进度条，newsize为压缩后文件大小，newsize有值则压缩完成
    this.files.map((file, index) => {
      if (file.newsize) return file //过滤掉已压缩
      if (file.size < 100 * 1000) { //小于100kb不压缩
        fs.copySync(file.path, getBuildPath(file.path) + '/' + file.name)
        this.setFileInfo(index, {
          ...file,
          newSize: formatFileSize(file.size),
          status: 'success'
        })
        return
      }
      compressImg(file.path)
        .then(data => {
          let newSize = 0
          if (data.length) {
            newSize = formatFileSize(fs.statSync(data[0].path).size)
          }
          this.setFileInfo(index, {
            ...file,
            newSize,
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
      path: file.path,
      newSize: file.newSize,
      name: file.name,
      size: file.size,
      newPath: getBuildPath(file.path) + '/' + file.name,
      status: file.status
    }
  }

  reset() {
    this.files = []
  }
}

export default new File()
