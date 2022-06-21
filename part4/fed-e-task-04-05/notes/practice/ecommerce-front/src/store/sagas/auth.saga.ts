import { put, takeEvery } from 'redux-saga/effects'
import {
  SIGNUP,
  SignupAction,
  signupSuccess,
  signupFail,
  SIGNIN,
  SigninAction,
  signinSuccess,
  signinFail,
} from '../actions/auth.action'
import axios from 'axios'
import { API } from '../../config'

function* handleSignup(action: SignupAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload)
    yield put(signupSuccess())
  } catch (error) {
    console.log('error: ', error);
    yield put(signupFail('error'))
  }
}

function* handleSignin(action: SigninAction): any { 
  try {
    let response = yield axios.post(`${API}/signin`, action.payload)
    localStorage.setItem('jwt', JSON.stringify(response.data))
    yield put(signinSuccess())
  } catch (error) {
    yield put(signinFail('error'))
  }
}

export default function* authSaga() {
  // 注册
  yield takeEvery(SIGNUP, handleSignup)
  // 登录
  yield takeEvery(SIGNIN, handleSignin)
}
