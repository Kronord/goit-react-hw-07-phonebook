import React from 'react';
import { useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import ListItem from '../ListItem/ListItem';
import { useGetContactsQuery } from 'components/Redux/Contacts/api';
import s from './ContactList.module.css';

const ContactList = () => {
  const { data, error, isFetching } = useGetContactsQuery('');
  const filterState = useSelector(state => state.filter);

  if (data) {
    const normalizedFilter = filterState.toLowerCase();
    const filterContacts = data.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <ul className={s.list}>
        {filterContacts.map(({ name, id, phone }) => (
          <ListItem key={id} name={name} number={phone} id={id} />
        ))}
      </ul>
    );
  }

  if (isFetching) {
    return (
      <SpinnerDotted
        size={70}
        thickness={100}
        speed={121}
        color="rgba(57, 119, 172, 1)"
        style={{
          marginTop: '100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '100px',
        }}
      />
    );
  }

  if (error) {
    return <h1>Contacts not found</h1>;
  }
};

export default ContactList;
