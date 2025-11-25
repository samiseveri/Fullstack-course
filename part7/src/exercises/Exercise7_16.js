import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompt } from '../hooks/usePrompt';

const Exercise7_16 = ({ addAnecdote }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const [formDirty, setFormDirty] = useState(false);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    setFormDirty(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAnecdote({ content, author, info, votes: 0 });
    setContent('');
    setAuthor('');
    setInfo('');
    setFormDirty(false);
    navigate('/');
  };

  // Warn user if trying to leave with unsaved changes
  usePrompt('You have unsaved changes. Are you sure?', formDirty);

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content} onChange={handleChange(setContent)} />
        </div>
        <div>
          author
          <input value={author} onChange={handleChange(setAuthor)} />
        </div>
        <div>
          url for more info
          <input value={info} onChange={handleChange(setInfo)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default Exercise7_16;
