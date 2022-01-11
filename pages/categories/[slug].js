import axios from "axios"
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  marginBottom: 10
  // height: '100vh'
}));

export default function Categories(props) {
  const { posts } = props
  const { query } = useRouter()
  const { slug } = query
  return (
    <div>
      {/* Categories -> Credits */}
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

export async function getStaticPaths()  {
  const res = await axios.get('https://kosht-api.herokuapp.com/api/categories')
  const categories = res.data

  const paths = categories.map(category => (
    { params: { slug: category.slug } }
  ))
  
  return {
    fallback: 'blocking',
    paths
  }
}

export async function getStaticProps(context) {
  const res = await axios.get(`https://kosht-api.herokuapp.com/api/posts/categories/${context.params.slug}`)
  const posts = res.data

  return {
    props: { posts, ...await serverSideTranslations(context.locale, ["common"]) }
  }
}