import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import Layout from '../components/UI/Layout'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SpinnerContent } from '../components/UI/UIUnits'
import SimpleReactLightbox from 'simple-react-lightbox'
import '../styles/index.css'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

const MyApp = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, layoutProps } = props
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const titleUA = "Кошт | Говоримо про особисті фінанси"
  const titleEN = "Kosht | We talk about personal finances"

  useEffect(() => {
    const handleLoadingStart =  url => url !== router.pathname ? setLoading(true) : setLoading(false)
    const handleLoadingComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleLoadingStart)
    router.events.on("routeChangeComplete", handleLoadingComplete)
    router.events.on("routeChangeError", handleLoadingComplete)

    return () => {
      router.events.off("routeChangeStart", () => setLoading(false))
      router.events.off("routeChangeComplete", url => setLoading(false))
      router.events.off("routeChangeError", url => setLoading(false))
    }
  }, [router])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{t("head.mainTitle")} | {t("head.indexTitle")}</title>
        <title>{router.locale === "uk" ? titleUA : titleEN}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout {...layoutProps}>
          <SpinnerContent loading={loading} locale={router.locale} />
          <div style={{ display: loading ? 'none' : 'block' }}>
            <SimpleReactLightbox>
              <Component {...pageProps} />
            </SimpleReactLightbox>
          </div>
        </Layout>
        </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp)

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}