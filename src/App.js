import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactsList from './components/ContactsList/ContactsList';
import SearchContacts from './components/SearchContacts/SearchContacts';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // updateLocalStorage = () => {
  //   const { contacts } = this.state;
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // };

  componentDidMount() {
    console.log('Mount');
    // const { contacts } = this.state;
    const savedContacts = localStorage.getItem('contacts');
    console.log(savedContacts);
    this.setState({ savedContacts });
    // const parsedSettings = JSON.parse(settingsFromLS);
  }

  componentDidUpdate() {
    console.log('Update');
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;

    this.setState({ name: name, number: number });
    // console.log(this.state);
    contacts.push({ id: shortid.generate(), name: name, number: number });
    // console.log(contacts);
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <SearchContacts
          value={this.state.filter}
          onChange={this.changeFilter}
        />
        <ContactsList
          contacts={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
