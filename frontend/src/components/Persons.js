const Persons = ({ persons, handleDelete, handleEdit }) => (
  <ul>
    {persons.map((person, index) => (
      <li key={index}>
        {person.name} - {person.number}
         <button onClick={() => handleDelete(person.id)}>delete</button>
         <button onClick={() => handleEdit(person)}>update</button>
      </li>
    ))}
  </ul>
)

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
  handleUpdate,
  editingPerson,
}) => (
  <form onSubmit={editingPerson ? handleUpdate : handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">{editingPerson ? 'Update' : 'Add'}</button>
    </div>
  </form>
);

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <h3>Search</h3>
    <input
      type="text"
      placeholder="Search by name"
      value={filter}
      onChange={handleFilterChange}
    />
  </div>
)

export  { Persons, PersonForm, Filter}
