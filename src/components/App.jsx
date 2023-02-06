import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localSt = localStorage.getItem('contacts');
    const parseSt = JSON.parse(localSt);

    if (parseSt) {
      this.setState({ contacts: parseSt });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    const contacts = this.state.contacts;

    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContact = IdContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== IdContact),
    }));
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContacts();
    // console.log(this.state);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.changeFilter} value={filter} />
        <ContactList onDelete={this.deleteContact} contacts={filterContacts} />
      </div>
    );
  }
}

export default App;
