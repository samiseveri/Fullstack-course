import React, { useState } from 'react';
import { usePrompt } from '../hooks/usePrompt';

const Exercise7_17 = () => {
  const [text, setText] = useState('');
  const [formDirty, setFormDirty] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
    setFormDirty(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted: ${text}`);
    setText('');
    setFormDirty(false);
  };

  // Warn user if trying to leave with unsaved changes
  usePrompt('You have unsaved changes. Are you sure?', formDirty);

  return (
    <div>
      <h2>Exercise 7.17 - Block Navigation Example</h2>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise7_17;
