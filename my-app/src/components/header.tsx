// components/Header.tsx
import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 p-4 px-8 transition-all duration-300 ease-in-out ${
                isScrolled ? "bg-neutral-900 opacity-80 shadow-lg" : "bg-transparent"
            } text-white`}
        >
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold"><a href="/" className="text:gray-400 hover:text-gray-100">LinkedRIT</a></h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="login" className="text:gray-400 hover:text-gray-100">Auth</a></li>
                        <li><a href="#about" className="text:gray-400 hover:text-gray-100">Create</a></li>
                        <li><a href="#contact" className="text:gray-400 hover:text-gray-100">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
