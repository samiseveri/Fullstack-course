import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
function Private({children, authed}){ return authed ? children : <Navigate to="/7.14/login" replace />; }
function Secret(){ return <div>🔒 Secret content</div>; }
function Login({onLogin}){ return <div>Login page <button onClick={onLogin}>Login</button></div>; }
export default function Exercise7_14(){
  const [authed, setAuthed] = useState(false);
  return (
    <div>
      <h2>Exercise 7.14 — Route guard example</h2>
      <nav><Link to="/7.14/secret">Secret</Link></nav>
      <Routes>
        <Route path="login" element={<Login onLogin={() => setAuthed(true)} />} />
        <Route path="secret" element={<Private authed={authed}><Secret /></Private>} />
      </Routes>
      <p>Try accessing secret — you'll be redirected to login if not authenticated.</p>
    </div>
  );
}
