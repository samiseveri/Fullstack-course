import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Exercise7_5(){
  const navigate = useNavigate();
  return (
    <div>
      <h2>Exercise 7.5 — useNavigate</h2>
      <button onClick={() => navigate('/7.3')}>Go to 7.3</button>
    </div>
  );
}
