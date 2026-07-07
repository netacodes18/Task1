import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { LayoutDashboard, UserPlus, GraduationCap } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="flex flex-row md:flex-col items-center w-full justify-between md:justify-center md:gap-6 md:mt-10 px-4 md:px-0">
      {/* Logo / Home */}
      <Link 
        to="/" 
        className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-transform shrink-0 ${location.pathname === '/' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-slate-800/5 text-slate-500 hover:bg-slate-900 hover:text-white'}`}
        title="Home"
      >
        <GraduationCap size={24} strokeWidth={2.5} />
      </Link>
      <Link 
        to="/dashboard" 
        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${location.pathname === '/dashboard' ? 'bg-[#e76f51] text-white shadow-lg shadow-[#e76f51]/30' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}
        title="Dashboard"
      >
        <LayoutDashboard size={22} strokeWidth={2.5} />
      </Link>
      <Link 
        to="/register" 
        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${location.pathname === '/register' ? 'bg-[#e76f51] text-white shadow-lg shadow-[#e76f51]/30' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}
        title="Registration"
      >
        <UserPlus size={22} strokeWidth={2.5} />
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-slate-800">
        
        {/* Floating Sidebar -> Bottom Nav on Mobile */}
        <aside className="w-full md:w-24 fixed bottom-0 left-0 md:top-0 h-20 md:h-screen flex flex-row md:flex-col items-center p-4 md:py-8 z-50">
          <div className="bg-white/90 backdrop-blur-xl md:bg-white rounded-[2rem] w-full md:w-[72px] h-full md:flex-1 flex flex-row md:flex-col items-center justify-center px-4 md:px-0 py-0 md:py-6 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/50 md:border-slate-100/50">
            <Navigation />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-24 mb-20 md:mb-0 min-h-screen px-4 md:px-10 py-6 md:py-10 max-w-[1600px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
