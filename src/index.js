import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as RouterContainer } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from './store'
import Routes from './routes'
import './assets/css/common.less'

const App = () => (
  <Provider {...stores}>
    <RouterContainer>
      <Routes />
    </RouterContainer>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
