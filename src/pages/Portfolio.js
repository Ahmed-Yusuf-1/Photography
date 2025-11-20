import React from 'react';

export default function Portfolio() {
  const images = [
    { url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=800&q=80", cat: "Wedding" },
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", cat: "Portrait" },
    { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", cat: "Event" }
    // Add more images here
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto animate-fade-in">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] cursor-pointer">
            <img src={img.url} alt={`Portfolio ${index}`} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
              <span className="text-white font-medium uppercase text-sm bg-yellow-500 px-3 py-1 rounded-full">{img.cat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}