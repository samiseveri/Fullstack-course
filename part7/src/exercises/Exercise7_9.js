import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
export default function Exercise7_9(){
  return (
    <div>
      <h2>Exercise 7.9 — Redirect example</h2>
      <Routes>
        <Route path="old" element={<Navigate to="/7.9/new" replace />} />
        <Route path="new" element={<div>New route</div>} />
      </Routes>
      <p>Visit <code>/7.9/old</code> to be redirected to <code>/7.9/new</code>.</p>
    </div>
  );
}
