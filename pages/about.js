import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const API_LINK = 'https://jsonplaceholder.typicode.com'


const About = ({ users, posts, contacts }) => {
  const { t } = useTranslation("footer");
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My first changes in this template
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Here will be site of kosht
        </Button>
        <p>{t("description")}</p>

        {contacts.data.map((item) => (
          <div
            key={item._id}
            style={{
              padding: 20,
              margin: "10px 0",
              border: "1px solid red",
              borderRadius: 5,
            }}
          >
            <h3>
              {router.pathname.includes("en") ? item.title_en : item.title_ua}
            </h3>
            <a href={item.link} target="_blank">
              {item.link}
            </a>
          </div>
        ))}

        {users.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 20,
              margin: "10px 0",
              border: "1px solid blue",
              borderRadius: 5,
            }}
          >
            <h3>{item.name}</h3>
            <Typography component="p">{item.email}</Typography>
          </div>
        ))}

        {posts.map((item) => (
          <div
            key={item.title}
            style={{
              padding: 20,
              margin: "10px 0",
              border: "1px solid red",
              borderRadius: 5,
            }}
          >
            <h3>{item.title}</h3>
            <Typography component="p">{item.body}</Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default About;

export async function getServerSideProps(context) {
  const fetchedUsers = await axios.get(`${API_LINK}/users`)
  const fetchedPosts = await axios.get(`${API_LINK}/posts`)
  const fetchedContacts = await axios.get(`${API_LINK}/contacts`)
  const contacts = fetchedContacts.data
  const users = fetchedUsers.data
  const posts = fetchedPosts.data

  return {
    props: { 
      users, 
      posts, 
      contacts,
      ...await serverSideTranslations(context.locale, "common")
    }
  }
}
