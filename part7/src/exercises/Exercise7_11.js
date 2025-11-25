import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise7_11 = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    navigate('/');
  };

  return (
    <div>
      <h2>Programmatic Navigation Demo</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Go Home</button>
      </form>
    </div>
  );
};

export default Exercise7_11;
