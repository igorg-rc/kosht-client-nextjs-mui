
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/styles';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const loadData = async locale => {
  const response = await fetch("/api/hello", { headers: { "Accept-Language": locale } })
  const data = response.json()
  return data 
}

const loadCategories = async locale => {
  const categories = await fetch("https://kosht-api.herokuapp.com/api/categories", { headers: { "Accept-Language": locale } })
  const categoriesData = categories.json()
  return categoriesData
}

const Index = props => {
  const {
    users, 
    posts, 
    comments, 
    albums, 
    contacts, 
    categories,
  } = props

  const {locale, locales} = useRouter()
  const theme = useTheme()
  const router = useRouter()
  const { slug } = router.query
  const {data} = useSWR([locale, "hello"], loadData)
  const { t } = useTranslation('common')
  // const {categoriesData} = useSWR([locale, "categories"], loadCategories)

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    marginBottom: 10
  }));

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
    {posts?.slice(0, 5).map(i => (
      <Item>
        <Link 
          style={{ color: '#000', textDecoration: 'none' }}
          href={{ pathname: `/${i.slug}`, query: slug }}>{i.title}
        </Link>
      </Item>
    ))}
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}


export default Index

export async function getStaticProps({ locale }) {
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
    props: {users, posts, comments, albums, contacts, categories, ...await serverSideTranslations(locale, ['common']) } 
  }
}