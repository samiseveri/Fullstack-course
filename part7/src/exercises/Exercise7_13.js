import React, { Suspense } from 'react';
const LazyComp = React.lazy(() => Promise.resolve({ default: () => <div>Lazy loaded component</div> }));
export default function Exercise7_13(){
  return (
    <div>
      <h2>Exercise 7.13 — Lazy loading routes</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComp />
      </Suspense>
    </div>
  );
}
