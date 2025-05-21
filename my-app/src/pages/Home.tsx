import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// If you want modal animations, you'd keep this import for the modal only:
// import { useTransition, animated } from '@react-spring/web';

import Header from '../components/header'; // Assuming Header is rendered here or globally in App.js

const HomePage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const openModal = (platform) => {
    setSelectedPlatform(platform);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlatform('');
  };

  // If you decide to keep React Spring for the modal:
  // const modalTransitions = useTransition(modalOpen, {
  //   from: { opacity: 0, transform: 'translateY(-40px)' },
  //   enter: { opacity: 1, transform: 'translateY(0px)' },
  //   leave: { opacity: 0, transform: 'translateY(-40px)' },
  //   config: { mass: 1, tension: 200, friction: 20 },
  // });


  return (
    // IMPORTANT: This div within HomePage should NOT have overflow-y-scroll or snap-y.
    // The main App.js container is handling the scrolling for the entire app.
    // Each direct section within HomePage is a snap child of the App.js container.
    // Ensure the first section (Hero) accounts for Header height if Header is fixed.
    <div className="w-full">
      {/*
        If Header is rendered directly in HomePage, and you want it fixed,
        it should be positioned absolutely or fixed relative to the body/viewport.
        However, if the Header is in App.js and `fixed top-0`, that's generally better.
      */}
      {/* <Header />  */}

      {/* Hero Section - First snap point */}
      {/* Assuming Header is fixed and 64px tall, add pt-16 to the first section */}
      <section className="flex flex-col md:flex-row min-h-screen w-full bg-black snap-start pt-16">
        {/* Left: Hero Image */}
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/hero-image.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right: Text and Card */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-8 md:px-16 py-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Innovations in <br /> Technology</h1>
          <div className="bg-[#1c1c1c] p-6 md:p-8 rounded-md shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-2">The Tech Enthusiast's Hub</h2>
            <p className="text-sm mb-4">Your ultimate source for cutting-edge technology insights and news.</p>
            <Link to="/login">
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 cursor-pointer">Join Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section - Second snap point */}
      <section className="min-h-screen w-full bg-neutral-800 py-16 px-8 md:px-16 flex flex-col items-center justify-center snap-start">
        <h2 className="text-4xl font-bold text-white mb-10">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-neutral-700 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-white">Blog Post 1</h3>
            <p className="text-gray-300">This is a short summary of the latest blog post. Discover more about this exciting topic!</p>
            <Link to="/blog/post-1" className="text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-white">Blog Post 2</h3>
            <p className="text-gray-300">This is a short summary of another blog post. Dive deeper into the insights we've shared.</p>
            <Link to="/blog/post-2" className="text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>
          <div className="bg-neutral-700 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-white">Blog Post 3</h3>
            <p className="text-gray-300">This is a short summary of another blog post. Dive deeper into the insights we've shared.</p>
            <Link to="/blog/post-2" className="text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>
        </div>
      </section>

      {/* Follow Us Section - Third snap point */}
      <section className="min-h-screen w-full bg-neutral-900 py-16 px-8 md:px-16 flex flex-col items-center justify-center snap-start">
        <h2 className="text-4xl font-bold text-white mb-10">Follow Us</h2>
        <div className="flex space-x-6">
          {['xyz', 'Facebook', 'Twitter', 'Instagram'].map((platform) => (
            <img
              key={platform}
              src={`/${platform.toLowerCase()}.png`}
              alt={platform}
              onClick={() => openModal(platform)}
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </section>

      {/* Footer (Contact Section) - Fourth snap point */}
      <footer className="bg-neutral-950 text-gray-300 py-12 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 min-h-screen snap-start">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">My Site</h3>
          <p className="mb-2">123-456-7890</p>
          <p className="mb-2">info@mysite.com</p>
          <address className="not-italic mb-4">
            500 Terry Francine Street,<br />
            6th Floor, San Francisco,<br />
            CA 94158
          </address>
          <div className="flex justify-center md:justify-start space-x-4">
            <img src="/facebook.png" alt="Facebook" className="w-8 h-8 cursor-pointer hover:opacity-80" />
            <img src="/instagram.png" alt="Instagram" className="w-8 h-8 cursor-pointer hover:opacity-80" />
            <img src="/twitter.png" alt="X" className="w-8 h-8 cursor-pointer hover:opacity-80" />
            <img src="/xyz.png" alt="TikTok" className="w-8 h-8 cursor-pointer hover:opacity-80" />
          </div>
        </div>

        <div className="text-center md:text-right flex flex-col space-y-2">
          <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="/accessibility-statement" className="hover:text-white transition-colors duration-200">Accessibility Statement</Link>
          <p className="mt-4 text-sm">© 2035 by My Site. Powered and secured by <a href="https://wix.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">Wix</a></p>
        </div>
      </footer>

      {/* Modal - Remains outside the scroll snap flow */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-neutral-800 p-8 rounded-lg shadow-2xl text-center max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-3xl font-bold text-white mb-4 capitalize">{selectedPlatform}</h3>
            <img
              src={`/${selectedPlatform.toLowerCase()}.png`}
              alt={selectedPlatform}
              className="w-32 h-32 mx-auto mb-6"
            />
            <button
              onClick={closeModal}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;