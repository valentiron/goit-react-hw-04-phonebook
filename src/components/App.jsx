import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export default function App() {
  const [contacts, isContacts] = useState(getLocalStContacts);
  const [filter, isFilter] = useState('');
  const filterContacts = getFilterContacts();

  function getLocalStContacts() {
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));

    if (localStorageContacts) {
      return localStorageContacts;
    }
    return [];
  }

  function addNewContact(name, number) {
    const newContact = { id: nanoid(), name, number };

    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already added in contacts`);
    }

    isContacts([...contacts, newContact]);
  }

  function changeFilter(event) {
    isFilter(event.currentTarget.value);
  }

  function getFilterContacts() {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  }

  function deleteContact(IdContact) {
    const newContactList = contacts.filter(contact => contact.id !== IdContact);

    isContacts(newContactList);
  }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />

      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList onDelete={deleteContact} contacts={filterContacts} />
    </div>
  );
}
