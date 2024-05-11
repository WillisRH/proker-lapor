// components/AboutMe.jsx
import Navbar from '@/components/navbar';
import React from 'react';

export default function AboutMe() {
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">About Me</h1>
        <p className="text-lg text-gray-800">
          I created this website for my "Program Kerja" to join the MPK. The purpose of this website is to showcase my skills and achievements, as well as to provide information about my candidacy for the MPK position. 
        </p>
        {/* Centered image */}
        <div className="flex justify-center mt-8">
          <img src="https://us-tuna-sounds-images.voicemod.net/d5ce3445-3ffb-4c80-8cec-b8a15e87c298-1660062631456.jpg" alt="About Me" className="max-w-full h-auto" />
          <img src=" https://th.bing.com/th/id/OIP.8BJtAQWKTgvEpdJwWoC5cQHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="About Me" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};
