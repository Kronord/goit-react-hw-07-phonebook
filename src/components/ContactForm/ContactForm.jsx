import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerCircularSplit } from 'spinners-react';
import { contactsApi } from 'components/Redux/Contacts/api';
import { useCreateContactMutation } from 'components/Redux/Contacts/api';

import s from './ContactForm.module.css';

export const ContactForm = () => {
  const [newName, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [createContact, { isLoading: spinner }] = useCreateContactMutation();
  const contactsState =
    contactsApi.endpoints.getContacts.useQueryState('').data;

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhoneNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newObj = { id: nanoid(), name: newName, phone: phoneNumber };
    if (
      contactsState.find(
        ({ name }) => name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      return alert(`${newName} is already in contacts`);
    }
    createContact(newObj)
      .unwrap()
      .then(() => {
        setName('');
        setPhoneNumber('');
        return toast.success(`${newName} added to Phonebook`);
      })
      .catch(() => toast.error(`Error, please try again`));
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor={nameInputId} className={s.label}>
        Name
      </label>
      <input
        type="text"
        id={nameInputId}
        name="name"
        value={newName}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        className={s.input}
        required
      />
      <label htmlFor={numberInputId} className={s.label}>
        Number
      </label>
      <input
        type="tel"
        id={numberInputId}
        name="number"
        value={phoneNumber}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        className={s.input}
        required
      />
      <button type="submit" className={s.btn} disabled={spinner ? true : false}>
        {spinner ? (
          <SpinnerCircularSplit
            size={25}
            thickness={180}
            speed={100}
            color="rgba(57, 74, 172, 1)"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        ) : (
          'Add Contact'
        )}
      </button>
    </form>
  );
};
