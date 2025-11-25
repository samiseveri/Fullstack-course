import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
export default function Exercise7_2(){
  return (
    <div>
      <h2>Exercise 7.2 — Nested routes demo</h2>
      <nav>
        <Link to="a">A</Link> | <Link to="b">B</Link>
      </nav>
      <Routes>
        <Route path="a" element={<div>Route A content</div>} />
        <Route path="b" element={<div>Route B content</div>} />
      </Routes>
    </div>
  );
}
