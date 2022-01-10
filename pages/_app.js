import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '../components/UI/Layout_';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { SpinnerContent } from '../components/UI/Spinners';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, layoutProps } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 useEffect(() => {
   const handleLoadingStart =  url => url !== router.pathname ? setLoading(true) : setLoading(false);
   const handleLoadingComplete = url => setLoading(false);

   router.events.on("routeChangeStart", handleLoadingStart)
   router.events.on("routeChangeComplete", handleLoadingComplete)
   router.events.on("routeChangeError", handleLoadingComplete)
 }, [router])

 const Loading = props => <>
  {
    props.loading && props.locale === "en" 
      ? 
      <h3>Loading...</h3> 
      : 
      (props.loading && props.locale === "uk" ? <h3>Завантаження...</h3> : null)
  }
  </>

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{ router.locale === "en" ? "Kosht | We talk about personal finances" : "Кошт | Говоримо про особисті фінанси" }</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout {...layoutProps}>
          <SpinnerContent loading={loading} locale={router.locale} />
          <div style={{ display: loading ? 'none' : 'block' }}><Component {...pageProps} /></div>
        </Layout>
        </ThemeProvider>
    </CacheProvider>
  );
}


export default appWithTranslation(MyApp);


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};