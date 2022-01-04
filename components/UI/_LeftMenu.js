import ContactsIndex from "../Contacts.js/ContactsIndex"
import CategoriesList from "../Categories/CategoriesList"

export default function LeftMenu({ contacts, categories }) {
  return <>
    <CategoriesList categories={categories} />
    <ContactsIndex contacts={contacts} />
  </>
}
