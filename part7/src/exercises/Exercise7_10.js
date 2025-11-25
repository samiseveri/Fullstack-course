import React from 'react';
import { Routes, Route } from 'react-router-dom';
function NotFound(){ return <div>404 — Not Found</div>; }
export default function Exercise7_10(){
  return (
    <div>
      <h2>Exercise 7.10 — 404 handling</h2>
      <Routes>
        <Route path="/" element={<div>Index</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
