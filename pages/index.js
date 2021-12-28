
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import styled from '@emotion/styled';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  paragraph: { color: 'red', fontSize: 30 }
}))

export default function Index() {
  const styles = useStyles()
  const theme = useTheme()
  const isSM = theme.breakpoints.down('xs')
  const isLG = theme.breakpoints.up('lg')

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <p className={styles.paragraph}>Next.js example</p>
      </Typography>
      <Link href="/about" color={ isSM ? "primary" : "secondary" }>
         Go to the about page
      </Link>
      <ProTip />
      <Copyright />
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
      <Typography variant="h4" component="h1" gutterBottom>
        Next.js example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
    </Box>
  );
}
