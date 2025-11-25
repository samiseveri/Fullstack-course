import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function Exercise7_17(){
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0,0); }, [loc.pathname]);
  return (
    <div>
      <h2>Exercise 7.17 — Scroll restoration</h2>
      <p>Scrolls to top on route change (simple example).</p>
    </div>
  );
}
