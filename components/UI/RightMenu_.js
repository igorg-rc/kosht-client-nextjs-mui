import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { Item } from "./UIUnits"

export const RightMenu = props => {
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const greeting = locale === "en" ? "Hello World!" : "Привіт, Світ!"

  return <>
    <Item>
      <p>{t('right_menu')}</p>
      <h3>{t('welcome_msg')}</h3>
      <p>{greeting}</p>
    </Item>
  </>
}