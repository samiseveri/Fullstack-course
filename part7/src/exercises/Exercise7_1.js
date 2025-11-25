import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Create = () => <h2>Create New</h2>;

const Exercise7_1 = () => {
  return (
    <div>
      <h1>Exercise 7.1</h1>
      <nav>
        <Link to="/">Anecdotes</Link> |{' '}
        <Link to="/create">Create New</Link> |{' '}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Exercise7_1;
