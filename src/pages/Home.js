import React from 'react';
import { Camera, Calendar, Image as ImageIcon, Heart, Users, Star, Coffee, ArrowRight } from 'lucide-react';

export default function Home({ navigateTo }) {
  return (
    <div className="animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {/* You can change this URL to one of your own portfolio images later */}
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Photographer Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Capture <span className="text-yellow-400 font-serif italic">Life's</span> Moments
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-100">
            Professional photography for weddings, portraits, and events. Telling your unique story through the lens.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={() => navigateTo('portfolio')} className="px-10 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
              View Portfolio
            </button>
            <button onClick={() => navigateTo('quote')} className="px-10 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-full hover:bg-yellow-600 transition duration-300 border-2 border-yellow-500 shadow-lg">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* 2. ABOUT THE ARTIST */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-yellow-500 rounded-xl"></div>
                <img 
                    src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=800&q=80" 
                    alt="The Photographer" 
                    className="relative z-10 rounded-xl shadow-2xl w-full object-cover aspect-[4/5]"
                />
            </div>
            <div>
                <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-2">About Me</h4>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Hi, I'm Afnan.</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Photography isn't just about clicking a button; it's about freezing a feeling. I specialize in natural light photography that highlights the authentic beauty of my subjects.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Whether it's the tear in a groom's eye or the chaotic joy of a family reunion, I'm there to document it all. When I'm not shooting, you can find me exploring new coffee shops or hiking the great outdoors.
                </p>
                <div className="flex items-center gap-4 font-semibold text-gray-900 cursor-pointer hover:text-yellow-500 transition" onClick={() => navigateTo('portfolio')}>
                    See My Work <ArrowRight className="w-5 h-5" />
                </div>
            </div>
        </div>
      </div>

      {/* 3. STATISTICS STRIP */}
      <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                { icon: <Heart className="w-8 h-8 text-yellow-500 mx-auto mb-3" />, count: "150+", label: "Weddings Shot" },
                { icon: <Users className="w-8 h-8 text-yellow-500 mx-auto mb-3" />, count: "500+", label: "Happy Clients" },
                { icon: <Coffee className="w-8 h-8 text-yellow-500 mx-auto mb-3" />, count: "1,000+", label: "Coffees Consumed" },
                { icon: <Camera className="w-8 h-8 text-yellow-500 mx-auto mb-3" />, count: "50k+", label: "Photos Taken" },
            ].map((stat, idx) => (
                <div key={idx}>
                    {stat.icon}
                    <div className="text-4xl font-bold mb-1">{stat.count}</div>
                    <div className="text-gray-400 uppercase text-sm tracking-wider">{stat.label}</div>
                </div>
            ))}
          </div>
      </div>

      {/* 4. WHY CHOOSE US (Refined) */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Clients Love Us</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Camera className="w-12 h-12 text-yellow-500" />, title: "Top-Tier Equipment", text: "We use the latest Sony Alpha gear and G-Master lenses to ensure every pixel is crisp and vibrant." },
            { icon: <Calendar className="w-12 h-12 text-yellow-500" />, title: "Reliable & Punctual", text: "Your time is precious. We pride ourselves on arriving early and delivering galleries on schedule." },
            { icon: <ImageIcon className="w-12 h-12 text-yellow-500" />, title: "Cinematic Editing", text: "Each photo undergoes a rigorous editing process to achieve that signature warm, cinematic look." }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-10 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. HOW IT WORKS */}
      <div className="py-24 px-6 bg-yellow-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">The Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {[
                    { step: "01", title: "Book", desc: "Fill out the quote form to secure your date." },
                    { step: "02", title: "Plan", desc: "We discuss locations, outfits, and style." },
                    { step: "03", title: "Shoot", desc: "Relax and have fun while we work our magic." },
                    { step: "04", title: "Deliver", desc: "Receive your edited gallery within 2 weeks." },
                ].map((item, i) => (
                    <div key={i} className="relative">
                        <div className="text-6xl font-bold text-yellow-200 absolute -top-8 -left-4 z-0">{item.step}</div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>

      {/* 6. CTA */}
      <div className="py-20 px-6 bg-gray-900 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to tell your story?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Dates fill up fast. Let's chat about your upcoming event and create something beautiful together.
          </p>
          <button onClick={() => navigateTo('quote')} className="px-10 py-4 bg-yellow-500 text-white text-lg font-bold rounded-full hover:bg-white hover:text-gray-900 transition duration-300">
              Book Your Session
          </button>
      </div>

    </div>
  );
}