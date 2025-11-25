import React, { useState, useEffect } from 'react';

const Exercise7_20 = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/anecdotes')
      .then(res => res.json())
      .then(data => setAnecdotes(data));
  }, []);

  return (
    <div>
      <h2>Anecdotes from Backend</h2>
      <ul>
        {anecdotes.map(a => (
          <li key={a.id}>{a.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise7_20;
