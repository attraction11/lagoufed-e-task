import React from 'react'
import { FunctionComponent } from 'react'
import Navigation from './Navigation'
import { PageHeader } from 'antd'

interface LayoutProps {
  children: React.ReactNode
  title: String
  subTitle: String
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  subTitle,
}) => {
  return (
    <div>
      <Navigation />
      <PageHeader className='jumbotron' title={title} subTitle={subTitle} />
      <div style={{ width: '85%', margin: '0 auto' }}>{children}</div>
    </div>
  )
}

export default Layout
