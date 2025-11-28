
import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Activity, Stethoscope, Thermometer } from 'lucide-react';
import { analyzeSymptoms } from '../services/geminiService';
import { checkSymptoms } from '../services/infermedicaService';
import { Remedy, SymptomAnalysisResult } from '../types';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Remedies: React.FC = () => {
  const [query, setQuery] = useState('');
  const [age, setAge] = useState<number>(20);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  
  const [diagnosis, setDiagnosis] = useState<SymptomAnalysisResult | null>(null);
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'results'>('input');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setDiagnosis(null);
    setRemedies([]);

    try {
      // 1. Get Diagnosis from Infermedica (or mock)
      const diagnosisResult = await checkSymptoms(query, age, sex);
      setDiagnosis(diagnosisResult);

      // 2. Get Home Remedies based on the top condition found
      const topCondition = diagnosisResult.conditions[0]?.common_name || query;
      const remedyResult = await analyzeSymptoms(`I have ${topCondition}. ${query}`);
      setRemedies(remedyResult);
      
      setStep('results');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTriageColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'consultation': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Symptom Checker</h1>
        <p className="text-slate-600 dark:text-slate-400">Powered by AI & Medical Protocols</p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 mb-10 border border-slate-200 dark:border-slate-700">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Age</label>
               <input 
                 type="number" 
                 value={age} 
                 onChange={(e) => setAge(parseInt(e.target.value))}
                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
               />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sex</label>
                <select 
                  value={sex}
                  onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Describe your symptoms</label>
             <div className="relative">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., headache, fever, sore throat"
                  className="w-full pl-6 pr-14 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-lg"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-3 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
                </button>
             </div>
          </div>
        </form>
      </div>

      {step === 'results' && !loading && diagnosis && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Triage Alert */}
          <div className={`p-6 rounded-2xl border ${getTriageColor(diagnosis.triage.triage_level)} flex items-start gap-4`}>
             <AlertCircle size={28} className="flex-shrink-0 mt-1" />
             <div>
               <h3 className="text-lg font-bold capitalize mb-1">Recommendation: {diagnosis.triage.triage_level.replace('_', ' ')}</h3>
               <p className="opacity-90">
                 {diagnosis.triage.triage_level === 'emergency' && "Please visit the nearest hospital immediately."}
                 {diagnosis.triage.triage_level === 'consultation' && "You should consult a doctor soon."}
                 {diagnosis.triage.triage_level === 'self_care' && "Symptoms appear mild. Monitor at home and rest."}
               </p>
             </div>
          </div>

          {/* Conditions Analysis */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6">
               <Stethoscope className="text-primary-500" /> Potential Causes
            </h3>
            <div className="space-y-4">
              {diagnosis.conditions.map((cond) => (
                <div key={cond.id}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-slate-800 dark:text-slate-200">{cond.common_name}</span>
                    <span className="text-slate-500">{(cond.probability * 100).toFixed(0)}% Match</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${cond.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Home Remedies */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-6">
               <Thermometer className="text-accent-500" /> Recommended Home Remedies
            </h3>
            <div className="grid gap-6">
              {remedies.map((remedy, idx) => (
                <MotionDiv 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/10 border-b border-primary-100 dark:border-primary-900/30">
                    <h4 className="font-bold text-primary-900 dark:text-primary-200">{remedy.title}</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{remedy.description}</p>
                    <div className="space-y-2">
                       {remedy.steps.map((step, i) => (
                         <div key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                           <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">{i+1}</span>
                           {step}
                         </div>
                       ))}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Remedies;
