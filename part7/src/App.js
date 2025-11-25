import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './exercises/Home';
import Exercise7_1 from './exercises/Exercise7_1';
import Exercise7_2 from './exercises/Exercise7_2';
import Exercise7_3 from './exercises/Exercise7_3';
import Exercise7_4 from './exercises/Exercise7_4';
import Exercise7_5 from './exercises/Exercise7_5';
import Exercise7_6 from './exercises/Exercise7_6';
import Exercise7_7 from './exercises/Exercise7_7';
import Exercise7_8 from './exercises/Exercise7_8';
import Exercise7_9 from './exercises/Exercise7_9';
import Exercise7_10 from './exercises/Exercise7_10';
import Exercise7_11 from './exercises/Exercise7_11';
import Exercise7_12 from './exercises/Exercise7_12';
import Exercise7_13 from './exercises/Exercise7_13';
import Exercise7_14 from './exercises/Exercise7_14';
import Exercise7_15 from './exercises/Exercise7_15';
import Exercise7_16 from './exercises/Exercise7_16';
import Exercise7_17 from './exercises/Exercise7_17';
import Exercise7_18 from './exercises/Exercise7_18';
import Exercise7_19 from './exercises/Exercise7_19';
import Exercise7_20 from './exercises/Exercise7_20';
import Exercise7_21 from './exercises/Exercise7_21';

const routesList = Array.from({length:21}, (_,i) => `/7.${i+1}`);

function App(){
  return (
    <div style={{padding:20, fontFamily:'Arial, sans-serif'}}>
      <h1>Full Stack Open - Part 7 (Exercises 7.1 - 7.21)</h1>
      <nav style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:20}}>
        <Link to="/">Home</Link>
        {routesList.map(r => <Link key={r} to={r}>{r.replace('/','')}</Link>)}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/7.1" element={<Exercise7_1 />} />
        <Route path="/7.2" element={<Exercise7_2 />} />
        <Route path="/7.3" element={<Exercise7_3 />} />
        <Route path="/7.4" element={<Exercise7_4 />} />
        <Route path="/7.5" element={<Exercise7_5 />} />
        <Route path="/7.6" element={<Exercise7_6 />} />
        <Route path="/7.7" element={<Exercise7_7 />} />
        <Route path="/7.8" element={<Exercise7_8 />} />
        <Route path="/7.9" element={<Exercise7_9 />} />
        <Route path="/7.10" element={<Exercise7_10 />} />
        <Route path="/7.11" element={<Exercise7_11 />} />
        <Route path="/7.12" element={<Exercise7_12 />} />
        <Route path="/7.13" element={<Exercise7_13 />} />
        <Route path="/7.14" element={<Exercise7_14 />} />
        <Route path="/7.15" element={<Exercise7_15 />} />
        <Route path="/7.16" element={<Exercise7_16 />} />
        <Route path="/7.17" element={<Exercise7_17 />} />
        <Route path="/7.18" element={<Exercise7_18 />} />
        <Route path="/7.19" element={<Exercise7_19 />} />
        <Route path="/7.20" element={<Exercise7_20 />} />
        <Route path="/7.21" element={<Exercise7_21 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
