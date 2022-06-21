import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import { API } from './config'
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css'
import './style.css'

console.log('API: ', API)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
