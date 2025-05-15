import React, { useState } from 'react';
import '/workspaces/blog/my-app/src/index.css';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const openModal = (platform: string) => {
    setSelectedPlatform(platform);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlatform('');
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>SiteName</span>
        </div>
        <div className="nav">
            <nav>
            <ul className="flex space-x-6 text-lg font-medium">
                <li><Link to="/login" className="hover:text-gray-300">Auth</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300">Blog</Link></li>
                <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
            </nav>
            </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row h-screen w-full bg-black">
        {/* Left: Hero Image */}
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/hero-image.png" // ← replace with your image path
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text and Card */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-8 md:px-16 py-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Innovations in <br /> Technology
          </h1>

          <div className="bg-[#1c1c1c] p-6 md:p-8 rounded-md shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-2">The Tech Enthusiast's Hub</h2>
            <p className="text-sm mb-4">
              Your ultimate source for cutting-edge technology insights and news.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200">
              Join Now
            </button>
          </div>
        </div>
      </section>


      {/* Latest Blogs */}
      <section className="latest-blogs">
        <h2>Latest Blogs</h2>
        <div className="blog-card">
          <h3>Blog Post 1</h3>
          <p>This is a short summary of the latest blog post.</p>
        </div>
        <div className="blog-card">
          <h3>Blog Post 2</h3>
          <p>This is a short summary of another blog post.</p>
        </div>
      </section>

       / {/* Follow Us Section */}
      <section className="follow-us">
        <h2>Follow Us</h2>
        <div className="container">
          <div className="social-icons">
            {['xyz', 'Facebook', 'Twitter', 'Instagram'].map((platform) => (
              <img
                key={platform}
                src={`/${platform.toLowerCase()}.png`}
                alt={platform}
                onClick={() => openModal(platform)}
                className="social-icon"
              />
            ))}
          </div>
        </div>
      </section>


      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPlatform}</h3>
            <img
              src={`/${selectedPlatform.toLowerCase()}.png`}
              alt={selectedPlatform}
              className="modal-image"
            />
            <button
              onClick={closeModal}
              className="join-button"
              style={{ marginTop: '1rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <footer className="contact-footer">
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
      </footer>

    </div>
  );
};

export default HomePage;
