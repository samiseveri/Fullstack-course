import React from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
function Profile(){ 
  const { id } = useParams();
  return <div>Profile ID: {id}</div>;
}
export default function Exercise7_3(){
  return (
    <div>
      <h2>Exercise 7.3 — useParams</h2>
      <nav>
        <Link to="profiles/1">Profile 1</Link> | <Link to="profiles/42">Profile 42</Link>
      </nav>
      <Routes>
        <Route path="profiles/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}
