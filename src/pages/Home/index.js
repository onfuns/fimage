import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import { toJS } from 'mobx'
import { observer, MobXProviderContext } from 'mobx-react'
import DropArea from '../../components/DropArea'
import FileArea from '../../components/FileArea'
import './style.less'

const Home = observer(props => {
  const { fileStore } = useContext(MobXProviderContext)
  const [dropAreaVisible, setDropAreaVisible] = useState(false)
  const files = toJS(fileStore.files)
  const onDrop = files => {
    fileStore.compress(files)
    setDropAreaVisible(false)
  }

  return (
    <div className='lay-main'>
      {dropAreaVisible ? (
        <DropArea
          onDragLeave={() => setDropAreaVisible(false)}
          onDropArea={onDrop}
          onDropPanel={() => setDropAreaVisible(false)}
        />
      ) : (
        <FileArea onDragEnter={() => setDropAreaVisible(true)} files={files} />
      )}
      <div className='lay-main-action'>
        <Button
          size='small'
          type='danger'
          ghost
          onClick={() => fileStore.reset()}>
          清空
        </Button>
      </div>
    </div>
  )
})
export default Home
