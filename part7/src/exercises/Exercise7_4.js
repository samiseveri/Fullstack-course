import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Exercise7_4(){
  const loc = useLocation();
  return (
    <div>
      <h2>Exercise 7.4 — Query parameters</h2>
      <p>Location search: {loc.search}</p>
      <p><Link to="/7.4?show=true">Add ?show=true</Link></p>
    </div>
  );
}
