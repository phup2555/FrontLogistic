import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { image: "/images/sbox1.png", title: "Sbox" },
  { image: "/images/sbox2.png", title: "Document storage" },
  { image: "/images/sbox3.png", title: "Facility storage" },
  { image: "/images/sbox4.png", title: "Facility storage" },
  { image: "/images/sbox5.png", title: "Document storage" },
  { image: "/images/sbox6.png", title: "Database backup" },
  { image: "/images/sbox7.png", title: "Online document access" },
  { image: "/images/sbox8.png", title: "Document hard copy recall" },
  { image: "/images/sbox9.png", title: "ISO" },
  { image: "/images/sbox10.png", title: "ISO" },
  { image: "/images/sbox11.png", title: "ISO" },
  { image: "/images/sbox12.png", title: "ISO" },
  { image: "/images/sbox13.png", title: "ISO" },
];

const SCROLL_THRESHOLD = 20;
const LOCK_TIME = 900;

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLocked = useRef(false);
  const lastDirection = useRef(null);
  const navigate = useNavigate();

  const handleWheel = (e) => {
    e.preventDefault();

    if (isLocked.current) return;
    if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;

    const direction = e.deltaY > 0 ? "down" : "up";

    if (lastDirection.current && lastDirection.current !== direction) return;

    lastDirection.current = direction;
    isLocked.current = true;

    setCurrentIndex((prev) =>
      direction === "down"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    );

    setTimeout(() => {
      isLocked.current = false;
      lastDirection.current = null;
    }, LOCK_TIME);
  };

  return (
    <div
      onWheel={handleWheel}
      className="relative w-full h-screen overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-all duration-700 ease-in-out
            ${
              index === currentIndex
                ? "opacity-100 translate-y-0 z-10"
                : index < currentIndex
                ? "opacity-0 -translate-y-24"
                : "opacity-0 translate-y-24"
            }
          `}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full  object-center"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-20 flex items-center h-full px-10 md:px-20 text-white pointer-events-none">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {slides[currentIndex].title}
          </h1>

          <div className="w-20 h-1.5 bg-blue-500 mb-8 rounded-full" />

          <button
            onClick={() => navigate("/login")}
            className="pointer-events-auto bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
