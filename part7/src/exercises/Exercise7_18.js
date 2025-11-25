import React from 'react';
import { useParams } from 'react-router-dom';
export default function Exercise7_18(){
  const { id } = useParams();
  const valid = id && /^[0-9]+$/.test(id);
  return (
    <div>
      <h2>Exercise 7.18 — Params validation</h2>
      <p>id: {id}</p>
      <p>valid numeric id? {String(valid)}</p>
    </div>
  );
}
