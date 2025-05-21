// pages/Blog.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Header from '../components/header'; // Import your Header component
import BlogCard from '../components/blogcard'; // Import the BlogCard component

const Blog = () => {
  const blogData = [
    {
      title: "Exploring the Fundamentals and Applications of Kmeans Clustering Techniques",
      description: "Kmeans clustering is a transformative technique in data analysis that helps uncover patterns and group similar data points. This...",
      author: "Tanu Shree Kumawat",
      date: "4 hours ago",
      readTime: "4 min read",
      views: 120,
      comments: 5,
    },
    {
      title: "Another Interesting Blog Post",
      description: "This is a brief description of another blog post, discussing a different topic.",
      author: "Jane Smith",
      date: "1 day ago",
      readTime: "7 min read",
      views: 342,
      comments: 23,
    },
    {
      title: "The Future of AI",
      description: "A look into the exciting possibilities and challenges that lie ahead in the field of Artificial Intelligence",
      author: "Alex Johnson",
      date: "3 days ago",
      readTime: "10 min read",
      views: 567,
      comments: 45,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">All Posts</h1>
          <Link to="/newblog">
            <button className="p-3 bg-neutral border border-white text-white cursor-pointer">
              none
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          {blogData.map((blog, idx) => (
            <BlogCard // Use the BlogCard component here
              key={idx}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              readTime={blog.readTime}
              views={blog.views}
              comments={blog.comments}
            />
          ))}
        </div>
      </main>
      {/* <footer className="contact-footer">
        <div className="contact-left">
          <h3>My Site</h3>
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
          <p>
            500 Terry Francine Street,<br />
            6th Floor, San Francisco,<br />
            CA 94158
          </p>
          <div className="social-icons2">
            <img src="/facebook.png" alt="Facebook" className="social-icon2" />
            <img src="/instagram.png" alt="Instagram" className="social-icon2" />
            <img src="/twitter.png" alt="X" className="social-icon2" />
            <img src="/xyz.png" alt="TikTok" className="social-icon2" />
          </div>
        </div>
        <div className="contact-right">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/accessibility-statement">Accessibility Statement</a>
          <p>© 2035 by My Site. Powered and secured by <a href="https://wix.com" target="_blank" rel="noopener noreferrer">Wix</a></p>
        </div>
      </footer> */}
    </div>
  );
};

export default Blog;
