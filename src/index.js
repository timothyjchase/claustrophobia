import React from 'react'
import ReactDOM from 'react-dom'
import GameStore from './GameStore'
import App from './App'

ReactDOM.render(<App game={new GameStore()} />, document.getElementById('root'))
