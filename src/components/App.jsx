import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

//   Local Storage
const getSavedContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return [];
};

//   APP
export const App = () => {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //   Filter contacts

  const filterContacts = value => {
    setFilter(value);
  };
  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  //   Submit form

  const handleSubmit = data => {
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );

    if (isInContacts) {
      Notiflix.Notify.failure(`${data.name} is already in contacts!`, {
        position: 'left-top',
        distance: '10px',
      });
      return;
    }
    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        name: data.name,
        number: data.number,
      },
    ]);
  };

  //   Delete contacts

  const deleteContact = idOfContact => {
    setContacts(prevState => prevState.filter(({ id }) => id !== idOfContact));
  };

  return (
    <div className="container">
      <h1 className="formTitle">Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2 className="contactsTitle">Contacts</h2>
      <Filter value={filter} onChange={filterContacts} />
      {contacts.length !== 0 && (
        <ContactList onClick={deleteContact} contacts={getFilteredContacts()} />
      )}
    </div>
  );
};
