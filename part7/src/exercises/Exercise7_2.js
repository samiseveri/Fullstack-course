import React from 'react';
import { Link } from 'react-router-dom';

const anecdotes = [
  { id: 1, content: 'If it hurts, do it more often', author: 'Jez Humble' },
  { id: 2, content: 'Premature optimization is the root of all evil', author: 'Donald Knuth' },
];

const Exercise7_2 = () => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a => (
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Exercise7_2;
