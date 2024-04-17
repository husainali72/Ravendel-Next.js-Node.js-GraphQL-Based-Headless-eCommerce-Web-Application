/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import "../styles/globals.css";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import App from "next/app";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider, getSession } from "next-auth/react";
import SSRProvider from "react-bootstrap/SSRProvider";
import Router from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/breadcrumb/loading";
import { useRouter } from "next/router";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import TagManager from "react-gtm-module";
import MegaMenu from "../components/megaMenu";
import Head from "next/head";
import { AlternativeThemeProvider } from "../components/themeContext";
import { useSelector } from "react-redux";
import { get } from "lodash";
import PaypalScriptLoader from "../components/paypalScriptLoader";

const clientSideEmotionCache = createEmotionCache();

export function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState(false);
  const settings = useSelector((state) => state.setting);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  const tagManagerArgs = {
    gtmId: "GTM-XXXX",
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  useEffect(() => {
    let paypalmode = get(settings, "setting.payment.paypal.test_mode");
    let clientId = "";
    if (paypalmode) {
      clientId = get(settings, "setting.payment.paypal.sandbox_client_id");
    } else {
      clientId = get(settings, "setting.payment.paypal.live_client_id");
    }
    setPaypalClientId(clientId);
  }, [settings]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <SSRProvider>
          <SessionProvider session={pageProps.session}>
            <AlternativeThemeProvider>
              {loading && <LoadingSpinner />}
              {openMenu && (
                <MegaMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
              )}
              <Layout setOpenMenu={(open) => setOpenMenu(open)}>
                <Component
                  {...pageProps}
                  key={router.asPath}
                  openMenu={openMenu}
                  setOpenMenu={(open) => setOpenMenu(open)}
                />
                <Script
                  src="https://kit.fontawesome.com/60e73f4013.js"
                  crossOrigin="anonymous"
                ></Script>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <PaypalScriptLoader clientId={paypalClientId} />
                <link
                  rel="stylesheet"
                  type="text/css"
                  charSet="UTF-8"
                  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
              </Layout>
            </AlternativeThemeProvider>
          </SessionProvider>
        </SSRProvider>
      </CacheProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext = AppContext) => {
  const session = await getSession({ req: appContext.ctx.req });
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, session };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(MyApp);
