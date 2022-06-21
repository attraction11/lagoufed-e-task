import { connectRouter, RouterState } from 'connected-react-router'
import { combineReducers } from 'redux'
import testReducer from './test.reducer'
import { HashHistory } from 'history'
import authReducer, { AuthSate } from './auth.reducer'

export interface AppState {
  router: RouterState,
  auth: AuthSate
}

const createRootReducer = (history: HashHistory) =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
    auth: authReducer
  })

export default createRootReducer
