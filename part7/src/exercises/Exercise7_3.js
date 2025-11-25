import React from 'react';
import { useParams } from 'react-router-dom';

const anecdotes = [
  { id: 1, content: 'If it hurts, do it more often', author: 'Jez Humble', info: 'https://martinfowler.com/' },
  { id: 2, content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', info: 'https://en.wikipedia.org/wiki/Donald_Knuth' },
];

const Exercise7_3 = () => {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === Number(id));

  if (!anecdote) return <p>Anecdote not found</p>;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Info: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

export default Exercise7_3;
