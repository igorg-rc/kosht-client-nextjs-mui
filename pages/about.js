import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import axios from "axios"

const About = ({users, posts}) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My first changes in this template
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Here will be site of kosht
        </Button>
        {users.map(item => (
          <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '1px solid blue', borderRadius: 5 }}>
            <h3>{item.name}</h3>
            <Typography component="p">{item.email}</Typography>
          </div>
        ))}

        {posts.map(item => (
          <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '1px solid red', borderRadius: 5 }}>
            <h3>{item.title}</h3>
            <Typography component="p">{item.body}</Typography>
          </div>
        ))}

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

// console.log(posts)

export default About;

export async function getStaticProps(context) {
  const fetchedUsers = await axios.get('https://jsonplaceholder.typicode.com/users')
  const fetchedPosts = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const users = fetchedUsers.data
  const posts = fetchedPosts.data

  return {
    props: {users, posts}, // will be passed to the page component as props
  }
}