import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Users, BookOpen, UserCheck, UserMinus, ChevronRight, Mic, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const aiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aiContainerRef.current && !aiContainerRef.current.contains(event.target as Node)) {
        setChatHistory([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, studentsRes] = await Promise.all([
        axios.get(`${API_URL}/api/dashboard/stats`),
        axios.get(`${API_URL}/api/students`)
      ]);
      setStats(statsRes.data);
      setStudents(studentsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleRunAllocation = async () => {
    try {
      await axios.post(`${API_URL}/api/allocate`);
      fetchData();
    } catch (err) {
      alert('Allocation failed.');
    }
  };

  const handleAskAI = async () => {
    if (!query) return;
    setChatHistory([...chatHistory, { role: 'user', text: query }]);
    setQuery('');
    setAiLoading(true);
    
    try {
      const res = await axios.post(`${API_URL}/api/ai/chat`, { query });
      setChatHistory(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Error connecting to AI service.';
      setChatHistory(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const pieData = stats?.categoryAllocations?.map((c: any) => ({
    name: c._id,
    value: c.count
  })) || [];

  const COLORS = ['#e76f51', '#2a9d8f', '#e9c46a', '#264653'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative pb-20">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-20 h-20 rounded-[2rem] bg-white flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <span className="text-2xl font-black text-slate-800">{new Date().getDate()}</span>
          </div>
          <div>
            <p className="text-slate-500 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long' })}
            </p>
          </div>
          <div className="hidden sm:block h-10 w-px bg-slate-200 mx-2"></div>
          <button 
            onClick={handleRunAllocation}
            className="bg-[#e76f51] hover:bg-[#d65f42] text-white px-6 py-3.5 rounded-full font-medium flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(231,111,81,0.25)] hover:scale-105 active:scale-95"
          >
            Run Allocation Logic <ChevronRight size={18} />
          </button>
          <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
             <Calendar size={20} />
             <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#e76f51] rounded-full border-2 border-white box-content"></span>
          </button>
        </div>

        <div ref={aiContainerRef} className="flex-1 w-full max-w-xl relative z-50">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-4">Hey, Need help? 👋</h2>
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAskAI()}
              placeholder="Just ask me anything!"
              className="w-full bg-white px-6 py-4 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 outline-none text-lg text-slate-700 placeholder:text-slate-400 font-medium focus:ring-4 focus:ring-[#e76f51]/10 focus:border-[#e76f51] transition-all pr-16"
              disabled={aiLoading}
            />
            <button 
              onClick={handleAskAI}
              disabled={aiLoading || !query}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#e76f51] text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-sm"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
          {aiLoading && <div className="text-sm text-[#e76f51] font-medium mt-3 ml-2 animate-pulse">AI is thinking...</div>}
          {chatHistory.length > 0 && !aiLoading && (
            <div className="absolute top-full left-0 w-full mt-4 bg-white p-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-50 z-50 max-h-[400px] overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                 <div key={idx} className={`mb-5 last:mb-0 text-[15px] leading-relaxed ${msg.role === 'user' ? 'text-slate-500' : 'text-slate-800 font-medium'}`}>
                   <strong className="block text-[10px] uppercase tracking-widest text-[#e76f51] mb-1.5">{msg.role === 'user' ? 'You' : 'AI Assistant'}</strong>
                   {msg.text}
                 </div>
              ))}
              <button onClick={() => setChatHistory([])} className="text-xs text-slate-400 hover:text-slate-600 mt-4 font-medium transition-colors">Clear history</button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-semibold text-slate-800">Total Applicants</span>
            <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-medium flex items-center gap-1">
              <Users size={14} /> Total
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Total applications received</p>
            <h4 className="text-4xl font-black text-[#e76f51]">{stats?.totalStudents || 0}</h4>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-semibold text-slate-800">System Capacity</span>
            <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-medium flex items-center gap-1">
              <BookOpen size={14} /> Seats
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Total seats available</p>
            <h4 className="text-4xl font-black text-[#e76f51]">{stats?.totalSeats || 0}</h4>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <UserCheck size={120} />
          </div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="font-semibold text-slate-100">Allocated Students</span>
            <div className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-md">
              Success
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-1">Successfully allocated</p>
            <h4 className="text-4xl font-black text-white">{stats?.allocatedStudents || 0}</h4>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <span className="font-semibold text-slate-800">Unallocated</span>
            <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-medium flex items-center gap-1">
              <UserMinus size={14} /> Pending
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Awaiting allocation</p>
            <h4 className="text-4xl font-black text-slate-800">{stats?.unallocatedStudents || 0}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-slate-800">Category Distribution</h3>
            <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-medium">All categories ▾</span>
          </div>
          <div className="h-64 relative">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                    {pieData.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="drop-shadow-sm" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#334155', fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">No allocations yet</div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {pieData.map((entry: any, idx: number) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                {entry.name}: {entry.value}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Manager / Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-slate-800">Activity manager</h3>
            <div className="flex gap-2">
               <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs font-medium cursor-pointer hover:bg-slate-100">Team</span>
               <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs font-medium cursor-pointer hover:bg-slate-100">Insights</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto pr-2">
            <div className="space-y-4">
              {students.slice(0, 10).map((student) => (
                <div key={student._id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{student.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{student.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{student.marks}% Marks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                     {student.isAllocated ? (
                        <>
                          <span className="text-sm font-semibold text-slate-800">{student.allocatedCourse?.name || 'Unknown'}</span>
                          <span className="text-xs text-[#2a9d8f] font-medium mt-0.5 flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#2a9d8f]"></div> Preference {student.preferenceMet}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-slate-400">Not Assigned</span>
                          <span className="text-xs text-[#e76f51] font-medium mt-0.5 flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#e76f51]"></div> Pending
                          </span>
                        </>
                      )}
                  </div>
                </div>
              ))}
              {students.length === 0 && (
                <div className="text-center py-12 text-slate-400 font-medium">No activity to show.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


