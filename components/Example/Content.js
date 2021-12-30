import Component from "./Component"
import { Typography } from "@mui/material"

export default function Content(props) {
  const { users, posts, comments, albums } = props

  return <>
    <Component 
      users={users} 
      posts={posts} 
      comments={comments} 
    />
    {albums.map(item => (
      <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '2px solid pink', borderRadius: 5 }}>
        <h3>{item.id}</h3>
        <Typography component="p">{item.title}</Typography>
      </div>
    ))}
  </>
}
