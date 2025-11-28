import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { motion } from 'framer-motion';
import { Shield, Heart, Zap } from 'lucide-react';

const MotionDiv = motion.div as any;

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Link to="/login" className="px-6 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors">
          Get Started
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Health help for <span className="text-primary-600 dark:text-primary-400">students</span> away from home.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Feeling unwell? Swasthya Saarthi connects you with instant home remedies, reliable drug information, and nearby doctors in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-center shadow-lg shadow-primary-500/30 transition-all hover:scale-105">
                Join Now
              </Link>
              <button className="px-8 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Learn More
              </button>
            </div>
          </MotionDiv>

          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Medical App" 
              className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </MotionDiv>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verified Doctors", desc: "Connect with licensed professionals nearby using our radar tech." },
            { icon: Zap, title: "Instant Remedies", desc: "AI-powered home remedies for common student ailments." },
            { icon: Heart, title: "Drug Info", desc: "Understand your medicines with clear, simplified explanations." }
          ].map((feature, i) => (
            <MotionDiv 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <feature.icon className="w-10 h-10 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </MotionDiv>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;