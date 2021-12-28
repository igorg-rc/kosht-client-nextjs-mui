import { Container } from '@mui/material'
import React from 'react'
import { Header } from './Header'

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
