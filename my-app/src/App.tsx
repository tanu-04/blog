import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/Home';
import Blog from './pages/Blog';

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
