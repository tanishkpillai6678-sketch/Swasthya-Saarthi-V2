import React, { useState, useEffect } from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import { 
      Home, 
      Search, 
      Activity, 
      MapPin, 
      FileText, 
      Menu, 
      X, 
      LogOut,
      Moon,
      Sun,
      User
    } from 'lucide-react';
    import { Logo } from './Logo';
    
    interface LayoutProps {
      children: React.ReactNode;
      user: any; // Using any for demo simplicity
      setUser: (u: any) => void;
    }
    
    const Layout: React.FC<LayoutProps> = ({ children, user, setUser }) => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [isDark, setIsDark] = useState(false);
      const location = useLocation();
      const navigate = useNavigate();
    
      useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          setIsDark(true);
          document.documentElement.classList.add('dark');
        } else {
          setIsDark(false);
          document.documentElement.classList.remove('dark');
        }
      }, []);
    
      const toggleTheme = () => {
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDark(false);
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDark(true);
        }
      };
    
      const handleLogout = () => {
        setUser(null);
        navigate('/');
      };
    
      const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Activity, label: 'Symptom Checker', path: '/remedies' },
        { icon: Search, label: 'Medicines', path: '/medicines' },
        { icon: MapPin, label: 'Find Doctors', path: '/consult' },
        { icon: FileText, label: 'History', path: '/history' },
      ];
    
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
          {/* Mobile Header */}
          <div className="md:hidden fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
            <Logo simple />
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 dark:text-slate-300">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
    
          {/* Sidebar */}
          <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out
            md:translate-x-0 md:static
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-6 flex flex-col h-full">
              <div className="hidden md:block mb-8">
                <Logo />
              </div>
    
              {/* User Profile Snippet */}
              <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 flex items-center justify-center">
                    <User size={20} />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{user.role}</p>
                 </div>
              </div>
    
              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
    
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>
    
          {/* Main Content */}
          <main className="flex-1 pt-20 md:pt-0 p-4 md:p-8 overflow-x-hidden overflow-y-auto h-screen">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
    
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      );
    };
    
    export default Layout;
    