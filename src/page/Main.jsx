import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "/images/PastedGraphic2.png",
    title: "Fast Delivery",
  },
  {
    image: "/images/SECUREDATASTORAGE.png",
    title: "Secure Storage",
  },
];

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay ปรับให้อ่านข้อความง่ายขึ้น */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 transform">
            {slides[currentIndex].title}
          </h1>
          <div className="w-20 h-1.5 bg-blue-500 mb-8 rounded-full" />

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition-transform active:scale-95 shadow-lg"
          >
            Get Started
          </button>
        </div>

        <div className="flex gap-3 mt-12">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === currentIndex ? "w-12 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/30 text-white transition-all"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/30 text-white transition-all"
      >
        ❯
      </button>
    </div>
  );
};

export default Main;
