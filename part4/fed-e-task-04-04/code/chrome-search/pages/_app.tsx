import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'core-js';
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  const { Component, pageProps, store } = pageProps;
  
    return <Container>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </Container>
}


// 根据参数获取其对应的数据
export async function getStaticProps({ params }) {
  const countryMap = ['cn', 'en', 'hk', 'es'] // 语言列表
  let lang = 'cn'
  const reg = /\/([a-z]+)\/?/
  const langMatch = ctx.req.url.match(reg) ? ctx.req.url.match(reg)[1] : null
  const langIndex = countryMap.indexOf(langMatch)
  
  if (langMatch && langIndex !== -1) lang = countryMap[langIndex]
  ctx.store.dispatch({ type: 'LANG_INIT', lang })

  let pageProps
  try {
    pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  } catch (err) {
    pageProps = {}
  }
  return { pageProps };
}
}

export default MyApp;
