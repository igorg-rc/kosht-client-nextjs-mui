import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 800,
    color: theme.palette.text.primary,
    fontFamily: 'Gilroy, sans-serif',
  }
}))

export const SectionTitle = ({ title }) => {
  const styles = useStyles()
  return <Typography className={styles.title} variant="h1" component="h1">{title}</Typography>
}