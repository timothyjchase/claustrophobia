import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer, { initialState } from './reducer'

const middleware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
