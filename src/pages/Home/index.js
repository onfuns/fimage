import React, { Component } from 'react'
import { Button } from 'antd'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import DropArea from '../../components/DropArea'
import FileArea from '../../components/FileArea'
import './style.less'

@inject('fileStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.fileStore = props.fileStore
    this.fileTypes = ['.jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
    this.state = {
      showDropArea: false
    }
  }

  onDrop = files => {
    this.fileStore.compress(files)
    this.setState({ showDropArea: false })
  }

  render() {
    const { showDropArea } = this.state
    const files = toJS(this.fileStore.files)
    console.log(files)
    return (
      <div className='lay-main'>
        {showDropArea ? (
          <DropArea
            onDragLeave={() => this.setState({ showDropArea: false })}
            onDropArea={this.onDrop}
            onDropPanel={() => this.setState({ showDropArea: false })}
          />
        ) : (
            <FileArea
              onDragEnter={() => this.setState({ showDropArea: true })}
              files={files}
            />
          )}
        <div className='lay-main-action'>
          <Button
            size='small'
            type='danger'
            ghost
            onClick={() => this.fileStore.reset()}>
            清空
          </Button>
        </div>
      </div>
    )
  }
}

export default Home
