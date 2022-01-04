import { Container, Grid } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Header } from './Header'

export default function Layout({ children, users }) {
  return (
    <Container>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={3}>
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

export async function getStaticProps(context) {
  const usersList = await axios.get('https://jsonplaceholder.typicode.com/users')
  const users = usersList.data

  return { 
    props: { users }
  }
}