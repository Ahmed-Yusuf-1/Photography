import React, { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, orderBy, doc, updateDoc, addDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage, appId } from '../config/firebase';
import { Lock, LogOut, Upload, Trash2 } from 'lucide-react';

export default function Admin({ user }) {
  // --- Auth States ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  // --- Data States ---
  const [quotes, setQuotes] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('Wedding');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user && !user.isAnonymous) {
      setIsAdmin(true);
    }
  }, [user]);

  // --- REAL-TIME DATA LISTENER ---
  useEffect(() => {
    if (!isAdmin) return;

    // 1. Listen to Quotes
    const qQuotes = query(collection(db, 'artifacts', appId, 'public', 'data', 'quote_requests'), orderBy('createdAt', 'desc'));
    const unsubQuotes = onSnapshot(qQuotes, (snapshot) => {
      setQuotes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => console.error("Quote Error:", error));

    // 2. Listen to Portfolio
    const qPortfolio = query(collection(db, 'artifacts', appId, 'public', 'data', 'portfolio_images'), orderBy('createdAt', 'desc'));
    const unsubPortfolio = onSnapshot(qPortfolio, (snapshot) => {
      setPortfolio(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => console.error("Portfolio Error:", error));

    return () => { unsubQuotes(); unsubPortfolio(); };
  }, [isAdmin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid credentials.');
    }
  };

  const handleLogout = () => { signOut(auth); setIsAdmin(false); };

  const markAsContacted = async (quoteId) => {
    try {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'quote_requests', quoteId), { status: 'contacted' });
    } catch (error) { console.error("Error:", error); }
  };

  // --- FIXED: Delete Image Function ---
  const handleDeleteImage = async (image) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    try {
      // 1. Delete from Firestore first
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'portfolio_images', image.id));
      
      // 2. Delete from Storage (if path exists)
      if (image.storagePath) {
        const imageRef = ref(storage, image.storagePath);
        await deleteObject(imageRef).catch(err => console.warn("Storage delete failed (might already be gone):", err));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image. Check console for details.");
    }
  };

  // --- UPLOAD LOGIC ---
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setUploading(true); // Lock button

    try {
      // 1. Upload to Storage
      const storageRef = ref(storage, `portfolio/${Date.now()}_${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);

      // 2. Save to Database
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'portfolio_images'), {
        url,
        cat: category,
        storagePath: storageRef.fullPath,
        createdAt: serverTimestamp()
      });

      
    } catch (error) {
      console.error("Error:", error);
      alert("Upload Failed: " + error.message);
    } finally {
      // 3. ALWAYS RESET (Fixes the freezing)
      setUploading(false); 
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" required />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" required />
            <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-500 transition"><LogOut className="w-5 h-5 mr-2" /> Logout</button>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center"><Upload className="w-5 h-5 mr-2 text-yellow-500"/> Upload New Photo</h2>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Photo</label>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
          </div>
          <div className="w-full md:w-48">
             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
             <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-gray-900">
               <option>Wedding</option>
               <option>Portrait</option>
               <option>Event</option>
               <option>Nature</option>
             </select>
          </div>
          <button 
            disabled={!selectedFile || uploading} 
            type="submit" 
            className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      {/* Portfolio Grid */}
      <div className="mb-12">
         <h3 className="text-lg font-bold mb-4 text-gray-800">Current Portfolio ({portfolio.length})</h3>
         {portfolio.length === 0 ? <p className="text-gray-400 italic">No images in database.</p> : (
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {portfolio.map(img => (
                <div key={img.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img src={img.url} alt={img.cat} className="w-full h-full object-cover" />
                  <button onClick={() => handleDeleteImage(img)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">{img.cat}</div>
                </div>
              ))}
           </div>
         )}
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Recent Requests ({quotes.length})</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold">
              <tr><th className="p-4">Client</th><th className="p-4">Service</th><th className="p-4">Date</th><th className="p-4">Quote</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="p-4"><div>{quote.name}</div><div className="text-xs text-gray-500">{quote.email}</div></td>
                  <td className="p-4 capitalize">{quote.serviceType}</td>
                  <td className="p-4">{quote.date}</td>
                  <td className="p-4">${quote.estimatedQuote}</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-gray-100 rounded">{quote.status}</span></td>
                  <td className="p-4">{quote.status === 'new' && <button onClick={() => markAsContacted(quote.id)} className="text-xs border px-2 py-1 rounded hover:bg-gray-100">Done</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}