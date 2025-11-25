import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Exercise7_17 = () => {
  const [input, setInput] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsBlocking(input !== '');
  }, [input]);

  // Warn on browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isBlocking) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isBlocking]);

  // Custom navigation guard for buttons/links
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
    alert(`Submitted: ${input}`);
    setInput('');
    navigate('/');
  };

  return (
    <div>
      <h2>Exercise 7.17: Form Blocking Demo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Submit</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleNavigate('/')}>Go Home</button>
        <br />
        <Link to="/">Link to Home (no guard)</Link>
      </div>
    </div>
  );
};

export default Exercise7_17;
