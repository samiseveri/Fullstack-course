import React from 'react';
import { Link } from 'react-router-dom';
export default function Exercise7_11(){
  return (
    <div>
      <h2>Exercise 7.11 — Relative links demo</h2>
      <p><Link to="..">Go up (relative)</Link></p>
    </div>
  );
}
