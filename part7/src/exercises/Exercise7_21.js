import React, { useState, useEffect } from 'react';

const Exercise7_21 = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/anecdotes')
      .then(res => res.json())
      .then(data => setAnecdotes(data));
  }, []);

  const addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = { content, id: Date.now() };
    fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote),
    }).then(res => res.json())
      .then(data => setAnecdotes(anecdotes.concat(data)));
    setContent('');
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <h3>Anecdotes</h3>
      <ul>
        {anecdotes.map(a => (
          <li key={a.id}>{a.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise7_21;
