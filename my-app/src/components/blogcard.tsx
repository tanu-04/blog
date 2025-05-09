// components/BlogCard.tsx
import React from "react";

interface BlogCardProps {
    title: string;
    description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description }) => {
    return (
        <div 
            className="bg-black-800 border border-white rounded-lg p-6 mx-auto shadow-lg w-full my-4 animate- cursor-pointer"
            data-aos="fade-up" // This will trigger the animation on scroll
        >
            <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
            <p className="text-lg text-white leading-relaxed">{description}</p>
        </div>
    );
};

export default BlogCard;
