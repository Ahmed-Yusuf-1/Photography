// src/pages/Quote.js
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, appId } from '../config/firebase'; // Importing from our new config file
import emailjs from '@emailjs/browser';

export default function Quote({ user, showNotification }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    serviceType: 'portrait',
    hours: 2,
    notes: ''
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing Logic
  useEffect(() => {
    let base = 0;
    let hourly = 0;
    switch(formData.serviceType) {
      case 'wedding': base = 1500; hourly = 200; break;
      case 'portrait': base = 150; hourly = 100; break;
      case 'event': base = 200; hourly = 150; break;
      default: base = 0;
    }
    setCalculatedPrice(base + (hourly * formData.hours));
  }, [formData.serviceType, formData.hours]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showNotification('Please wait for connection...', 'error');
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'quote_requests'), {
        ...formData,
        estimatedQuote: calculatedPrice,
        createdAt: serverTimestamp(),
        status: 'new'
      });

      // 2. Send Email via EmailJS
      // NOTE: Replace these strings with your actual EmailJS keys
      const serviceID = "YOUR_SERVICE_ID"; 
      const templateID = "YOUR_TEMPLATE_ID"; 
      const publicKey = "YOUR_PUBLIC_KEY"; 

      const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        service_type: formData.serviceType,
        estimated_price: calculatedPrice,
        event_date: formData.date,
        message: `Estimated Quote: $${calculatedPrice}`
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      showNotification('Quote request sent! Check your email.', 'success');
      setFormData({ name: '', email: '', date: '', serviceType: 'portrait', hours: 2, notes: '' });

    } catch (error) {
      console.error("Error:", error);
      showNotification('Request saved, but email failed.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
          <p className="text-gray-300">Tell us about your needs and get an instant estimate.</p>
        </div>
        
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <input required type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                <input required type="number" min="1" max="12" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  value={formData.hours} onChange={e => setFormData({...formData, hours: Number(e.target.value)})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                <option value="portrait">Portrait Session</option>
                <option value="wedding">Wedding</option>
                <option value="event">Event Coverage</option>
              </select>
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition shadow-lg disabled:opacity-70">
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </form>
          <div className="flex flex-col justify-center space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">Estimated Quote</h3>
            <div className="text-5xl font-bold text-yellow-600">${calculatedPrice}</div>
            <p className="text-sm text-gray-500 italic">* Preliminary estimate.</p>
             <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5"/> Request received instantly.</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5"/> We check availability.</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5"/> Confirmation within 24h.</li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}