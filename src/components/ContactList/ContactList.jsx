import React from 'react';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';
import { useGetContactsQuery } from 'services/contactsApi';
import { getFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const { data: contacts, isLoading} = useGetContactsQuery();
  console.log('data: ', contacts);
   console.log('isLoading: ', isLoading);



  const filter = useSelector(getFilter);
  console.log(filter);

  
 const normalizedFilter = filter.toLowerCase();
 const filteredContacts = contacts?.filter(contact =>
   contact.name.toLowerCase().includes(normalizedFilter)
 );


  return (
    <>
      {isLoading && <h1>Loading...</h1>}

      <List>
        {!isLoading &&
          filteredContacts.map(({ id, name, number }) => (
            <ContactItem key={id} id={id} name={name} number={number} />
          ))}
      </List>
      {contacts.length === 0 && !isLoading && (
        <h1>There are no contacts in phonebook!</h1>
      )}
    </>
  );
};
