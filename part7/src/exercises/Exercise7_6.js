import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise7_6 = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content);
    navigate('/');
  };

  return (
    <div>
      <h2>Programmatic Navigation Demo</h2>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise7_6;
