import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Exercise7_6(){
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <h2>Exercise 7.6 — Passing state when navigating</h2>
      <button onClick={() => navigate('/7.3', { state: { from: location.pathname } })}>
        Go to 7.3 with state
      </button>
    </div>
  );
}
