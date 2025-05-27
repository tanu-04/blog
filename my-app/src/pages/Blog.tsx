// pages/Blog.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import BlogCard from '../components/blogcard';

interface Blog {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/blogs'); // change URL as needed
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">All Posts</h1>
          <Link to="/newblog">
            <button className="p-3 bg-neutral border border-white text-white cursor-pointer">
              NewBlog
            </button>
          </Link>
        </div>

        <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}  // pass id here
            title={blog.title}
            description={blog.description}
          />
        ))}   
           
        </div>
      </main>
    </div>
  );
};

export default Blog;
