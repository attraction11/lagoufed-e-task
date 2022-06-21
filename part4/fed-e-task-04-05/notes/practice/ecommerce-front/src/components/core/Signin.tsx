import React, { FunctionComponent } from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result } from 'antd'
import { SigninPayload, signin } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthSate } from '../../store/reducers/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Navigate } from 'react-router-dom'

interface SiginProps {}

const Sigin: FunctionComponent<SiginProps> = () => {
  const dispatch = useDispatch()

  // 登录表单的提交
  const onFinish = (value: SigninPayload) => {
    console.log('value: ', value)
    dispatch(signin(value))
  }

  // 1、获取登录结果
  const auth = useSelector<AppState, AuthSate>((state) => state.auth)

  // 2、登录失败显示错误信息
  const showError = () => {
    if (auth.signin.loaded && !auth.signin.success) {
      return (
        <Result
          status='warning'
          title='登录失败!'
          subTitle={auth.signup.message}
        />
      )
    }
  }

  // 3、登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    const auth = isAuth()
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt
      if (role === 0) {
        // 注册用户
        return <Navigate to='/user/dashboard'></Navigate>
      } else {
        // 管理员
        return <Navigate to='/admin/dashboard'></Navigate>
      }
    }
  }

  // 整合from内容
  const signinForm = () => (
    <Form onFinish={onFinish}>
      <Form.Item name='email' label='邮箱'>
        <Input></Input>
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title='登录' subTitle=''>
      {showError()}
      {redirectToDashboard()}
      {signinForm()}
    </Layout>
  )
}

export default Sigin
