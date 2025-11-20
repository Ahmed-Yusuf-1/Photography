import React, { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, navigateTo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    // CHANGED: Removed 'max-w-7xl mx-auto' so it spans the full width
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="w-full px-6 md:px-12"> 
        <div className="flex justify-between h-24 items-center"> {/* Increased height to h-24 */}
          
          {/* LOGO - Left Corner */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            {/* To change Logo Size: Change h-10 w-10 */}
            <Camera className="h-10 w-10 text-yellow-500" />
            {/* To change Text Size: Change text-3xl */}
            <span className="ml-3 text-3xl font-bold tracking-tighter">
              AFNAN|<span className="text-yellow-500">BAHUBESHI</span>
            </span>
          </div>
          
          {/* DESKTOP MENU - Right Corner */}
          <div className="hidden md:flex space-x-10 items-center">
            {['Home', 'Portfolio', 'Services'].map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item.toLowerCase())}
                // To change Link Size: Change text-lg (options: text-base, text-xl)
                className={`text-lg font-medium transition-colors hover:text-yellow-500 ${
                  currentPage === item.toLowerCase() ? 'text-yellow-500' : 'text-gray-600'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNav('quote')}
              // CTA Button Styling
              className="px-8 py-3 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-yellow-500 hover:text-black transition duration-300 shadow-md"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Home', 'Portfolio', 'Services', 'Quote'].map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item.toLowerCase())}
                className="block w-full text-left px-4 py-4 text-xl font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50 rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}