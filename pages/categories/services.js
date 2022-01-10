import axios from "axios"
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  marginBottom: 10
  // height: '100vh'
}));

const Services = props => {
  const {posts} = props
  return (
    <div>
      {/* Categories -> Services */}
      {posts?.map(i => (
        <Item>
          <Link 
            style={{ color: '#000', textDecoration: 'none' }}
            href={`/${i.slug}`}>
              {i.title}
            </Link>
        </Item>
      ))}
    </div>
  )
}

export default Services

export async function getStaticProps({locale}) {
  const res = await axios.get(`https://kosht-api.herokuapp.com/api/posts/categories/services`)
  const posts = res.data

  return {
    props: { posts, ...await serverSideTranslations(locale, ('common')) }
  }
}