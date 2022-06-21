import React, { FunctionComponent, useEffect } from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result } from 'antd'
import { SignupPayload, signup, resetSignup } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthSate } from '../../store/reducers/auth.reducer'
import { Link } from 'react-router-dom'

interface SigupProps {}

const Sigup: FunctionComponent<SigupProps> = () => {
  // 获取 dispatch 方法
  const dispatch = useDispatch()

  // 获取表单的操作实例对象
  const [form] = Form.useForm()

  // 获取store中的auth数据
  const auth = useSelector<AppState, AuthSate>((state) => state.auth)

  // 注册表单提交
  const onFinish = (value: SignupPayload) => {
    console.log(value)
    // 发送注册请求
    dispatch(signup(value))
  }

  // 1、注册成功 清空表单
  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields()
    }
  }, [auth])
  // 2、注册成功 显示提示语
  const showSuccess = () => {
    if (auth.signup.loaded && auth.signup.success) {      
      return (
        <Result
          status='success'
          title='注册成功!'
          extra={[
            <Button type='primary' key='console'>
              <Link to='/signin'>登录</Link>
            </Button>,
          ]}
        />
      )
    }
  }
  // 3、注册失败 提示失败原因
  const showError = () => {
    if (auth.signup.loaded && !auth.signup.success) {
      return (
        <Result
          status='warning'
          title='注册失败!'
          subTitle={auth.signup.message}
        />
      )
    }
  }
  // 4、离开页面之前 重置状态
  useEffect(() => {
    return () => {
      dispatch(resetSignup())
    }
  })

  // 整合from内容
  const signupForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name='name' label='昵称'>
        <Input></Input>
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item name='email' label='邮箱'>
        <Input></Input>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title='注册' subTitle='还没有账号吗？注册一个吧'>
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  )
}

export default Sigup
