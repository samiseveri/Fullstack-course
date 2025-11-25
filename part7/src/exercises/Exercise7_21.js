import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
const posts = [
  { id: 'a', title: 'First post', content: 'Hello world' },
  { id: 'b', title: 'Second post', content: 'Another post' },
];
function Posts(){
  return (
    <div>
      <h3>Posts</h3>
      <ul>{posts.map(p => <li key={p.id}><Link to={p.id}>{p.title}</Link></li>)}</ul>
    </div>
  );
}
function Post(){
  const { id } = useParams();
  const p = posts.find(x => x.id === id);
  if(!p) return <div>Post not found</div>;
  return <div><h4>{p.title}</h4><p>{p.content}</p></div>;
}
export default function Exercise7_21(){
  return (
    <div>
      <h2>Exercise 7.21 — Small blog with dynamic routes</h2>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path=":id" element={<Post />} />
      </Routes>
      <p>Visit <code>/7.21</code> and click a post.</p>
    </div>
  );
}
