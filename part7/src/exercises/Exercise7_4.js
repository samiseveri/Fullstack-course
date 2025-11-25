import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise7_4 = () => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content, author, info });
    navigate('/');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Info: <input value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Exercise7_4;
