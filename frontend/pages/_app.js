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
import { useEffect, useState } from 'react';
import LoadingSpinner from "../components/breadcrumb/loading"
import { useRouter } from 'next/router'
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import { ThemeProvider } from '@mui/material';
import TagManager from 'react-gtm-module';
const clientSideEmotionCache = createEmotionCache();


export function MyApp({
  Component,
  pageProps,

  emotionCache = clientSideEmotionCache



}) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  })

  const tagManagerArgs = {
    gtmId: 'GTM-XXXX'
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])


  return (<>
    <CacheProvider value={emotionCache}>
      <SSRProvider>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            {loading && <LoadingSpinner />}
            <Layout setOpenMenu={(open) => setOpenMenu(open)}>
              <Component {...pageProps} key={router.asPath} openMenu={openMenu} setOpenMenu={(open) => setOpenMenu(open)} />
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




// export default MyApp;

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

//     //Anything returned here can be accessed by the client
//     return { session, ...pageProps };
//   }

//   render() {
//     //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
//     const { Component, pageProps, session, store } = this.props;

//     return (

//       <SessionProvider session={session}>
//         <Layout>
//           <Component {...pageProps} />
//           {/* <Script src="https://kit.fontawesome.com/60e73f4013.js" ></Script> */}
//           <Script src="https://kit.fontawesome.com/60e73f4013.js" crossOrigin="anonymous"></Script>
//           <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
//           <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
//         </Layout>

//       </SessionProvider>
//       // <Layout>
//       //   <Component {...pageProps} />
//       //   {/* <Script src="https://kit.fontawesome.com/60e73f4013.js" ></Script> */}
//       //   <Script src="https://kit.fontawesome.com/60e73f4013.js" crossOrigin="anonymous"></Script>
//       //   <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
//       //   <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
//       // </Layout>


const makeStore = () => store;
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
