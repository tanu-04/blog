// pages/Contact.tsx
import React from 'react';
import Header from '../components/header';

const Contact: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Red horizontal line */}
      <div className="w-full h-1 bg-red-600" />

      <main className="flex h-[calc(100vh-4rem)]">
        {/* Left-side full-height image */}
        <div className="w-1/2 h-full">
          <img
            src="/hero-image.png"
            alt="Contact Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right-side contact details */}
        <div className="w-1/2 flex flex-col justify-center items-start px-10 space-y-4 text-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Information</h1>

          <p><strong>Name:</strong> Tanu Shree Kumawat</p>
          <p><strong>Name:</strong> Shantanu Pandey</p>

          <p><strong>GitHub IDs:</strong> Catnip-01, tanu-04</p>

          <p><strong>Phone:</strong> 123-456-7890</p>
          <p><strong>Email:</strong> info@mysite.com</p>

          <div>
            <strong>Address:</strong>
            <p>500 Terry Francine Street,</p>
            <p>6th Floor, San Francisco,</p>
            <p>CA 94158</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
