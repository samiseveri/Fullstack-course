import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise7_10 = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    navigate('/');
  };

  return (
    <div>
      <h2>Navigate After Submit</h2>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise7_10;
