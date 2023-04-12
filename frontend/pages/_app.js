import '../styles/globals.css'
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
// import { getStaticPaths } from './product/[singleproduct]';
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module';

export function MyApp({
  Component,
  pageProps,

}) {
  const router = useRouter()
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
    <SSRProvider>
      <SessionProvider session={pageProps.session}>
        {loading && <LoadingSpinner />}
        <Layout>
          <Component {...pageProps} key={router.asPath} />
          {/* <Script src="https://kit.fontawesome.com/60e73f4013.js" ></Script> */}
          <Script src="https://kit.fontawesome.com/60e73f4013.js" crossOrigin="anonymous"></Script>
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

        </Layout>
      </SessionProvider>
    </SSRProvider>
  </>

  )
}
MyApp.getInitialProps = async (appContext = AppContext) => {
  // perhaps getSession(appContext.ctx) would also work
  const session = await getSession({ req: appContext.ctx.req })
  const appProps = await App.getInitialProps(appContext)
  console.log("session", session)
  return { ...appProps, session }
}



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

//     );
//   }
// }
//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={}>
//       <Layout>
//           <Component {...pageProps} />
//       </Layout>
//     </Provider>
//   )
// }

// export default MyApp
