import React from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
function ShowMatch(){ const m = useMatch('/7.12/:name'); return <div>Match: {m?.params.name ?? 'none'}</div>; }
export default function Exercise7_12(){
  return (
    <div>
      <h2>Exercise 7.12 — useMatch</h2>
      <nav><Link to="alice">Alice</Link> | <Link to="bob">Bob</Link></nav>
      <Routes>
        <Route path=":name" element={<ShowMatch />} />
      </Routes>
    </div>
  );
}
