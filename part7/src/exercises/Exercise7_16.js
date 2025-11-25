import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Exercise7_16 = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    setIsBlocking(value !== '');
  }, [value]);

  // Warn user on browser refresh/close
  useEffect(() => {
    const handleWindowClose = (e) => {
      if (isBlocking) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleWindowClose);
    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, [isBlocking]);

  // Custom navigation guard
  const handleNavigate = (to) => {
    if (isBlocking) {
      if (window.confirm('You have unsaved changes. Leave anyway?')) {
        navigate(to);
      }
    } else {
      navigate(to);
    }
  };

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
      <br />
      <button onClick={() => handleNavigate('/')}>Go to Home</button>
      <Link to="/">Home link (no guard)</Link>
    </div>
  );
};

export default Exercise7_16;
