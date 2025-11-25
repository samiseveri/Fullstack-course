import React, { useState } from 'react';

const Exercise7_5 = () => {
  const [notification, setNotification] = useState('');

  const handleClick = () => {
    setNotification('Anecdote created!');
    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div>
      <h2>Notification Demo</h2>
      {notification && <div style={{ border: '1px solid black', padding: '5px' }}>{notification}</div>}
      <button onClick={handleClick}>Create Anecdote</button>
    </div>
  );
};

export default Exercise7_5;
