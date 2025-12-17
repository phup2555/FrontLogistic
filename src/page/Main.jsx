import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // ตัวอย่าง icon

const profiles = [
  {
    name: "Alice",
    image: "https://www.focusglobal-logistics.com/uploads/7e4b5c.jpg",
  },
  {
    name: "Bob",
    image: "https://www.gccports.com/media/news-images/b8d5b-main-fml.jpg",
  },
  {
    name: "Charlie",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/56a4c225259223.563434dcc95e9.jpg",
  },
];

const Main = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide ทุก 3 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === profiles.length - 1 ? 0 : prev + 1));
    }, 2000); // 3000ms = 3 วินาที
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm flex flex-col items-center">
        <img
          src={profiles[currentIndex].image}
          alt={profiles[currentIndex].name}
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />

        {/* Name */}
        <h2 className="text-xl font-semibold mb-4">
          {profiles[currentIndex].name}
        </h2>

        {/* Indicators */}
        <div className="flex space-x-2 mb-4">
          {profiles.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Main;
