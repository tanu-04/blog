import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

type ProfileType = {
  username: string;
  email: string;
  name: string;
  passingYear: string;
  socialLink: string;
};

const fields = ["username", "email", "name", "passingYear", "socialLink"] as const;
type Field = typeof fields[number];

const Profile = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("username");

  const [profile, setProfile] = useState<ProfileType>({
    username: "",
    email: "",
    name: "",
    passingYear: "",
    socialLink: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      fetch(`http://localhost:5000/profile?username=${loggedInUser}`)
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch(() => setMessage("Error loading profile"));
    }
  }, [loggedInUser, navigate]);

  const handleUpdate = async () => {
    const response = await fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: profile.username,
        newUsername: profile.username,
        newPassword,
        email: profile.email,
        name: profile.name,
        passingYear: profile.passingYear,
        socialLink: profile.socialLink,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      localStorage.setItem("username", profile.username);
      setNewPassword("");
    } else {
      setMessage("Update failed.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl bg-neutral-800 rounded-lg shadow-xl p-10">
          <h1 className="text-4xl font-extrabold mb-8 text-center">Your Profile</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-6"
          >
            {fields.map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-2 font-semibold capitalize text-gray-300">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  className="p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  value={profile[field]}
                  onChange={(e) =>
                    setProfile({ ...profile, [field]: e.target.value })
                  }
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label className="mb-2 font-semibold capitalize text-gray-300">
                New Password
              </label>
              <input
                type="password"
                className="p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Change password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 rounded-lg font-bold text-lg hover:bg-cyan-700 transition"
            >
              Update Profile
            </button>

            {message && (
              <p className="mt-4 text-center text-green-400 font-medium">{message}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
