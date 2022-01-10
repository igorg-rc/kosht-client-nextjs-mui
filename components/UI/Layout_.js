import { Container, Grid, Paper } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Header } from './Header'
import useSWR from 'swr'
import Link from 'next/link'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  marginBottom: 10
  // height: '100vh'
}));

export default function Layout({ children, posts }) {
  const { locale, locales, pathname, replace } = useRouter()
  const { t } = useTranslation()

  const {data, error} = useSWR("user", async () => {
    const res = await axios.get("https://kosht-api.herokuapp.com/api/categories")
    const data = res.data
    console.log(data)
    return data
  })

  let greeting = locale === "en" ? "Hello World!" : "Привіт, Світ!"

  if (error) return <div>Error: failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Container>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            {data.map(i => (
              <div>
                <Link href={`/categories/${i.slug}`}>{locale === "en" ? i.title_en : i.title_ua}</Link>
              </div>
            ))}
          </Item>
          <Item>
            {locales.map(item => (
              <div key={item}>
                <Link href={`/${pathname}`} onClick={() => replace(`/${pathname}`)} locale={item}>{item}</Link>
              </div>
            ))}
          </Item>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          {children}
          <h1>{t('welcome_msg')}</h1>
          <h2>{ greeting }</h2>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <p>{t('common:right_menu')}</p>
            <h3>{t('common:welcome_msg')}</h3>
          </Item>
        </Grid>
      </Grid>
    </Container>
  )
}
