import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise7_16 = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowClose = (e) => {
      if (value !== '') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleWindowClose);
    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('');
    navigate('/');
  };

  return (
    <div>
      <h2>Form Blocking Demo</h2>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Exercise7_16;
