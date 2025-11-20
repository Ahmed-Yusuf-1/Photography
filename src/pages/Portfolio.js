import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../config/firebase';

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Real-time listener for portfolio updates
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'portfolio_images'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(fetchedImages);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.cat === filter);
  const categories = ['All', 'Wedding', 'Portrait', 'Event', 'Nature'];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto animate-fade-in min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Portfolio</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">A selection of our recent work capturing moments that last a lifetime.</p>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === cat ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20 text-gray-400">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] cursor-pointer bg-gray-100">
              <img
                src={img.url}
                alt={img.cat}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <span className="text-white font-medium uppercase tracking-wider text-sm bg-yellow-500 px-3 py-1 rounded-full">{img.cat}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && images.length === 0 && (
        <div className="text-center text-gray-400 py-12">No photos uploaded yet. Go to Admin Dashboard to add some!</div>
      )}
    </div>
  );
}