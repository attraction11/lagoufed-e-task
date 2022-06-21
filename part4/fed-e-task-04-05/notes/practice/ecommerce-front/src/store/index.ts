import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory, HashHistory } from 'history'
import createRootReducer from './reducers'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history: HashHistory = createHashHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

export default store
