import React from 'react';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { change } from 'components/Redux/Filter/slice';
import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector(state => state.contacts.filter);

  const filterStateChange = evt => {
    dispatch(change(evt.target.value));
  };

  return (
    <div className={s.wrapper}>
      <label htmlFor={nanoid()} className={s.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        id={nanoid()}
        value={filterState}
        onChange={filterStateChange}
        className={s.input}
      />
    </div>
  );
};

Filter.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
};

export default Filter;
