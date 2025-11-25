import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Exercise7_12';

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const Exercise7_13 = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
  </Routes>
);

export default Exercise7_13;
