import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <section>
      <ul className={css.list}>
        {contacts.map(({ id, name, number }) => (
          <ContactListItem
            key={id}
            contact={{ id, name, number }}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  export default ContactList;