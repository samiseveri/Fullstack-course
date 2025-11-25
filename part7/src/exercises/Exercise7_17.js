import React, { useState } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';

const Exercise7_17 = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const blocker = useBlocker(text !== '', 'Unsaved changes!');

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    navigate('/');
  };

  return (
    <div>
      <h2>Form Navigation Guard</h2>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise7_17;
