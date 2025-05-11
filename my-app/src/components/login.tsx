import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission

        // Here you would typically send the username and password to your backend for authentication
        console.log("Login submitted:", { username, password });

        // Reset the form after submission (optional)
        setUsername("");
        setPassword("");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-700">
            <div className="bg-neutral-800 p-8 rounded-md shadow-md w-96">
                <h1 className="text-2xl font-semibold text-white mb-4 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-700 text-white"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-700 text-white"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;