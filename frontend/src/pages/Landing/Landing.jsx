import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../assets/images/hero.png";

const Landing = () => {
  return (
    <section className="relative h-screen flex items-center !overflow-x-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff]">
      
      {/* Soft Gradient Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff775f]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6366f1]/20 rounded-full blur-3xl" />

      <div className="relative max-w-[1150px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          {/* Brand Badge */}
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-sm font-bold tracking-wide text-[#1a2e35] bg-white/80 backdrop-blur rounded-full border border-gray-200 shadow-sm">
            <span className="w-2 h-2 bg-[#ff775f] rounded-full" />
            Todoify
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#1a2e35] mb-6">
            Simplify Work <br />
            Amplify Life{" "}
            <span className="block bg-gradient-to-r from-[#ff775f] to-[#ff9a7a] bg-clip-text text-transparent">
              Effortlessly.
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-10 max-w-xl">
            Todoify turns your thoughts into perfectly organized tasks.
            Just type naturally — Todoify handles the rest.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/register"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#ff775f] to-[#ff9a7a] text-white font-semibold shadow-lg shadow-[#ff775f]/30 hover:scale-105 transition-all duration-300 !no-underline"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-lg bg-white/80 backdrop-blur border border-gray-200 text-[#1a2e35] font-semibold hover:bg-white hover:scale-105 transition-all duration-300 !no-underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff775f]/20 to-[#6366f1]/20 rounded-3xl blur-2xl" />
          <img
            src={Hero}
            alt="Todoify App Preview"
            className="relative w-full max-w-[540px] object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Landing;
