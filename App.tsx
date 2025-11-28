
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { User } from './types';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/UserDashboard';
import Remedies from './pages/Remedies';
import Medicines from './pages/Medicines';
import Consult from './pages/ConsultRadar';
import ConsultationChat from './pages/ConsultationChat';

const App: React.FC = () => {
  // Simple auth state for demo
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent mock session
    const savedUser = localStorage.getItem('swasthya_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('swasthya_user', JSON.stringify(u));
  };

  const handleLogout = (u: any) => {
    setUser(null);
    localStorage.removeItem('swasthya_user');
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={user ? <Layout user={user} setUser={handleLogout}><Dashboard user={user} /></Layout> : <Navigate to="/login" />} />
        <Route path="/remedies" element={user ? <Layout user={user} setUser={handleLogout}><Remedies /></Layout> : <Navigate to="/login" />} />
        <Route path="/medicines" element={user ? <Layout user={user} setUser={handleLogout}><Medicines /></Layout> : <Navigate to="/login" />} />
        <Route path="/consult" element={user ? <Layout user={user} setUser={handleLogout}><Consult user={user} /></Layout> : <Navigate to="/login" />} />
        <Route path="/chat/:id" element={user ? <Layout user={user} setUser={handleLogout}><ConsultationChat user={user} /></Layout> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <Layout user={user} setUser={handleLogout}><div className="text-center mt-20 text-slate-500">History Feature Coming Soon</div></Layout> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
