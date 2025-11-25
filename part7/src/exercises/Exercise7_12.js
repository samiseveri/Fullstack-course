import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </nav>
    <hr />
    <Outlet />
  </div>
);

const Exercise7_12 = () => <Layout />;

export default Exercise7_12;
