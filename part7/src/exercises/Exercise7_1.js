import React from 'react';
import { Link } from 'react-router-dom';
export default function Exercise7_1(){
  return (
    <div>
      <h2>Exercise 7.1 — Simple Links</h2>
      <p>This demonstrates basic <code>Link</code> usage.</p>
      <nav>
        <Link to="/7.2">Go to 7.2</Link>
      </nav>
    </div>
  );
}
