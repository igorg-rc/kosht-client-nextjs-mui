import { Container, Grid } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Header } from './Header'
import useSWR from 'swr'
import Link from 'next/link'

export default function Layout({ children, posts }) {

  const {data, error} = useSWR("user", async () => {
    const res = await axios.get("https://kosht-api.herokuapp.com/api/categories")
    const data = res.data
    console.log(data)
    return data
  })


  if (error) return <div>Error: failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Container>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {data.map(i => (
            <div>
              <Link href={`/categories/${i.slug}`}>{i.title_en}</Link>
            </div>
          ))}
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </Container>
  )
}
