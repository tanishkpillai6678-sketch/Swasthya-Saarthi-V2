
import React, { useState, useEffect } from 'react';
import Radar from '../components/Radar';
import { Doctor, User } from '../types';
import { MOCK_DOCTORS, MOCK_USER_LOCATION } from '../constants';
import { MapPin, Star, Calendar, Clock, Video, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionDiv = motion.div as any;

const Consult: React.FC<{ user: User }> = ({ user }) => {
  const [scanning, setScanning] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API scan time
    const timer = setTimeout(() => {
      setDoctors(MOCK_DOCTORS);
      setScanning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const startConsultation = (mode: 'video' | 'chat') => {
    // In a real app, we would create a consultation record in the DB first
    navigate(`/chat/demo-chat`);
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center">
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Doctor Radar</h1>
        <p className="text-slate-600 dark:text-slate-400">Scanning 5km radius around you...</p>
      </div>

      <div className="relative w-full max-w-lg mb-8">
        <Radar 
          userLocation={MOCK_USER_LOCATION} 
          doctors={scanning ? [] : doctors}
          onSelectDoctor={setSelectedDoc}
        />
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-black/50 text-white px-4 py-1 rounded-full text-sm animate-pulse backdrop-blur-sm">
              Acquiring Satellites...
            </span>
          </div>
        )}
      </div>

      {/* Doctor Detail Modal/Sheet */}
      <AnimatePresence>
        {selectedDoc && (
          <MotionDiv 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] border-t border-slate-200 dark:border-slate-800 p-6 md:max-w-2xl md:mx-auto md:relative md:rounded-3xl md:border md:shadow-2xl md:mb-10"
          >
             <button 
               onClick={() => setSelectedDoc(null)}
               className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full"
             >
               <X size={20} />
             </button>

             <div className="flex gap-4 mb-6">
               <img 
                 src={selectedDoc.photoURL} 
                 alt={selectedDoc.name} 
                 className="w-20 h-20 rounded-2xl object-cover shadow-md"
               />
               <div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   {selectedDoc.name}
                   {selectedDoc.verified && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">Verified</span>}
                 </h2>
                 <p className="text-primary-600 dark:text-primary-400 font-medium">{selectedDoc.speciality}</p>
                 <div className="flex items-center text-sm text-slate-500 mt-1">
                   <MapPin size={14} className="mr-1" /> {selectedDoc.clinicAddress}
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Consultation Fee</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">₹{selectedDoc.fee}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Availability</div>
                  <div className="text-lg font-bold text-green-500 flex items-center gap-1">
                     <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online Now
                  </div>
                </div>
             </div>

             <div className="flex gap-3">
               <button 
                 onClick={() => startConsultation('chat')}
                 className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
               >
                 <MessageSquare size={18} /> Chat Now
               </button>
               <button 
                 onClick={() => startConsultation('video')}
                 className="flex-1 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
               >
                 <Video size={18} /> Video Call
               </button>
             </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Consult;
