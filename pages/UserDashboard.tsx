import React from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { Search, MapPin, Pill, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Cast to any to avoid TypeScript errors
const MotionDiv = motion.div as any;
const MotionLink = motion(Link) as any;

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Hello, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400">How are you feeling today?</p>
      </div>

      <MotionDiv 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Quick Actions */}
        <MotionDiv variants={item} className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white overflow-hidden shadow-xl">
             <div className="relative z-10 max-w-xl">
               <h2 className="text-2xl font-bold mb-4">Check your symptoms instantly</h2>
               <p className="mb-6 text-primary-100">Describe what you're feeling and get immediate AI-powered home remedy suggestions.</p>
               <Link to="/remedies" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-bold hover:bg-primary-50 transition-colors">
                 <Search size={20} />
                 Start Checkup
               </Link>
             </div>
             {/* Decor */}
             <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
               <Activity size={300} />
             </div>
          </div>
        </MotionDiv>

        {/* Feature Cards */}
        <MotionLink variants={item} to="/medicines" className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
            <Pill size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Search Medicines</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Understand side effects, dosage, and warnings.</p>
          <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
            Search Now <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </MotionLink>

        <MotionLink variants={item} to="/consult" className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
            <MapPin size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nearby Doctors</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Scan your 5km radius for verified specialists.</p>
          <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
            Open Radar <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </MotionLink>
        
        <MotionDiv variants={item} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
           <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</h3>
           <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
               <p className="text-sm text-slate-600 dark:text-slate-300">Login from new device</p>
               <span className="ml-auto text-xs text-slate-400">2m ago</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
               <p className="text-sm text-slate-600 dark:text-slate-300">Searched "Headache"</p>
               <span className="ml-auto text-xs text-slate-400">1d ago</span>
             </div>
           </div>
        </MotionDiv>

      </MotionDiv>
    </div>
  );
};

export default Dashboard;