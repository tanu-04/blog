// components/BlogCard.tsx
import React from "react";

interface BlogCardProps {
    title: string;
    description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description }) => {
    return (
        <div 
            className="bg-gray-100 border border-gray-300 rounded-lg p-6 max-w-sm mx-auto shadow-lg my-4"
            data-aos="fade-up" // This will trigger the animation on scroll
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </div>
    );
};

export default BlogCard;
