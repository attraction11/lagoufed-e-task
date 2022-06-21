export const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const RESET_SIGNUP = 'RESET_SIGNUP'

// 声明 action
export interface SignupPayload {
  email: String
  name: String
  password: String
}

export interface SignupAction {
  type: typeof SIGNUP
  payload: SignupPayload
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS
}

export interface SignupFailAction {
  type: typeof SIGNUP_FAIL
  message: String
}

export interface ResetSignupAction {
  type: typeof RESET_SIGNUP
}

// 创建 action（注册）
export const signup = (payload: SignupPayload): SignupAction => ({
  type: SIGNUP,
  payload,
})

export const signupSuccess = (): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
})

export const signupFail = (message: String): SignupFailAction => ({
  type: SIGNUP_FAIL,
  message,
})

export const resetSignup = (): ResetSignupAction => ({
  type: RESET_SIGNUP,
})

export const SIGNIN = 'SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'SIGNIN_FAIL'
export const RESET_SIGNIN = 'RESET_SIGNIN'

// 声明 action
export interface SigninPayload {
  email: String
  password: string
}

export interface SigninAction {
  type: typeof SIGNIN
  payload: SigninPayload
}

export interface SigninSuccessAction {
  type: typeof SIGNIN_SUCCESS
}

export interface SigninFailAction {
  type: typeof SIGNIN_FAIL
  message: String
}

// 创建 action（登录）
export const signin = (payload: SigninPayload): SigninAction => ({
  type: SIGNIN,
  payload,
})

export const signinSuccess = (): SigninSuccessAction => ({
  type: SIGNIN_SUCCESS,
})

export const signinFail = (message: String): SigninFailAction => ({
  type: SIGNIN_FAIL,
  message,
})

export type AuthUnionType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
  | ResetSignupAction
  | SigninAction
  | SigninSuccessAction
  | SigninFailAction
