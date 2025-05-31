//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/Home'; // Renamed Home.tsx to HomePage for consistency
import Blog from './pages/Blog';
import CreateBlogForm from './components/newBlog';
import Profile from './pages/Profile' ;
import BlogDetail from "./components/BlogDetail";
import Contact from "./components/Contact";
function App() {
  return (
    // This div is now your primary scroll container.
    // It takes full viewport height and manages its own scroll.
    <div className="bg-neutral-900 min-h-screen text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/*
        The Header should ideally be fixed and outside the scrollable area
        OR it should be part of the first snapped section.

        If it's fixed, give it a `z-index` and position-fixed.
        Then, your first snap section needs `padding-top` equal to header height.
      */}
      <Header /> {/* Assuming your Header is fixed, e.g., 'fixed top-0 w-full z-50' */}

      {/*
        Routes will render the specific page component, which
        in turn contains the scroll-snapping sections for that page.
        So, App.js just renders the full page, and if that page has internal
        sections to snap to (like HomePage does), HomePage itself handles the snapping.
      */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/newblog" element={<CreateBlogForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/title/:title" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;