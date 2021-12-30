
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { makeStyles, useTheme } from '@mui/styles';
import { Container } from '@mui/material';
import LeftMenu from '../components/UI/LeftMenu';
import axios from 'axios';
import Content from '../components/Example/Content';

const useStyles = makeStyles(theme => ({
  paragraph: { color: 'red', fontSize: 30 }
}))

export default function Index({users, posts, comments, albums, contacts, LeftMenuProps}) {
  const theme = useTheme()

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#fff",
    background: theme.palette.primary.main,
    // height: '100vh'
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            LeftMenu
            {/* <LeftMenu {...LeftMenuProps} /> */}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Content 
              users={users} 
              posts={posts} 
              comments={comments} 
              albums={albums}
            />

          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Right menu</Item>
        </Grid>
      </Grid>
    </Box>
  );

}

export async function getStaticProps(context) {
  const fetchedUsers = await axios.get('https://jsonplaceholder.typicode.com/users', { params: { _limit: 5 } })
  const fetchedPosts = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: { _limit: 5 } })  
  const fetchedComments = await axios.get('https://jsonplaceholder.typicode.com/comments', { params: { _limit: 5 } })
  const fetchedAlbums = await axios.get('https://jsonplaceholder.typicode.com/albums', { params: { _limit: 5 } })
  const fetchedContacts = await axios.get('https://kosht-api.herokuapp.com/api/contacts')
  const comments = fetchedComments.data
  const users = fetchedUsers.data
  const posts = fetchedPosts.data
  const contacts = fetchedContacts.data
  const albums = fetchedAlbums.data

  return {
    props: {users, posts, contacts, comments, albums} 
  }
}