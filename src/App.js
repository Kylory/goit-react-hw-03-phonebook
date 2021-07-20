import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactsList from './components/ContactsList/ContactsList';
import SearchContacts from './components/SearchContacts/SearchContacts';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // Записує конткти в state з Local Storage
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  // Записує конткти в Local Storage з state
  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  //Записує в contacts дані з форми
  //прокидується як prop в ContactForm
  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;

    this.setState({ name: name, number: number });
    contacts.push({ id: shortid.generate(), name: name, number: number });
  };

  //Записує дані з фільтру в state
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  //Повертає відфільтровані контакти (пошук)
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
