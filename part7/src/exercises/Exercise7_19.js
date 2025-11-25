import React from 'react';
import { Link } from 'react-router-dom';
export default function Exercise7_19(){
  const items = [{id:1,name:'One'},{id:2,name:'Two'}];
  return (
    <div>
      <h2>Exercise 7.19 — Generating links programmatically</h2>
      <ul>
        {items.map(it => <li key={it.id}><Link to={`/7.3/profiles/${it.id}`}>{it.name}</Link></li>)}
      </ul>
    </div>
  );
}
