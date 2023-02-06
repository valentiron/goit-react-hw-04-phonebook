import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, isName] = useState('');
  const [number, isNumber] = useState('');

  function handleChangeValue(event) {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        isName(value);
        break;

      case 'number':
        isNumber(value);
        break;

      default:
        return;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(name, number);
    isName('');
    isNumber('');
  }

  return (
    <>
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeValue}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          onChange={handleChangeValue}
          value={number}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  </>
  );
}


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};




