import propTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerCircularSplit } from 'spinners-react';
import { useDeleteContactMutation } from 'components/Redux/Contacts/api';
import s from './ListItem.module.css';

const ListItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading: isResult }] = useDeleteContactMutation();

  return (
    <li className={s.item}>
      {name}: {number}
      <button
        type="button"
        onClick={() =>
          deleteContact(id)
            .unwrap()
            .then(() =>
              toast.success(`${name} has been removed from the Phonebook`)
            )
            .catch(() => toast.error(`Error, please try again`))
        }
        className={s.btn}
        disabled={isResult ? true : false}
      >
        {isResult ? (
          <SpinnerCircularSplit
            size={25}
            thickness={180}
            speed={100}
            color="rgba(57, 74, 172, 1)"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
};

ListItem.propTypes = {
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};

export default ListItem;
