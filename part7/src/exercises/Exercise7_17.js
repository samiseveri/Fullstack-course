import { useState, useEffect } from 'react';
import axios from 'axios';

const Exercise7_17 = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(err => console.error(err));
  }, []);

  const deletePerson = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`)
      .then(() => setPersons(persons.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map(p => (
          <li key={p.id}>
            {p.name} {p.number} <button onClick={() => deletePerson(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise7_17;
