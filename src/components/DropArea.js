import React from 'react'
import { message } from 'antd'
import { readFiles } from '../utils/util'
import './dropArea.less'

let lastenter = null
let fileTypes = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.webp']

const onDragEnter = (e, props) => {
  e.persist()
  lastenter = e.target
}

const check = name => {
  for (let v of fileTypes) {
    if (name.toLowerCase().indexOf(v) > -1) {
      return true
    }
  }
  return false
}

const onDropArea = (e, props) => {
  e.persist()
  let invalidFile = [],
    validFile = []
  Array.prototype.slice.call(e.dataTransfer.files).map(({ path }) => {
    readFiles(path, fileTypes, file => {
      if (!check(file.name)) {
        //不符合格式的文件
        invalidFile.push(file.name)
      } else {
        validFile.push(file)
      }
    })
  })
  invalidFile.map(item => {
    message.warn(`${item} 格式无效`)
  })
  props.onDropArea(validFile)
}

const onDragOver = e => {
  e.preventDefault()
  document.querySelector('#comp-drop-area').classList.add('comp-drop-hover')
}

export default props => {
  return (
    <div
      className='comp-drop'
      onDragEnter={e => onDragEnter(e, props)}
      onDragOver={e => onDragOver(e)}
      onDrop={props.onDropPanel}
      onDragLeave={e => {
        e.persist()
        if (lastenter == e.target) {
          props.onDragLeave()
        }
      }}>
      <div
        id='comp-drop-area'
        className='comp-drop-area'
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDropArea(e, props)}>
        <img
          src={require('../assets/images/file.png')}
          width='40'
          height='40'
        />
        <p>拖入文件放入此区域</p>
      </div>
    </div>
  )
}
