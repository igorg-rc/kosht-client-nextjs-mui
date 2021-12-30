import ContactsIndex from "../Contacts.js/ContactsIndex";

export default function LeftMenu({ contacts }) {
  return (
    <div>
      <ContactsIndex contacts={contacts} />
    </div>
  )
}
