import axios from "axios"

export default function Post({ post }) {
  return <div style={{ border: '1px solid #2E3A59', padding: '0 15px', borderRadius: 6 }}>
    <h4>{post.title}</h4>
     <p style={{ textAlign: 'justify' }} >{post.body}</p> 
  </div>
}


export async function getStaticPaths() {
  const res = await axios.get('https://kosht-api.herokuapp.com/api/posts')
  const posts = res.data

  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`https://kosht-api.herokuapp.com/api/posts/slug/${params.slug}`)
  const post = res.data 

  return { props: { post } }
}