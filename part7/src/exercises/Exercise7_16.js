import React from 'react';
import { useBlocker } from "react-router-dom"
export default function Exercise7_16(){
  
  try {
    useBlocker(() => {
      
    });
  } catch(e){}
  return (
    <div>
      <h2>Exercise 7.16 — Navigation blocking (illustrative)</h2>
      <p>This example is illustrative. See course notes for full implementation.</p>
    </div>
  );
}
