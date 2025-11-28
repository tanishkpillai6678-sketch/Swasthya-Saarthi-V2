import React, { useState } from 'react';
import { Search, Info, AlertTriangle, ChevronRight } from 'lucide-react';
import { getMedicineInfo } from '../services/geminiService';
import { Medicine } from '../types';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Medicines: React.FC = () => {
  const [query, setQuery] = useState('');
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setMedicine(null);
    const data = await getMedicineInfo(query);
    setMedicine(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Medicine Info</h1>
        <p className="text-slate-600 dark:text-slate-400">Identify pills, check side effects, and understand dosages.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-12 relative">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter medicine name (e.g. Paracetamol, Ibuprofen)"
          className="w-full pl-6 pr-14 py-4 rounded-2xl shadow-lg border-0 bg-white dark:bg-slate-800 text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-orange-500 text-lg transition-all"
        />
        <button 
          type="submit"
          className="absolute right-3 top-3 p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
        </button>
      </form>

      {medicine && (
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="bg-orange-500 p-6 text-white">
            <h2 className="text-2xl font-bold capitalize mb-1">{medicine.name}</h2>
            <p className="opacity-90 text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full">{medicine.category}</p>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3">
                    <Info size={18} className="text-primary-500" /> Uses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.uses.map((use, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">{use}</span>
                    ))}
                  </div>
               </div>

               <div>
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3">
                    <AlertTriangle size={18} className="text-orange-500" /> Side Effects
                  </h3>
                  <ul className="space-y-2">
                    {medicine.sideEffects.map((effect, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <ChevronRight size={14} className="mt-1 flex-shrink-0" /> {effect}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                 <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Dosage Note</h3>
                 <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">{medicine.dosageNote}</p>
              </div>

              {medicine.warnings.length > 0 && (
                 <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50">
                    <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">Warnings</h3>
                    <ul className="space-y-1">
                      {medicine.warnings.map((warn, i) => (
                        <li key={i} className="text-sm text-red-700 dark:text-red-300 list-disc ml-4">{warn}</li>
                      ))}
                    </ul>
                 </div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-900 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Data provided by AI. Always verify with a qualified pharmacist or doctor.
          </div>
        </MotionDiv>
      )}
    </div>
  );
};

export default Medicines;