import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
function Item(){ const { id } = useParams(); return <div>Item {id || 'none'}</div>; }
export default function Exercise7_7(){
  return (
    <div>
      <h2>Exercise 7.7 — Optional params</h2>
      <nav><Link to="item">No id</Link> | <Link to="item/7">With id</Link></nav>
      <Routes>
        <Route path="item" element={<Item />} />
        <Route path="item/:id" element={<Item />} />
      </Routes>
    </div>
  );
}
