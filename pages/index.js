
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles, useTheme } from '@mui/styles';
import LeftMenu from '../components/UI/_LeftMenu';
import axios from 'axios';
import Content from '../components/Example/Content';
import Link from 'next/link';
// import withLayout, {getStaticProps} from "../components/containers/withLayout"

const useStyles = makeStyles(theme => ({
  paragraph: { color: 'red', fontSize: 30 }
}))

const Index = props => {
  const {
    users, 
    posts, 
    comments, 
    albums, 
    contacts, 
    categories
  } = props

  const theme = useTheme()

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    marginBottom: 10
    // height: '100vh'
  }));

  return (
    <>
    {posts?.map(i => (
    <Item>
      <Link 
        style={{ color: '#000', textDecoration: 'none' }}
        href={i.slug}>
          {i.title}
        </Link>
    </Item>
    ))}
    </>
  );
}


export default Index

export async function getStaticProps(context) {
  const fetchedPosts = await axios.get('https://kosht-api.herokuapp.com/api/posts', { params: { _limit: 5 } })  
  const fetchedUsers = await axios.get('https://jsonplaceholder.typicode.com/users', { params: { _limit: 5 } })
  const fetchedComments = await axios.get('https://jsonplaceholder.typicode.com/comments', { params: { _limit: 5 } })
  const fetchedAlbums = await axios.get('https://jsonplaceholder.typicode.com/albums', { params: { _limit: 5 } })
  const fetchedContacts = await axios.get('https://kosht-api.herokuapp.com/api/contacts')
  const fetchedCategories = await axios.get('https://kosht-api.herokuapp.com/api/categories')
  const posts = fetchedPosts.data
  const categories = fetchedCategories.data
  const contacts = fetchedContacts.data
  const comments = fetchedComments.data
  const users = fetchedUsers.data
  const albums = fetchedAlbums.data

  return {
    props: {users, posts, comments, albums, contacts, categories} 
  }
}