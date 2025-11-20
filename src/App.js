
"use client";
import React, { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Quote from './pages/Quote';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Initialize Auth
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 animate-bounce ${notification.type === 'success' ? 'bg-yellow-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      <main>
        {currentPage === 'home' && <Home navigateTo={navigateTo} />}
        {currentPage === 'portfolio' && <Portfolio />}
        {currentPage === 'services' && <Services navigateTo={navigateTo} />}
        {currentPage === 'quote' && <Quote user={user} showNotification={showNotification} />}
      </main>

      <Footer />
    </div>
  );
}