import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const [courses, setCourses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    marks: '',
    category: 'General',
    pref1: '',
    pref2: '',
    pref3: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    const preferences = [formData.pref1, formData.pref2, formData.pref3].filter(p => p !== '');
    
    try {
      await axios.post(`${API_URL}/api/students`, {
        name: formData.name,
        marks: parseFloat(formData.marks),
        category: formData.category,
        preferences
      });
      setStatus({ type: 'success', message: 'Application submitted successfully! Good luck!' });
      setFormData({ name: '', marks: '', category: 'General', pref1: '', pref2: '', pref3: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to submit application. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12 mt-4 md:mt-12 px-4 md:px-0">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-[#e76f51] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(231,111,81,0.3)] mb-6 hover:scale-105 transition-transform duration-300">
              <UserPlus size={32} strokeWidth={2} />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Student Application</h2>
            <p className="text-slate-500 mt-3 max-w-md mx-auto text-lg">Apply for your preferred university courses for the upcoming academic year.</p>
          </div>

          {status && (
            <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'} animate-in zoom-in duration-300`}>
              {status.type === 'success' ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" /> : <AlertCircle className="mt-0.5 shrink-0 text-rose-600" />}
              <p className="font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 p-2 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Legal Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full px-5 py-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#e76f51]/10 focus:border-[#e76f51] outline-none transition-all duration-300 placeholder:text-slate-300 font-medium text-slate-800 shadow-sm"
                  placeholder="e.g., John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Academic Marks (%)</label>
                <input 
                  type="number" 
                  name="marks" 
                  value={formData.marks} 
                  onChange={handleChange} 
                  required
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-5 py-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#e76f51]/10 focus:border-[#e76f51] outline-none transition-all duration-300 placeholder:text-slate-300 font-medium text-slate-800 shadow-sm"
                  placeholder="e.g., 95.5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Reservation Category</label>
              <div className="relative">
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-[#e76f51]/10 focus:border-[#e76f51] outline-none transition-all duration-300 font-medium text-slate-800 shadow-sm appearance-none"
                >
                  <option value="General">General (Open Merit)</option>
                  <option value="OBC">Other Backward Classes (OBC)</option>
                  <option value="SC">Scheduled Castes (SC)</option>
                  <option value="ST">Scheduled Tribes (ST)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100/60">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#e76f51]/10 text-[#e76f51] rounded-xl">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Course Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-2 relative group">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${num === 1 ? 'bg-[#e76f51]' : 'bg-slate-300'}`}>{num}</span>
                      Priority {num}
                    </label>
                    <div className="relative">
                      <select 
                        name={`pref${num}`} 
                        value={(formData as any)[`pref${num}`]} 
                        onChange={handleChange} 
                        className={`w-full px-4 py-4 bg-white border ${num === 1 ? 'border-[#e76f51]/40' : 'border-slate-100'} rounded-[1.5rem] focus:ring-4 focus:ring-[#e76f51]/10 focus:border-[#e76f51] outline-none transition-all duration-300 font-medium text-slate-800 shadow-sm appearance-none hover:border-[#e76f51]/40`}
                        required={num === 1}
                      >
                        <option value="">Select a course...</option>
                        {courses.map(course => (
                          <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">Priority 1 is required. Priority 2 and 3 are optional but highly recommended.</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#e76f51] hover:bg-[#d65f42] text-white font-bold text-lg py-4.5 rounded-[2rem] shadow-[0_8px_20px_rgba(231,111,81,0.25)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8 flex items-center justify-center gap-2 h-16"
            >
              <span>
                {loading ? 'Processing...' : 'Submit Application'}
              </span>
              {!loading && <Sparkles size={20} strokeWidth={2.5} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
