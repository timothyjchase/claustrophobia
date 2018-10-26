import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MainAppContainer from './containers/MainAppContainer'
import * as serviceWorker from './serviceWorker'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <MainAppContainer />
  </Provider>,
  document.getElementById('root'), // eslint-disable-line no-undef
)

serviceWorker.register()
