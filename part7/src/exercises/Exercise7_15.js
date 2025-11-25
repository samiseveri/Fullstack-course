import React from 'react';
import { useLocation, Link } from 'react-router-dom';
export default function Exercise7_15(){
  const { search } = useLocation();
  const qp = new URLSearchParams(search);
  return (
    <div>
      <h2>Exercise 7.15 — Reading search params</h2>
      <p>search: {search}</p>
      <p>show: {qp.get('show')}</p>
      <p><Link to="/7.15?show=1">Set ?show=1</Link></p>
    </div>
  );
}
