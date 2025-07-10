import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons} from './components/Persons'
import personService from './services/persons.js'
import './index.css'

const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div className={message.type === 'success' ? 'notification success' : 'notification error'}>
      {message.text}
    </div>
  );
};


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notification, setNotification] = useState(null);


  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      const confirmUpdate = window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with the new one?`
    );

    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson));
          setNewName('');
          setNewNumber('');
           showNotification(`Updated ${newName}'s number`, 'success');
        })
        .catch(error => {
          showNotification(`Failed to update ${newName}`, 'error');
          console.error(error);
        });
      }
      return;
    }
    const newPerson = {name: newName, number: newNumber};
    
    personService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      showNotification(`Added ${newName}`, 'success');
    })
    .catch(error => {
      console.error('Erro ao adicionar contato:', error);
      showNotification('Failed to add contact', 'error');
    });
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .delet(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, 'success');
        })
        .catch(error => {
          showNotification(`Failed to delete ${person.name}`, 'error');
        });
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        handleSubmit = {handleSubmit}      
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App