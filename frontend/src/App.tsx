import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { LayoutDashboard, UserPlus, GraduationCap, Settings, Bell, Home as HomeIcon } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="flex flex-col items-center gap-6 mt-10">
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
        
        {/* Floating Sidebar */}
        <aside className="w-24 fixed left-0 top-0 h-screen flex flex-col items-center py-8 z-40">
          <div className="bg-white rounded-[2rem] w-[72px] flex-1 flex flex-col items-center py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
            {/* Logo */}
            <Link to="/" className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-lg mb-4 hover:scale-105 transition-transform">
              <GraduationCap size={24} strokeWidth={2.5} />
            </Link>

            <Navigation />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-24 min-h-screen px-10 py-10 max-w-[1600px]">
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
