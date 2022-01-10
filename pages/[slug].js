import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"

export default function Post({ post }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { slug } = router.query

  return <div style={{ border: '1px solid #2E3A59', padding: '0 15px', borderRadius: 6 }}>
    <h2>{slug}</h2>
    <h4>{post.title}</h4>
     <p style={{ textAlign: 'justify' }}>{post.body}</p> 
  </div>
}


export async function getStaticPaths() {
  const res = await axios.get('https://kosht-api.herokuapp.com/api/posts')
  const posts = res.data

  const paths = posts.map(post => (
    { params: { slug: post.slug } }
  ))

  // const paths = [
  //   { params: { type: "slug" }, locale: "uk" },
  //   { params: { type: "slug" }, locale: "en" }
  // ]

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const res = await axios.get(`https://kosht-api.herokuapp.com/api/posts/slug/${context.params.slug}`)
  const post = res.data 

  return { 
    props: { 
      params: context.params,
      post, 
      ...await serverSideTranslations(context.locale, ["common"]) 
    } 
  }
}