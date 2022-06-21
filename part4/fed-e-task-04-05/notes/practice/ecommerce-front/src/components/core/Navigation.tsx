import React, { FunctionComponent } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState } from 'connected-react-router'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

interface NavigationProps {}

function useActive(currentPath: string, path: string): string {
  return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation: FunctionComponent<NavigationProps> = () => {
  const router = useSelector<AppState, RouterState>((state) => state.router)
  // ! TODO
  // const pathname = router.location.pathname
  const pathname = '/'
  const isHome = useActive(pathname, '/')
  const isShop = useActive(pathname, '/shop')
  const isSignin = useActive(pathname, '/signin')
  const isSignup = useActive(pathname, '/signup')
  const isDashboard = useActive(pathname, getDashboardUrl())

  function getDashboardUrl() {
    let url = '/user/dashboard'
    if (isAuth()) {
      const {
        user: { role },
      } = isAuth() as Jwt

      if (role === 1) {
        url = '/admin/dashboard'
      }
    }
    return url
  }

  return (
    <Menu mode='horizontal'>
      <Menu.Item key='home' className={isHome}>
        <Link to='/'>首页</Link>
      </Menu.Item>
      <Menu.Item key='shop' className={isShop}>
        <Link to='/shop'>商城</Link>
      </Menu.Item>
      {!isAuth() && (
        <>
          <Menu.Item key='signin' className={isSignin}>
            <Link to='/signin'>登录</Link>
          </Menu.Item>
          <Menu.Item key='signup' className={isSignup}>
            <Link to='/signup'>注册</Link>
          </Menu.Item>
        </>
      )}
      {isAuth() && (
        <Menu.Item key='dashboard' className={isDashboard}>
          <Link to={getDashboardUrl()}>dashboard</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

export default Navigation
