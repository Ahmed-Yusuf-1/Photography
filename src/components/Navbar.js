import React, { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, navigateTo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <Camera className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold">AFNAN <span className="text-yellow-500">BEHUBESHI</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'Portfolio', 'Services'].map((item) => (
              <button key={item} onClick={() => handleNav(item.toLowerCase())} className={`text-sm font-medium hover:text-yellow-500 ${currentPage === item.toLowerCase() ? 'text-yellow-500' : 'text-gray-600'}`}>
                {item}
              </button>
            ))}
            <button onClick={() => handleNav('quote')} className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-yellow-500 transition">Book Now</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {['Home', 'Portfolio', 'Services', 'Quote'].map((item) => (
            <button key={item} onClick={() => handleNav(item.toLowerCase())} className="block w-full text-left px-6 py-3 font-medium text-gray-700 hover:bg-gray-50">
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}