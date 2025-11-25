import React from 'react';
import { Outlet, Link } from 'react-router-dom';
function Layout(){ return (
  <div>
    <header><h3>Shared header</h3><nav><Link to="/7.8/home">Home</Link></nav></header>
    <main><Outlet /></main>
  </div>
);}
function Home(){ return <div>Layout Home</div>; }
export default function Exercise7_8(){
  return (
    <div>
      <h2>Exercise 7.8 — Layout routes</h2>
      <p>Open the nested route below:</p>
      <div style={{border:'1px solid #ccc', padding:10}}>
        <Layout />
        <p style={{fontSize:12}}>Note: React Router nested <code>&lt;Outlet/&gt;</code> is illustrated inline.</p>
      </div>
    </div>
  );
}
