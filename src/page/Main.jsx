import React, { useState, useRef, useEffect } from "react";
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

// ===== ปรับฟีลได้ =====
const SCROLL_THRESHOLD = 60;
const RESET_TIME = 140;
const SCROLL_COOLDOWN = 700;
// ======================

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
        ? Math.min(prev + 1, slides.length - 1)
        : Math.max(prev - 1, 0)
    );

    setTimeout(() => {
      canScroll.current = true;
    }, SCROLL_COOLDOWN);
  };

  // 🖱 Mouse / Trackpad
  const handleWheel = (e) => {
    e.preventDefault();
    if (!canScroll.current) return;

    scrollSum.current += e.deltaY;

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      scrollSum.current = 0;
    }, RESET_TIME);

    if (Math.abs(scrollSum.current) < SCROLL_THRESHOLD) return;

    changeSlide(scrollSum.current > 0 ? "down" : "up");
    scrollSum.current = 0;
  };

  // 📱 Touch
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!canScroll.current) return;

    const diff = startY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return;

    changeSlide(diff > 0 ? "down" : "up");
  };

  // ⌨️ Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!canScroll.current) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        changeSlide("down");
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        changeSlide("up");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* SLIDES */}
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

      {/* CONTENT */}
      <div className="relative z-20 flex items-center h-full px-10 md:px-20 text-white">
        <div className="max-w-xl">
          <h1
            className="
    text-[clamp(2.8rem,6vw,4.5rem)]
    font-semibold
    tracking-tight
    leading-[1.2]
    py-1
    mb-6
    bg-gradient-to-r from-white to-blue-200
    bg-clip-text text-transparent
    drop-shadow
  "
          >
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

      {/* SLIDE INDICATOR */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all
              ${i === currentIndex ? "bg-white scale-125" : "bg-white/40"}
            `}
          />
        ))}
      </div>

      {/* HINT */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/70 text-sm flex items-center gap-2">
        <span>Scroll / Swipe / ↑ ↓</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{
            width: `${((currentIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Main;
