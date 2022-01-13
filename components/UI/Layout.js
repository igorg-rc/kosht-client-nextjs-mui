import { Grid } from '@mui/material'
import { MyContainer } from './UIUnits'
import { Header } from './Header'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Item, LangSwitcher, LeftMenuList, SectionTitle, SubscribeInput } from './UIUnits'
import { useState } from 'react'
// import LeftMenu from './LeftMenu'
// import { RightMenu } from './RightMenu_'


export default function Layout({ children }) {
  const { locale, locales } = useRouter()
  const greeting = locale === "en" ? "Hello World!" : "Привіт, Світ!"
  const [userInput, setUserInput] = useState("")
  const { t } = useTranslation('common')
  const fetcher = url => axios.get(url).then(res => res.data)
  const BASE_API_PATH = "https://kosht-api.herokuapp.com/api"

  const {data: categories, error: categoriesError} = useSWR(`${BASE_API_PATH}/categories`, fetcher)
  const {data: contacts, error: contactsError}     = useSWR(`${BASE_API_PATH}/contacts`, fetcher)
  const {data: tags, error: tagsError}             = useSWR(`${BASE_API_PATH}/tags`, fetcher)
  
  const onSubscribe = async e => { 
    const API_URL = `${BASE_API_PATH}/users`
    const success_message = `New subscriber with email ${userInput} was successfuly created!`
    try {
      if (userInput && userInput !== "") {
        await axios.post(API_URL, {email: userInput})
          .then(res => alert(success_message))
          .catch(error => console.log(error))
      } else {
        return
      }
      location.reload()
    } catch (error) {
      alert(error)
    }
  }

  if (categoriesError) return <div>Error: failed to load categories</div>
  if (tagsError) return <div>Error: failed to load tags</div>
  if (contactsError) return <div>Error: failed to load contacts</div>
  if (!categories) return null
  if (!tags) return null
  if (!contacts) return null

  return <MyContainer>
    <Header />
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Item>
          <LeftMenuList 
            items={categories} 
            locale={locale} 
            item="category" 
          /> 
          <LeftMenuList 
            items={tags} 
            locale={locale} 
            item="tag" 
          />
          <SectionTitle 
            title={t('leftMenu.followUs')} 
          />
          <LeftMenuList 
            items={contacts.data} 
            locale={locale} 
          />
          <SectionTitle 
            title={t('leftMenu.subscribeHeader')} 
          />
          <SubscribeInput 
            placeholder={t('leftMenu.subscribePlaceholder')} 
            subscribe={t('leftMenu.subscribeLink')} 
            onChange={e => setUserInput(e.target.value)}
            onSubmit={onSubscribe} 
          />
        </Item>
        <Item>
          <LangSwitcher locales={locales} />
        </Item>
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={3}>
        {/* <RightMenu /> */}
        <Item>
          <p>{t('right_menu')}</p>
          <h3>{t('welcome_msg')}</h3>
          <p>{greeting}</p>
        </Item>
      </Grid>
    </Grid>
  </MyContainer>
}
