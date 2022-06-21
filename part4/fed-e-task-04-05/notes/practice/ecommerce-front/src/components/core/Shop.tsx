import React, { FunctionComponent } from 'react'
import Layout from './Layout'

interface ShopProps {}

const Shop: FunctionComponent<ShopProps> = () => {
  return (
    <Layout title='商城' subTitle='消费吧~'>
      Shop
    </Layout>
  )
}

export default Shop
