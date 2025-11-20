import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Services({ navigateTo }) {
  const services = [
    { title: "Wedding", price: "$2,500", details: ["8 Hours Coverage", "2 Photographers", "Online Gallery"], img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" },
    { title: "Portrait", price: "$350", details: ["2 Hours Session", "2 Locations", "25 Retouched Photos"], img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80" },
    { title: "Event", price: "$150/hr", details: ["Corporate/Private", "Candid Moments", "Fast Turnaround"], img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto animate-fade-in">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Services & Investment</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="h-48"><img src={service.img} alt={service.title} className="w-full h-full object-cover" /></div>
            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-3xl font-bold text-yellow-600 mb-6">{service.price}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {service.details.map((d, i) => <li key={i} className="flex items-center text-gray-600"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3" />{d}</li>)}
              </ul>
              <button onClick={() => navigateTo('quote')} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}