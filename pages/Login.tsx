import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // Mock successful login
      const mockUser: User = {
        uid: 'demo-123',
        name: isRegister ? 'New Student' : 'Demo Student',
        email: 'demo@student.com',
        role: 'user',
        photoURL: ''
      };
      onLogin(mockUser);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="p-8 text-center bg-primary-600">
          <div className="flex justify-center mb-4 bg-white w-16 h-16 rounded-full items-center mx-auto shadow-lg">
             <Logo simple className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-primary-100 mt-2">Your personal health companion</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input required type="text" className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="John Doe" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input required type="email" className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="student@university.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input required type="password" className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="••••••••" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
              ) : (
                isRegister ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
          
          <div className="mt-8 text-center text-xs text-slate-400">
            <p>Demo Mode: Click "Sign In" to enter as a test user.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
