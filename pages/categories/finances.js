import axios from "axios"
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  marginBottom: 10
  // height: '100vh'
}));

const Finances = props => {
  const {posts} = props
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

export default Finances

export async function getStaticProps(context) {
  const res = await axios.get(`https://kosht-api.herokuapp.com/api/posts/categories/finances`)
  const posts = res.data

  return {
    props: { posts }
  }
}