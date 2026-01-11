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

// ===== ปรับค่าตรงนี้ได้ตามฟีล =====
const SCROLL_THRESHOLD = 60; // ลากช้าได้
const RESET_TIME = 140; // รอให้หยุด scroll
const SCROLL_COOLDOWN = 700; // delay กันเบิ้ล
// =================================

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const scrollSum = useRef(0);
  const scrollTimeout = useRef(null);
  const canScroll = useRef(true);
  const startY = useRef(0);

  const changeSlide = (direction) => {
    if (!canScroll.current) return;

    canScroll.current = false;

    setCurrentIndex((prev) =>
      direction === "down"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    );

    setTimeout(() => {
      canScroll.current = true;
    }, SCROLL_COOLDOWN);
  };

  // 🖱 Mouse + Trackpad (Mac / Windows)
  const handleWheel = (e) => {
    e.preventDefault();
    if (!canScroll.current) return;

    scrollSum.current += e.deltaY;

    // ถ้าหยุดลาก → reset ค่า
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      scrollSum.current = 0;
    }, RESET_TIME);

    if (Math.abs(scrollSum.current) < SCROLL_THRESHOLD) return;

    changeSlide(scrollSum.current > 0 ? "down" : "up");
    scrollSum.current = 0;
  };

  // 📱 Mobile / iPad
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!canScroll.current) return;

    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return;

    changeSlide(diff > 0 ? "down" : "up");
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 transition-all duration-700 ease-out
            ${
              index === currentIndex
                ? "opacity-100 translate-y-0 z-10"
                : index < currentIndex
                ? "opacity-0 -translate-y-32"
                : "opacity-0 translate-y-32"
            }
          `}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="relative z-20 flex items-center h-full px-10 md:px-20 text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {slides[currentIndex].title}
          </h1>

          <div className="w-20 h-1.5 bg-blue-500 mb-8 rounded-full" />

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
