import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
function Dashboard(){ return <div><h4>Dashboard Index</h4></div>; }
function Reports(){ return <div>Reports List</div>; }
export default function Exercise7_20(){
  return (
    <div>
      <h2>Exercise 7.20 — Index routes</h2>
      <nav><Link to="dashboard">Dashboard</Link></nav>
      <Routes>
        <Route path="dashboard" element={<Outlet />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}
