import React, { useState } from 'react';

const Notification = ({ message }) => {
  if (!message) return null;
  return <div style={{ border: '1px solid black', padding: '5px', margin: '5px 0' }}>{message}</div>;
};

const Exercise7_9 = () => {
  const [notification, setNotification] = useState('');

  const createAnecdote = () => {
    setNotification('A new anecdote created!');
    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div>
      <h2>Notification Demo</h2>
      <Notification message={notification} />
      <button onClick={createAnecdote}>Create Anecdote</button>
    </div>
  );
};

export default Exercise7_9;
