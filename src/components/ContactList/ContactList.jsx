import css from './ContactList.module.css';
export function ContactList({ contacts, onClick }) {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contactItem} key={id}>
          {name} : {number}
          <button
            className={css.deleteBtn}
            onClick={() => onClick(id)}
            name="delete"
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
