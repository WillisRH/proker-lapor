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
          Perkenalkan nama saya Willis Rihatman, saya berminat terhadap organisasi mpk di sekolah saya, oleh karena itu dengan mengikuti tata tertib aturan sekolah, saya membuat program kerja yang saya namakan "LAPOR", kegunaan web ini adalah untuk mencatat performa anggota organisasi serta organisasi yang dinaunginya, aplikasi ini dibuat menggunakan Next.JS dan mongodb sebagai databasenya. Kurang lebihnya mohon maaf, Terimakasih. 
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
