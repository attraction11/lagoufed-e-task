import React, { FunctionComponent } from 'react'
import Layout from './Layout'

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <Layout title='首页' subTitle='欢迎你~'>
      Home
    </Layout>
  )
}

export default Home
