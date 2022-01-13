import { Grid } from '@mui/material'
import { MyContainer } from './UIUnits'
import { Header } from './Header'
import LeftMenu from './LeftMenu'
import { RightMenu } from './RightMenu_'

export default function Layout({ children }) {

  return <MyContainer>
    <Header />
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <LeftMenu />
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={3}>
        <RightMenu />
      </Grid>
    </Grid>
  </MyContainer>
}
