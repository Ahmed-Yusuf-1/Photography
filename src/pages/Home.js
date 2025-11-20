import React from 'react';
import { Camera, Calendar, Image as ImageIcon } from 'lucide-react';

export default function Home({ navigateTo }) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Capture Life's <span className="text-yellow-400">Moments</span></h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigateTo('portfolio')} className="px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-black transition">View Portfolio</button>
            <button onClick={() => navigateTo('quote')} className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition border-2 border-yellow-500">Get a Quote</button>
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Camera className="w-10 h-10 text-yellow-500" />, title: "High Quality Gear", text: "Latest full-frame mirrorless cameras." },
            { icon: <Calendar className="w-10 h-10 text-yellow-500" />, title: "Flexible Scheduling", text: "We work around your schedule." },
            { icon: <ImageIcon className="w-10 h-10 text-yellow-500" />, title: "Expert Editing", text: "Professional color-grading included." }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}