import React from 'react'
import { renderRoutes } from 'react-router-config'
import Loadable from 'react-loadable'

const loading = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>
  } else if (pastDelay) {
    return (
      <div className='loading'>
        <img src={require('./assets/images/loading.svg')} />
      </div>
    )
  } else {
    return null
  }
}
const delay = 200
const Root = ({ route }) => renderRoutes(route.routes)

export default () => {
  const routes = [
    {
      component: Root,
      routes: [
        {
          path: '/',
          exact: true,
          component: Loadable({
            loader: () => import('./pages/Home'),
            loading,
            delay
          })
        }
      ]
    }
  ]
  return renderRoutes(routes)
}
