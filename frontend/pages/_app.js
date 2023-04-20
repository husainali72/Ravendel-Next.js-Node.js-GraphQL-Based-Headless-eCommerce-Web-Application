import '../styles/globals.css'
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { createWrapper } from "next-redux-wrapper";
import store from '../redux/store';
import App from 'next/app';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { SessionProvider, getSession } from 'next-auth/react'
import SSRProvider from 'react-bootstrap/SSRProvider';
import Router from 'next/router';
import { useState } from 'react';
import LoadingSpinner from "../components/breadcrumb/loading"
import { useRouter } from 'next/router'
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import { ThemeProvider } from '@mui/material';

const clientSideEmotionCache = createEmotionCache();

export function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  })
  return (<>
    <CacheProvider value={emotionCache}>
      <SSRProvider>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            {loading && <LoadingSpinner />}
            <Layout>
              <Component {...pageProps} key={router.asPath} />
              <Script src="https://kit.fontawesome.com/60e73f4013.js" crossOrigin="anonymous"></Script>
              <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
              <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

            </Layout>
          </ThemeProvider>
        </SessionProvider>
      </SSRProvider>
    </CacheProvider>
  </>

  )
}
MyApp.getInitialProps = async (appContext = AppContext) => {
  const session = await getSession({ req: appContext.ctx.req })
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps, session }
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
