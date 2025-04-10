"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const targetDate = new Date("2025-04-30T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    milliseconds: "00",
  });

  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowImage(true), 2000); // через 2 секунди
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          milliseconds: "00",
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((distance % 1000) / 10);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
          milliseconds: String(milliseconds).padStart(2, "0"),
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Відео-фон */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Темна маска */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" /> */}

      {/* Контент */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <div className="text-center mb-10">
          <h2 className="text-[#009900] text-5xl md:text-7xl lg:text-8xl font-extrabold pulse-text">
            Відлік до удару:
          </h2>
          <div className="mt-3 h-1 w-40 bg-[#009900] mx-auto rounded-full opacity-80" />
        </div>

        <div className="tracking-tight animate-titleDrop pulse-text flex flex-wrap items-center justify-center gap-4 text-[color:#009900] text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight font-mono">
          <span>{timeLeft.days}</span>
          <span>:</span>
          <span>{timeLeft.hours}</span>
          <span>:</span>
          <span>{timeLeft.minutes}</span>
          <span>:</span>
          <span>{timeLeft.seconds}</span>
          <span>:</span>
          <span>{timeLeft.milliseconds}</span>
        </div>
      </div>

      <div
        className={`p-[40px] absolute top-0 left-0 w-full h-full z-5 transition-opacity duration-2000 ease-in-out ${
          showImage ? "opacity-100" : "opacity-0"
        } pointer-events-none`}
        style={{
          backgroundImage: 'url("/img.webp")', // заміни шлях
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
          // filter: "blur(20px)",
          opacity: 0.8, // можеш погратись з цим
        }}
      ></div>
    </main>
  );
}
