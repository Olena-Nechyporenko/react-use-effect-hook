import css from './Filter.module.css';
export function Filter({ onChange, value }) {
  function filterContacts(evt) {
    onChange(evt.target.value.trim());
  }
  return (
    <div>
      <p className={css.filter}>Find contacts by name</p>
      <input
        className={css.filterInput}
        type="text"
        onChange={filterContacts}
        value={value}
        name="filter"
      />
    </div>
  );
}
