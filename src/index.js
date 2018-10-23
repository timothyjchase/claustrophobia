import React from 'react'
import ReactDOM from 'react-dom'
import GameStore from './GameStore'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App game={new GameStore()} />, document.getElementById('root'))

serviceWorker.register()
