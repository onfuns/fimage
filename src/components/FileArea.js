import React from 'react'

const { shell } = nodeRequire('electron')
import './fileArea.less'

export default props => {
  return (
    <div className='comp-file' onDragEnter={props.onDragEnter}>
      {props.files.length > 0 ? (
        <div className='comp-file-area'>
          {props.files.map((item, index) => (
            <div className='comp-file-item' key={index}>
              <div className='comp-file-item-name'>
                <img
                  className='comp-file-item-status'
                  src={require(`../assets/images/${
                    item.status == 'success'
                      ? 'success.png'
                      : item.status == 'error'
                        ? 'error.png'
                        : 'loading.gif'
                    }`)}
                />
                <img className='comp-file-item-logo' src={item.path} />
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.status == 'success'
                      ? item.newSize
                      : item.status == 'error'
                        ? '压缩失败'
                        : '压缩中...'}
                  </p>
                </div>
              </div>
              <a onClick={() => shell.showItemInFolder(item.newPath)}>
                <img
                  className='comp-file-item-down'
                  src={require('../assets/images/open.png')}
                />
              </a>
            </div>
          ))}
        </div>
      ) : (
          <div className='comp-file-default'>
            <img src={require('../assets/images/image.png')} />
            <p>拖入jpg / png / gif 开始压缩，支持文件夹拖入</p>
          </div>
        )}
    </div>
  )
}
