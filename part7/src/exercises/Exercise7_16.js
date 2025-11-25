import React from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
export default function Exercise7_16(){
  // Note: real blocking in RR v6 is more involved; here is a small illustrative placeholder.
  try {
    useBlocker(() => {
      // noop: illustrative only
    });
  } catch(e){}
  return (
    <div>
      <h2>Exercise 7.16 — Navigation blocking (illustrative)</h2>
      <p>This example is illustrative. See course notes for full implementation.</p>
    </div>
  );
}
