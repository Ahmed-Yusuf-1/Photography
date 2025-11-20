import React from 'react';
import { Camera, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center text-white mb-4">
            <Camera className="h-6 w-6 text-yellow-500" />
            <span className="ml-2 text-lg font-bold">LUMOSLENS</span>
          </div>
          <p className="text-sm">Capturing your most precious moments.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p>hello@lumoslens.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-500"><Instagram /></a>
            <a href="#" className="hover:text-yellow-500"><Facebook /></a>
            <a href="#" className="hover:text-yellow-500"><Twitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}